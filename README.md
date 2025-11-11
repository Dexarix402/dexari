# DEXARI

A modern, interactive Solana payment dashboard for agent-to-agent transactions with real-time monitoring capabilities.

![DEXARI Dashboard](https://img.shields.io/badge/Solana-Payments-14F195?style=for-the-badge&logo=solana&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Features

### ⚡ Solana & Phantom Wallet Integration
- **Phantom wallet connection** with auto-detection
- **Web3 transaction building** with priority fees and compute units
- **Smart contract interactions** for X402 payment protocol
- **Multi-signature support** for complex transactions
- **Token account management** (SOL, USDC, DXRI)

### 🔧 X402 Payment Processing
- **Payment intent creation** with escrow support
- **Agent-to-agent transfers** with 2% platform fee
- **Transaction metadata** embedding on-chain
- **Payment verification** and status tracking
- **Webhook integration** for real-time payment notifications
- **Refund and cancellation** handling

### 🚀 Real-Time Transaction Monitor
- **Live transaction feed** with instant status updates
- **WebSocket-style simulation** showing pending → confirming → confirmed flow
- **Animated status badges** with visual feedback
- **Connection status indicator** with pulse animations
- **Transaction statistics** dashboard showing confirmed, pending, and failed counts
- **Advanced filtering** by status and search functionality

### 💰 Payment Management
- **Send payments** to Solana agents with custom amounts
- **Request payments** with QR code generation
- **Transaction history** with comprehensive filtering
- **Wallet integration** ready (wallet connection UI implemented)

### 🎯 Agent Marketplace
- **Browse 8+ Solana-focused agents** across multiple categories:
  - DeFi & Analytics
  - NFT Tools
  - Trading Bots
  - Developer Tools
  - Network Tools
- **Featured agents** with ratings and reviews
- **Category filtering** and search
- **Detailed agent cards** with pricing and tags

### 🎨 Modern UI/UX
- **Dark/Light theme** support
- **Responsive design** for all screen sizes
- **Glassmorphism effects** and smooth animations
- **Custom color system**: Green (#01ff61), White (#ededed), Dark Grey (#323232), Black (#0f0f0f)
- **Professional typography**: Inter for UI, Space Grotesk for headings

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Wouter** - Lightweight client-side routing
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - High-quality component library
- **Lucide Icons** - Beautiful icon system
- **Framer Motion** - Smooth animations

### Backend
- **Express.js** - Fast, minimal web framework
- **TypeScript** - Type-safe backend code
- **Drizzle ORM** - Modern TypeScript ORM
- **PostgreSQL** (Neon) - Production-ready database
- **In-memory storage** - Development mode with instant startup

### Blockchain & Web3
- **Solana Web3.js** - Solana blockchain integration
- **Phantom Wallet Adapter** - Wallet connection and signing
- **X402 Payment Protocol** - Custom payment smart contracts
- **Transaction Builder** - Complex transaction composition
- **Smart Contract SDK** - Program interaction utilities

### Developer Experience
- **Full TypeScript** throughout the stack
- **Shared types** between frontend and backend
- **ESBuild** for production builds
- **Hot Module Replacement** for instant dev feedback

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dexari.git
cd dexari
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (optional)
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes (if using PostgreSQL)

## Project Structure

```
dexari/
├── client/               # Frontend React application
│   ├── public/          # Static assets (logos, favicon)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   └── ui/     # shadcn/ui components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utilities and helpers
│   │   └── pages/      # Page components (routes)
│   ├── index.html      # HTML entry point
│   └── index.css       # Global styles and theme
├── server/              # Backend Express application
│   ├── routes.ts       # API route definitions
│   ├── storage.ts      # Storage layer abstraction
│   └── index.ts        # Server entry point
├── shared/              # Shared types and schemas
│   └── schema.ts       # Database schema and Zod validators
└── package.json         # Project dependencies
```

## Features in Detail

### Live Transaction Monitor
The real-time monitor provides instant visibility into transaction status:
- Transactions automatically progress through states (pending → confirming → confirmed)
- New transactions appear dynamically with notifications
- Filter by status: All, Pending, Confirming, Confirmed, Failed
- Search across agent names, addresses, and transaction IDs
- Live statistics showing total, confirmed, pending, and failed counts

### Agent Marketplace
Discover and interact with Solana agents:
- **Token Analyzer** - Real-time analysis of Solana tokens
- **NFT Scanner** - Scan and verify NFT metadata
- **DEX Optimizer** - Find best swap routes across DEXs
- **Yield Tracker** - Monitor DeFi yields across protocols
- **Portfolio Rebalancer** - Automated portfolio management
- **MEV Protection** - Protect against MEV attacks
- **Gas Optimizer** - Minimize transaction costs
- **Network Monitor** - Track Solana network health

### Payment Workflows
- **Send Payment**: Select agent, enter amount, review and confirm
- **Request Payment**: Generate payment request with QR code
- **Transaction History**: View all transactions with advanced filtering

## Configuration

### Theme Customization
Edit `client/index.css` to customize colors:
```css
:root {
  --primary: 142 100% 50%;        /* #01ff61 Green */
  --background: 0 0% 6%;          /* #0f0f0f Black */
  --card: 0 0% 20%;               /* #323232 Dark Grey */
  /* ... more theme variables */
}
```

### Environment Variables
Create a `.env` file for configuration:
```env
NODE_ENV=development
DATABASE_URL=postgresql://... # Optional: PostgreSQL connection
SESSION_SECRET=your-secret-key
```

## Development

### Adding a New Page
1. Create page component in `client/src/pages/`
2. Register route in `client/src/App.tsx`
3. Add navigation link in `client/src/components/AppSidebar.tsx`

### Adding a New API Endpoint
1. Define schema in `shared/schema.ts`
2. Add storage methods in `server/storage.ts`
3. Create route handler in `server/routes.ts`

### Styling Guidelines
- Use Tailwind utility classes for styling
- Follow shadcn/ui patterns for components
- Use Lucide icons for visual elements
- Maintain consistent spacing (4, 6, 8px scale)

## Deployment

### Build for Production
```bash
npm run build
```

This creates:
- `dist/public/` - Frontend static files
- `dist/index.js` - Backend server bundle

### Run Production Server
```bash
npm start
```

### Deployment Options
- **Vercel** - Zero-config deployments
- **Netlify** - Fast CDN and serverless functions
- **Railway** - Full-stack hosting
- **DigitalOcean** - VPS deployment
- **AWS/GCP/Azure** - Cloud platforms

## Roadmap

- [ ] Connect real Solana wallet (Phantom, Solflare)
- [ ] Integrate Solana blockchain for actual transactions
- [ ] Add WebSocket support for true real-time updates
- [ ] Implement agent authentication and verification
- [ ] Add payment escrow and dispute resolution
- [ ] Build agent rating and review system
- [ ] Add analytics dashboard for payment insights
- [ ] Support multiple SPL tokens (USDC, USDT, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern React and TypeScript
- UI components from shadcn/ui and Radix UI
- Icons from Lucide React
- Design inspired by modern fintech applications

---

**DEXARI** - Empowering agent-to-agent payments on Solana
