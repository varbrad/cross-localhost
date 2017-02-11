const Vue = require('vue')

const axios = require('axios')
const qs = require('qs')

module.exports = Vue.component('route-home', {
  template: require('./templates/route-home.pug')(),
  data: () => {
    return {
      message: 'Hello!',
      messageLog: [],
      pollHandler: null,
      lastTimestamp: null,
      lastId: null
    }
  },
  methods: {
    createPollHandler: function () {
      this.pollHandler = window.setTimeout(this.pollEvent, 500)
    },
    pollEvent: function () {
      // Every second
      axios.get('/php/get.php', {
        params: {
          since: this.lastTimestamp,
          lastId: this.lastId
        }
      })
      .then(response => {
        this.lastTimestamp = response.data.timestamp
        for (let i = 0; i < response.data.results.length; ++i) {
          this.messageLog.push(response.data.results[i])
          if (!this.lastId || response.data.results[i].id > this.lastId) this.lastId = response.data.results[i].id
        }
        this.createPollHandler()
      })
      .catch(error => {
        this.messageLog.push(error)
        this.destroyPollHandler()
      })
    },
    destroyPollHandler: function () {
      window.clearTimeout(this.pollHandler)
    },
    postMessage: function () {
      axios.post('/php/post.php', qs.stringify({
        message: this.message
      }))
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.createPollHandler()
  },
  beforeDestroy: function () {
    this.destroyPollHandler()
  }
})
