require('./scss/style.scss')

const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

const vm = new Vue({
  name: 'app',
  router: new VueRouter({
    routes: [
      { path: '/', component: require('./routes/route-home.js') }
    ]
  })
})

window.onload = () => vm.$mount('#app')

// const axios = require('axios')
// const qs = require('qs')

// axios.post('php/ajax.php', qs.stringify({
//   counter: 1
// }))
// .then(response => {
//   console.log(response)
// })
// .catch(error => {
//   console.log(error)
// })
