import { UserManager } from 'oidc-client-ts';
import { useRuntimeConfig } from '#app';

export function createUserManager() {
  const config = useRuntimeConfig();
  const cognitoAuthConfig = {
    authority: String(config.public.NUXT_PUBLIC_COGNITO_AUTHORITY),
    client_id: String(config.public.NUXT_PUBLIC_COGNITO_CLIENT_ID),
    redirect_uri: String(config.public.NUXT_PUBLIC_COGNITO_REDIRECT_URI),
    response_type: 'code',
    scope: 'phone openid email',
  };
  return new UserManager({ ...cognitoAuthConfig });
}


export async function signOutRedirect() {
  const userManager = createUserManager();
  await userManager.removeUser();
  const config = useRuntimeConfig();
  const clientId = config.public.NUXT_PUBLIC_COGNITO_CLIENT_ID;
  const logoutUri = config.public.NUXT_PUBLIC_COGNITO_LOGOUT_URI;
  const cognitoDomain = config.public.NUXT_PUBLIC_COGNITO_DOMAIN;
  if (import.meta.client) {
    // eslint-disable-next-line no-undef
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(String(logoutUri))}`;
  }
}
