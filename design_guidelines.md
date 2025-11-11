# X402 Agent-to-Agent Payments - Design Guidelines

## Design Approach

**Fintech Dashboard Platform** - A modern payment interface inspired by premium fintech apps (Revolut, Stripe Dashboard) combined with crypto-native elements. This is a utility-focused application requiring efficiency and clarity while maintaining visual sophistication through strategic use of the vibrant green accent.

**Key Differentiation:** Unlike the reference sites (documentation, marketplace, scanner), this is a **full-featured dashboard application** with real-time payment flows, transaction management, and agent-to-agent interactions.

---

## Core Design Elements

### Typography
- **Primary Font:** Inter (Google Fonts) for UI elements
- **Accent Font:** Space Grotesk (Google Fonts) for headings and financial values
- **Hierarchy:**
  - Hero Numbers/Balances: Space Grotesk, 48px-72px, Bold (700)
  - Section Headings: Space Grotesk, 24px-32px, SemiBold (600)
  - Body Text: Inter, 16px, Regular (400)
  - Small Labels: Inter, 14px, Medium (500)
  - Micro Text: Inter, 12px, Regular (400)

### Layout System
- **Spacing Units:** Tailwind spacing with primary values of 2, 4, 6, 8, 12, 16, 24
- **Container:** max-w-7xl with px-6 for side padding
- **Grid System:** 12-column responsive grid
- **Dashboard Layout:** Fixed sidebar (256px) with scrollable main content area
- **Card Spacing:** Consistent p-6 for card interiors, gap-6 between cards

### Component Library

**Navigation:**
- Fixed left sidebar with logo, main nav, and user section at bottom
- Top navigation bar with breadcrumbs, search, and notifications
- Mobile: Bottom tab bar with slide-out sidebar

**Cards & Containers:**
- Glassmorphism cards with subtle backdrop blur
- Elevated cards for primary actions (send payment, receive)
- Stats cards with large numbers and trend indicators
- Transaction cards with avatar, metadata, and status badges

**Forms:**
- Large input fields with floating labels
- Agent address input with validation and autocomplete
- Amount input with currency selector and quick amount buttons
- Multi-step payment flow with progress indicator

**Data Displays:**
- Transaction table with sortable columns and filters
- Real-time activity feed with timestamps
- Payment status timeline with visual milestones
- Chart widgets for payment analytics (line charts for volume, donut for categories)

**Interactive Elements:**
- Action buttons with green glow effects on hover
- Status badges (pending: yellow, confirmed: green, failed: red)
- Loading states with skeleton screens
- Toast notifications for payment confirmations

**Overlays:**
- Modal dialogs for payment confirmation
- Slide-over panels for transaction details
- Dropdown menus with smooth animations

---

## Application Structure

### Dashboard Home
**Hero Section:** Wallet balance card with large balance display, quick action buttons (Send, Request, History), and 24hr change indicator. Background features subtle animated gradient mesh.

**Quick Stats Grid:** Four metric cards showing Total Sent, Total Received, Active Agents, Pending Transactions - each with icon, large number, and percentage change.

**Main Content (Two-column):**
- **Left (60%):** Recent Transactions list with infinite scroll
- **Right (40%):** Activity Feed showing real-time agent interactions

**Charts Section:** Payment volume line chart spanning full width

### Send Payment Interface
**Step-by-step flow:**
1. Agent Selection (search/select with recent agents)
2. Amount Entry (with balance check and fee calculation)
3. Confirmation (review details with editable fields)
4. Processing (animated loading state)
5. Success (confirmation with transaction ID)

### Transaction History
**Filter Bar:** Date range, status, agent filter, amount range
**Table View:** Sortable columns with pagination
**List View Toggle:** Card-based mobile view
**Export Function:** Download CSV/PDF reports

### Request Payment
**QR Code Generator:** Large centered QR with agent address
**Share Options:** Copy link, email, social sharing
**Request Form:** Amount, description, expiry time
**Active Requests:** List of pending payment requests with status

---

## Images

**Dashboard Hero Background:** Abstract 3D gradient mesh with flowing organic shapes in subtle green-to-dark gradient. Positioned as full-width background behind balance card with overlay for readability.

**Agent Avatars:** Circular profile images for agent identities (use placeholder avatar generator or geometric patterns based on wallet address)

**Empty States:** Illustration of interconnected nodes representing agent network for empty transaction history

**Success States:** Checkmark animation or confetti burst for successful payments

No traditional hero image section - this is a dashboard application focused on functionality over marketing imagery.

---

## Visual Treatment Notes

- **Green Accent Strategy:** Use #01ff61 sparingly for CTAs, success states, active elements, and subtle glows - never as backgrounds
- **Dark Mode Native:** Build on #0f0f0f base with #323232 for elevated surfaces
- **Depth System:** Use subtle shadows and glassmorphism for hierarchy
- **Motion:** Smooth micro-interactions (0.2s-0.3s transitions), avoid heavy animations
- **Accessibility:** Maintain WCAG AA contrast with #ededed text on dark backgrounds, use status icons alongside colors