const dev = {
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
    FB: "",
  },
};

const prod = {
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
    FB: "",
  },
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,
};
