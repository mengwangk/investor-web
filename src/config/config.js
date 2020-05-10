const dev = {
    
};

const prod = {
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,
};
