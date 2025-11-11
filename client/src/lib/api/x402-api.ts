import { apiRequest } from './queryClient';

export interface X402Agent {
  id: string;
  address: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  verified: boolean;
  apiEndpoint: string;
}

export interface X402PaymentIntent {
  intentId: string;
  agentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  expiresAt: string;
}

export interface X402ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

class X402ApiClient {
  private baseUrl: string;
  private apiKey: string | null = null;

  constructor(baseUrl: string = '/api/x402') {
    this.baseUrl = baseUrl;
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['X-X402-API-Key'] = this.apiKey;
    }

    return headers;
  }

  async getAgents(filters?: {
    category?: string;
    verified?: boolean;
    minRating?: number;
  }): Promise<X402Agent[]> {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.verified !== undefined) params.append('verified', String(filters.verified));
    if (filters?.minRating) params.append('minRating', String(filters.minRating));

    const response = await fetch(`${this.baseUrl}/agents?${params}`, {
      headers: this.getHeaders(),
    });

    const data: X402ApiResponse<X402Agent[]> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch agents');
    }

    return data.data;
  }

  async getAgent(agentId: string): Promise<X402Agent> {
    const response = await fetch(`${this.baseUrl}/agents/${agentId}`, {
      headers: this.getHeaders(),
    });

    const data: X402ApiResponse<X402Agent> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch agent');
    }

    return data.data;
  }

  async createPaymentIntent(
    agentId: string,
    amount: number,
    currency: string = 'DXRI'
  ): Promise<X402PaymentIntent> {
    const response = await fetch(`${this.baseUrl}/payment-intents`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        agentId,
        amount,
        currency,
      }),
    });

    const data: X402ApiResponse<X402PaymentIntent> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to create payment intent');
    }

    return data.data;
  }

  async confirmPayment(
    intentId: string,
    signature: string
  ): Promise<X402PaymentIntent> {
    const response = await fetch(`${this.baseUrl}/payment-intents/${intentId}/confirm`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ signature }),
    });

    const data: X402ApiResponse<X402PaymentIntent> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to confirm payment');
    }

    return data.data;
  }

  async getPaymentIntent(intentId: string): Promise<X402PaymentIntent> {
    const response = await fetch(`${this.baseUrl}/payment-intents/${intentId}`, {
      headers: this.getHeaders(),
    });

    const data: X402ApiResponse<X402PaymentIntent> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch payment intent');
    }

    return data.data;
  }

  async getAgentAnalytics(agentId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/agents/${agentId}/analytics`, {
      headers: this.getHeaders(),
    });

    const data: X402ApiResponse<any> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch analytics');
    }

    return data.data;
  }

  async executeAgentCall(
    agentId: string,
    method: string,
    params: any = {}
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}/agents/${agentId}/execute`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        method,
        params,
      }),
    });

    const data: X402ApiResponse<any> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Agent execution failed');
    }

    return data.data;
  }

  async subscribeToAgent(
    agentId: string,
    planType: 'monthly' | 'yearly'
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}/subscriptions`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        agentId,
        planType,
      }),
    });

    const data: X402ApiResponse<any> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to create subscription');
    }

    return data.data;
  }
}

export const x402Api = new X402ApiClient();
