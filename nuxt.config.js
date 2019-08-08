export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  router: {
    middleware: ['auth', 'i18n', 'cleanStyles']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'blue' },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/base.sass', 'element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/i18n', '~/plugins/vue-api-query', '~/plugins/element'],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://inventum.test'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'access_token' },
          user: { url: 'user', method: 'get', propertyName: '' },
          logout: { url: 'logout', method: 'post' }
        }
      }
    }
  },

  /* auth: {
    strategies: {
      'laravel.passport': {
        url: 'http://inventum/login',
        client_id: 1,
        client_secret: 'lJ1nJNGzdvXWKZ5r8lxHKQMOaIorlzUEodhCGP5Z'
      },
    }
  },*/
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/styles/variables.sass'],
    theme: {
      themes: {
        light: {
          primary: '#F91C3D',
          secondary: '#112D6F',
          accent: '#0055B4'
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
