module.exports = {
  apps: [{
    name: 'Safar API - 1',
    script: 'npm run start',
    args: 'EXPRESS REST API - 1',
    instances: 2,
    autorestart: true,
    watch: false,
    exec_mode : "cluster",
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 8080
    }
  },
  {
    name: 'Safar API - 2',
    script: 'npm run start',
    args: 'Safar REST API - 2',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    exec_mode : "cluster",
    env: {
      NODE_ENV: 'development',
      PORT: 8081
    }
  }]
};

