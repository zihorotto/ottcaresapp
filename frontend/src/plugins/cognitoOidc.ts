import { UserManager } from 'oidc-client-ts';

const cognitoAuthConfig = {
  authority: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_nBg4KfCJj',
  client_id: '39tjt5db7e27m63grnidcf57o2',
  redirect_uri: 'http://16.171.144.204:3000/login',
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
  const clientId = '39tjt5db7e27m63grnidcf57o2';
  const logoutUri = 'http://16.171.144.204:3000/';
  const cognitoDomain = 'https://eu-north-1nbg4kfcjj.auth.eu-north-1.amazoncognito.com';
  // eslint-disable-next-line no-undef
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri,
  )}`;
}
