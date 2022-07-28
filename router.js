const express = require('express');
const { home, getlookup } = require('./controller');

const Router = express.Router();

Router.route("/home").get(home);
Router.route("/lookup").post(getlookup);


module.exports = Router;