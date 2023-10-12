const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;

//view template engine
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// create the connection to database
const conn = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "36298917",
  database: "contact",
  dateStrings: "date",
});

// simple query
conn.query("SELECT * FROM contact.contacts", function (err, results, fields) {
  console.log(results); // 서버로 부터 반환되는 결과 행
  // console.log(fields); // 결과에 따른 메타 데이터
});

app.get("/", (req, res) => {
  res.render("home");
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
app.post("/contactAdd", (req, res) => {
  // 등록하려는 문의 정보를 서버로 전송!
  let type = req.body.type == 1 ? "요청" : "문의";
  let name = req.body.name;
  let phone = req.body.phone;
  let email = req.body.email;
  let title = req.body.title;
  let memo = req.body.memo;
  // console.log(type, name, phone, email, title, memo);
  let sql = `INSERT INTO contact.contacts (gubun, name, phone, email, title, memo, regdate)
  VALUES ('${type}', '${name}', '${phone}', '${email}', '${title}', '${memo}', DATE_FORMAT(now(), '%y/%m/%d'))`;

  //query 실행명령
  conn.query(sql, function (err, results, fields) {
    if (err) throw error;
    console.log("정상적으로 데이터가 입력 되었습니다.");
    res.send("<script>alert('등록되었습니다'); location.href='/';</script>");
  });
});

// 삭제용 쿼리 :3000/contactDel?id=1
app.get("/contactDel", (req, res) => {
  // 삭제할 문의 id ==> 예) 1번 문의를 삭제한다면? 1을 전달
  // console.log('전달받은 값 : '+req.query.id);
  let del_no = req.query.id;
  let sql = `DELETE from contact.contacts WHERE id=${del_no}`;
  console.log("문의가 삭제되었습니다");
  res.send("<script>alert('삭제 되었습니다'); location.href='/contactList';</script>");
})
app.get("/contactList", (req, res) => {
  // http://localhost/contactList
  let sql = "SELECT * FROM contact.contacts ORDER BY id DESC;";
  conn.query(sql, function (err, results, fields) {
    // console.log(results); // results contains rows returned by server
    res.render("contactList", { dataset: results });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
