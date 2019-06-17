const firebaseServeBaseUrl = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : ""

module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  env: {
    firebaseServeBaseUrl: firebaseServeBaseUrl
  },
  manifest: {
    name: "Sample Project",
    lang: 'ja'
  },
  head: {
    title: 'Sample Project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Sample Project' },
      { appleStatusBarStyle: 'default' }
    ],
    script: [
      { src: `${firebaseServeBaseUrl}/__/firebase/6.1.1/firebase-app.js` },
      { src: `${firebaseServeBaseUrl}/__/firebase/6.1.1/firebase-auth.js` },
      { src: `${firebaseServeBaseUrl}/__/firebase/6.1.1/firebase-storage.js` },
      { src: `${firebaseServeBaseUrl}/__/firebase/6.1.1/firebase-firestore.js` },
      { src: `${firebaseServeBaseUrl}/__/firebase/init.js` },
      { src: `/js/uikit.min.js` },
      { src: `/js/uikit-icons.min.js` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/uikit.min.css' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/pwa'
  ],
  workbox: {
    dev: true, //開発環境でもPWAできるように
  }
}
