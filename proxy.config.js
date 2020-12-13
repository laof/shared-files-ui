const PROXY_CONFIG = {
  "/api/*": {
    target: "http://localhost:5200",
    secure: false,
    changeOrigin: true,
    logLevel: "info",
  },
};

module.exports = PROXY_CONFIG;
