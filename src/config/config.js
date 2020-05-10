const dev = {
  DEBUG: true,
};

const prod = {
  DEBUG: false,
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,
};
