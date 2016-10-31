const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')

// app.get('/*/', function(req, res) {
//   res.sendFile(path.join(__dirname, '..', '..', '/dist/chatpage/index.html'));
// });

const publicPath = express.static(path.join(__dirname, '..', '..', '/dist/chatpage/'))

app.use('/dist', publicPath)
app.use('/*/', express.static(path.join(__dirname, '..', '..', '/dist/chatpage/')))

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
