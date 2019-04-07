module.exports = {
  apps : [{
    name: 'API',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
