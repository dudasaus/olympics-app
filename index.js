// var express = require('express')
// var app = express()
//
// app.set('port', (process.env.PORT || 5000))
// app.use(express.static(__dirname + '/public'))
//
// app.get('/', function(request, response) {
//   response.send('Hello World!')
// })
//
// app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'))
// })

const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/*', (req, res) => {
    res.send(`<pre>METHOD: ${req.method}, URL: ${req.url}</pre>`);
    console.log(req.method);
});

app.listen(app.get('port'), () => {
    process.stdout.write(`Listening on port ${app.get('port')}\n`);
});
