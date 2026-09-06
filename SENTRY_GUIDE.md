# Sentry Setup Guide

## 1. Create a Sentry Account
1. Go to [Sentry.io](https://sentry.io/signup/) and sign up for a new account.
2. Follow the onboarding steps to create a new Organization and Project.
3. Select your platform (e.g., React, Node.js, Python, etc.) based on the stack of this application.

## 2. Get Your DSN
1. Once the project is created, Sentry will provide a DSN (Data Source Name) link.
2. Copy the DSN. You will need it to configure the SDK in the application.
3. Keep this DSN secure and add it to your environment variables (e.g., `.env` file as `VITE_SENTRY_DSN` or similar).

## 3. Install the SDK
Install the appropriate Sentry SDK for your project. For example, for a standard JavaScript/TypeScript frontend:
```bash
npm install @sentry/browser @sentry/tracing
```

## 4. Initialize Sentry
Initialize Sentry as early as possible in your application's lifecycle (e.g., in `main.tsx` or `index.js`).

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN, // or process.env.SENTRY_DSN
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0, // Capture 100% of the transactions for performance monitoring. Adjust in production!
});
```

## 5. Verify Setup
1. Introduce a deliberate error in your code (e.g., `throw new Error("Sentry Test Error");`).
2. Run your application and trigger the error.
3. Check your Sentry dashboard to ensure the error was captured and reported successfully.

## Additional Resources
- [Sentry Documentation](https://docs.sentry.io/)
- [Alerts & Notifications](https://docs.sentry.io/product/alerts/) (Setup Slack/Email alerts for critical errors)
