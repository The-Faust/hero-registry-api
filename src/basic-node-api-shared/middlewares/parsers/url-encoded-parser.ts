import bodyParser = require("body-parser");

export const urlEncodedParser = bodyParser.urlencoded({extended: true});