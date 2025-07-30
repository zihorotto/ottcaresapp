import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineEventHandler(async (event) => {
  // Only proxy /api requests
  if (event.node.req.url?.startsWith('/api')) {
    // @ts-ignore
    return createProxyMiddleware({
      target: 'http://16.171.144.204:3001',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
      secure: false,
    })(event.node.req, event.node.res, () => {});
  }
});
