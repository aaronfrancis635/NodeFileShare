var express = require("express");
var multer  = require('multer')
const shortid = require('shortid');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '_' + file.originalname.replace('.', '-'))
    }
  })
var upload = multer({ storage: storage })

var app = express();
var config = require('./config.json');

function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

 app.post("/file/send", upload.single('fileupload'), function(req, res,next) { 
   /* some server side logic */
   res.send("OK");
 });

/* serves all the static files */
app.use(express.static('public', {setHeaders: function(req, path, stat){
    if (config.debug){    
        console.log("[DEBUG] Request for '" + path.replace(__dirname, "") + "' (" + formatBytes(stat.size,1) + ")")
    }
}}));

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on " + port);
});