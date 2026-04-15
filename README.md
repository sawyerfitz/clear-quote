# ClearQuote — AI Window Cleaning Estimator

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run in browser
```bash
npm run dev
```
Open http://localhost:5173

Demo login: demo@clearview.io / demo123

### 3. Build for production
```bash
npm run build
```

### 4. Add Capacitor for iOS (App Store)
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap add ios
npx cap sync
npx cap open ios
```

Update `capacitor.config.json` with your real app ID before submitting to the App Store.

## Stack
- React 18 + Vite
- Claude AI (Anthropic) for address-based estimating
- Capacitor for iOS native wrapper

## Notes
- Replace the Stripe payment simulation with RevenueCat for App Store in-app purchases
- Update the `appId` in capacitor.config.json to your own bundle identifier
