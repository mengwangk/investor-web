const dev = {
  STRIPE_KEY: "YOUR_STRIPE_PUBLIC_KEY",
  SENTRY_DSN: "https://c406111b8db64b40a2be1659689eb1a2@o384252.ingest.sentry.io/5247935",
  DEBUG: true,
  apiGateway: {
    REGION: "ap-southeast-1",
    URL: "",
  },
  cognito: {
    REGION: "ap-southeast-1",
    USER_POOL_ID: "ap-southeast-1_SpEaGppTi",
    APP_CLIENT_ID: "3d583p95ts7elg29drfok8b1hr",
    IDENTITY_POOL_ID: "ap-southeast-1:78ffaed4-ab72-4c5e-8b51-7f9aacc467e3",
  },
  social: {
    FB: "265641338088697",
  },
};

const prod = {
  STRIPE_KEY: "YOUR_STRIPE_PUBLIC_KEY",
  SENTRY_DSN: "https://7e799a2b29b94cef88008ce6798d3b1a@o384252.ingest.sentry.io/5251120",
  DEBUG: false,
  apiGateway: {
    REGION: "ap-southeast-1",
    URL: "",
  },
  cognito: {
    REGION: "ap-southeast-1",
    USER_POOL_ID: "ap-southeast-1_SpEaGppTi",
    APP_CLIENT_ID: "3d583p95ts7elg29drfok8b1hr",
    IDENTITY_POOL_ID: "ap-southeast-1:78ffaed4-ab72-4c5e-8b51-7f9aacc467e3",
  },
  social: {
    FB: "265641338088697",
  },
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,
};
