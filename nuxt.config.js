import colors from 'vuetify/es5/util/colors'

export default {
  /*
  server: {
    host: '0.0.0.0'
  },
  */
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  generate: {
    fallback: true
  },
  buildDir: 'nuxt-dist',
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'ToDo App',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { name: 'theme-color', content: '#666AF6' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/validators.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/General/',
    '~/components/List/',
    '~/components/Task/',

  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],
  middleware: [
    'customMiddleware'
  ],
  router: {
    middleware: 'customMiddleware'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://63c68d85dcdc478e15c3ec8f.mockapi.io/api/v1/',
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*'
      },
      post: {
        'Content-Type': 'application/json'
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#666AF6',
          secondary: '#878af5',
          accent: '#31446c',
          info: '#636af6',
          warning: '#F4863C',
          error: '#FF5252',
          success: '#4CAF50',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
