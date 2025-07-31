/* global process */
import { UserManager } from 'oidc-client-ts';

console.log('NUXT_PUBLIC_COGNITO_AUTHORITY:', process.env.NUXT_PUBLIC_COGNITO_AUTHORITY);
const cognitoAuthConfig = {
  authority: process.env.NUXT_PUBLIC_COGNITO_AUTHORITY || '',
  client_id: process.env.NUXT_PUBLIC_COGNITO_CLIENT_ID || '',
  redirect_uri: process.env.NUXT_PUBLIC_COGNITO_REDIRECT_URI || '',
  response_type: 'code',
  scope: 'phone openid email',
};

// create a UserManager instance
export const userManager = new UserManager({
  ...cognitoAuthConfig,
});

export async function signOutRedirect() {
  // Remove local session
  await userManager.removeUser();
  const clientId = process.env.NUXT_PUBLIC_COGNITO_CLIENT_ID || '';
  const logoutUri = process.env.NUXT_PUBLIC_COGNITO_LOGOUT_URI || '';
  const cognitoDomain = process.env.NUXT_PUBLIC_COGNITO_DOMAIN || '';
  // eslint-disable-next-line no-undef
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri,
  )}`;
}
