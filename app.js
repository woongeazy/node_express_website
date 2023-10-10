const mysql = require('mysql2');
const express = require('express')
const app = express()
const port = 3000


//view template engine
app.set("view engine", "pug");
app.set("views", __dirname+"/views");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))

// create the connection to database
const conn = mysql.createConnection({
  host: 'http://woong2.dothome.co.kr',
  user: 'woong2',
  database: 'Hanchae3629!'
});

// simple query
conn.query(
  'SELECT * FROM `contact`',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

app.get('/', (req, res) => {
  res.render("home")
});

app.get("/contact", (req, res) => {
    res.render("contact"); // help.pug 찾아서 서버에서 렌더링해라!
});
app.get("/portfolio", (req, res) => {
    res.render("portfolio"); // help.pug 찾아서 서버에서 렌더링해라!
});
app.get("/about", (req, res) => {
    res.render("about"); // help.pug 찾아서 서버에서 렌더링해라!
});
app.post('/contactAdd', (req, res) => { // 등록하려는 문의 정보를 서버로 전송!
  let type = req.body.type;
  let name = req.body.name;
  let phone = req.body.phone;
  let email = req.body.email;
  let title = req.body.title;
  let memo = req.body.memo;
  console.log(type, name, phone, email, title, memo);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})