require('./scss/style.scss')

const axios = require('axios')
const qs = require('qs')

axios.post('php/ajax.php', qs.stringify({
  bob: [1, 2, 3],
  data: 37
}))
.then(response => {
  console.log(response)
})
.catch(error => {
  console.log(error)
})
