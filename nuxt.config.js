module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Promo App - Romeo Khazalia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { hid: 'og:title', name: 'og:title', content: 'learn from courses ' },
      { hid: 'og:locale', name: 'og:locale', content: 'ka_ge' },
      { hid: 'og:url', name: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:image',
        name: 'og:image',
        content:
          'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'My name is Romeo Khazalia and I am a Front End developer'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://kit.fontawesome.com/f43178f547.js' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#39b982' },
  /*
   ** Global CSS
   */
  css: ['@/assets/Scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/filter' },
    { src: '@/plugins/vuelidate' },
    { src: '@/plugins/integration' },
    { src: '@/plugins/tooltip' },
    { src: '@/plugins/toasted', ssr: false },
    { src: '@/plugins/paginate.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  modules: ['@nuxtjs/axios', 'portal-vue/nuxt'],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  serverMiddleware: ['~/server/routes/index'],

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
