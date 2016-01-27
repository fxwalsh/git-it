var config={};
config.progress={};
config.progress.post_options = {
      host: 'agile-taiga-28847.herokuapp.com',
      port: 80,
      path: '/api/progress',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  };

module.exports = config;