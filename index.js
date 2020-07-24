const express = require("express");
const app = express();
const path = require("path");
const api = require("./api/index");
const { format } = require("path");
var fs = require("fs");

// app.get('/');
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));
app.get("/", function (request, response) {
  var pathUrl = request.originalUrl;
  const filePath = path.resolve(
    __dirname,
    "theme/socities",
    "build",
    "index.html"
  );
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    response.send(data);
  });
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", api);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});

 
