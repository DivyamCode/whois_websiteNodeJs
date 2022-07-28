const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
// const errorMiddleware = require("./middleware/eror");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieparser());


//this for template engine and serving static file

// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/upload'));
// console.log(__dirname + '/public');
// View Engine Setup
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
const routes = require('./router');
app.use("",routes);
const port = process.env.PORT || 3000;
const server = app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
});