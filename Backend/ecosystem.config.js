module.exports = {
  apps: [{
    name: 'uber-backend',
    script: 'app.js',
    instances: 4,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      MONGODB_URI: process.env.DB_CONNECTION || 'your-mongodb-uri',
      JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret',
      JWT_EXPIRES_IN: '23h',
      JWT_COOKIE_EXPIRES_IN: 23
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    max_memory_restart: '300M',
    listen_timeout: 3000,
    kill_timeout: 5000,
    wait_ready: true,
    autorestart: true,
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};