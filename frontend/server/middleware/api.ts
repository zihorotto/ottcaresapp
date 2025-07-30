import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineEventHandler(async (event) => {
  if (event.node.req.url?.startsWith('/api')) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
      createProxyMiddleware({
        target: 'http://16.171.144.204:3001',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' },
        secure: false,
      })(event.node.req, event.node.res, (err: any) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
  }
});
