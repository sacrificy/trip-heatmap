const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

//   app.use('/api', createProxyMiddleware({
//     target: 'http://localhost:3000',
//     changeOrigin: true,
//   }));

  app.use('/city', createProxyMiddleware({
    target: 'http://10.5.29.212:8080/',
    changeOrigin: true,
    pathRewrite: { //路径替换
      '^/city': '/city', // axios 访问/api2 == target + /api
    }
  }));

};