import { Request, Response } from 'express';
import crypto from 'crypto';

export interface X402WebhookPayload {
  event: string;
  timestamp: number;
  data: {
    paymentId?: string;
    agentId?: string;
    status?: string;
    amount?: number;
    signature?: string;
    [key: string]: any;
  };
}

export class X402WebhookHandler {
  private webhookSecret: string;

  constructor(secret?: string) {
    this.webhookSecret = secret || process.env.X402_WEBHOOK_SECRET || '';
  }

  verifySignature(payload: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      const signature = req.headers['x-x402-signature'] as string;
      const rawBody = JSON.stringify(req.body);

      if (!this.verifySignature(rawBody, signature)) {
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }

      const payload: X402WebhookPayload = req.body;

      await this.processEvent(payload);

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Webhook processing error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  private async processEvent(payload: X402WebhookPayload): Promise<void> {
    switch (payload.event) {
      case 'payment.completed':
        await this.handlePaymentCompleted(payload.data);
        break;
      
      case 'payment.failed':
        await this.handlePaymentFailed(payload.data);
        break;
      
      case 'agent.registered':
        await this.handleAgentRegistered(payload.data);
        break;
      
      case 'agent.deactivated':
        await this.handleAgentDeactivated(payload.data);
        break;
      
      default:
        console.log(`Unhandled event type: ${payload.event}`);
    }
  }

  private async handlePaymentCompleted(data: any): Promise<void> {
    console.log('Payment completed:', data.paymentId);
  }

  private async handlePaymentFailed(data: any): Promise<void> {
    console.log('Payment failed:', data.paymentId);
  }

  private async handleAgentRegistered(data: any): Promise<void> {
    console.log('Agent registered:', data.agentId);
  }

  private async handleAgentDeactivated(data: any): Promise<void> {
    console.log('Agent deactivated:', data.agentId);
  }
}

export const webhookHandler = new X402WebhookHandler();
