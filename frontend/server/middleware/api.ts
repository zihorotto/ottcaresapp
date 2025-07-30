import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineEventHandler(async (event) => {
  if (event.node.req.url?.startsWith('/api')) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
      createProxyMiddleware({
        target: 'https://16.171.144.204',
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
