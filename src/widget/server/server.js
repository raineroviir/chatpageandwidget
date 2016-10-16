const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')

app.use(require('morgan')('short'));

  const webpack = require('webpack');
  const webpackConfig = require('../../../webpack/dev.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', '..', '..', './dist/widget/index.html'));
});

app.use(express.static(path.join(__dirname, '..','..', '/')));


app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
