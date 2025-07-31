/* eslint-disable no-undef */
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {

    public: {
      NUXT_PUBLIC_COGNITO_AUTHORITY: process.env.NUXT_PUBLIC_COGNITO_AUTHORITY,
      NUXT_PUBLIC_COGNITO_CLIENT_ID: process.env.NUXT_PUBLIC_COGNITO_CLIENT_ID,
      NUXT_PUBLIC_COGNITO_REDIRECT_URI: process.env.NUXT_PUBLIC_COGNITO_REDIRECT_URI,
      NUXT_PUBLIC_COGNITO_LOGOUT_URI: process.env.NUXT_PUBLIC_COGNITO_LOGOUT_URI,
      NUXT_PUBLIC_COGNITO_DOMAIN: process.env.NUXT_PUBLIC_COGNITO_DOMAIN
    }
  }
})