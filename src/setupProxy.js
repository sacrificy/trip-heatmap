const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

//   app.use('/api', createProxyMiddleware({
//     target: 'http://localhost:3000',
//     changeOrigin: true,
//   }));

  app.use('/cityjson', createProxyMiddleware({
    target: 'http://pv.sohu.com',
    changeOrigin: true,
    pathRewrite: { //路径替换
      '^/cityjson': '/cityjson', // axios 访问/api2 == target + /api
    }
  }));

};