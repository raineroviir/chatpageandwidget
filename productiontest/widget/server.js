const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')

const publicPath = express.static(path.join(__dirname, '..', '..', '/'))

app.use(publicPath)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
