const express = require('express');
const app = express();

const mysql = require('mysql2');
const cors = require('cors');


// *****************
// Add MYSQL DATABASE CONNECTION
// *****************
// below values should be same as 
// environment variables for 'backend'
// defined in file 'docker-compose.yml'
// ****************
const db = mysql.createPool(
  {
    host:     process.env.MYSQL_HOST,  // your MySQL host
    user:     process.env.MYSQL_USER, // your MySQL username
    password: process.env.MYSQL_PASSWORD, // your MySQL password
    database: process.env.MYSQL_DATABASE  // the database you want to connect
 })

console.log("backend connected to mysql database");



// ***********************
// Enable cors security header and
// add an express method 
// to parse the POST method
// ***********************
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ****************
// HOME PAGE
// ****************
// http method: GET
// API url: /
// ****************
app.get('/', (req, res) => {
 // res.send('Hello from Backend')
  res.json("Hello from Backend")
});



// *****************
// GET all books 
// *****************
// http method: GET
// API url: /book
// *****************
/*
app.get('/book', (req, res) => {
  const q = " SELECT * FROM  tbl_books";
  
  db.query(q, (err, result) => {
    res.send(result)
  })
})
*/

app.get("/book", (req, res) => {
    const q = " SELECT * FROM tbl_books";
    
    db.query(q, (err, result) => {
        if(err) return res.json(err)
        return res.json(result)
    })
})



// *****************
// GET a particular book
// (created by santanu)
// *****************
// http method: GET
// API url: /book:id
// *****************
app.get("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM tbl_books WHERE id=?";

    db.query(q, [bookId], (err, result) => {
        if(err) return res.json(err)
        return res.json(result)
    })
})
  



// ****************
// ADD a book 
// ****************
// http method: POST
// API url: /book
// ****************
/*
app.post("/insert", (req, res) => {

  const bookName = req.body.setBookName;
  const bookReview = req.body.setReview;

  const q = "INSERT INTO tbl_books (book_name, book_review) VALUES (?, ?)";

  db.query(q, [bookName, bookReview], (err, result) => {
    console.log(result)
  })
})
*/


app.post("/book", (req,res) => {

    const q ="INSERT INTO tbl_books (`title`,`desc`) VALUES (?)";
  
 
  const values=[
        req.body.title,
        req.body.desc
    ]
  
   db.query(q, [values], (err, result) => {
        if(err) return res.json(err)
        return res.json("Book has been added.")
    })
})






// *****************
// DELETE a book 
// *****************
// http method: DELETE 
// API url: /book/:id
// *****************
/*
app.delete("/delete/:bookId", (req, res) => {

  const bookId = req.params.bookId;
  const q = "DELETE FROM tbl_books WHERE id = ?";
  
  db.query(q, bookId, (err, result) => {
    if (err) console.log(err);
  })
})
*/

app.delete("/book/:id", (req, res) => {

    const bookId = req.params.id;
    const q = "DELETE FROM tbl_books WHERE id=?";

    db.query(q, [bookId], (err, result) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted.")
    })
})




// *********************
// UPDATE a book details 
// *********************
// http method: PUT
// API url: /book/:id
// *********************
/*
app.put("/update/:bookId", (req, res) => {

  const bookReview = req.body.reviewUpdate;
  const bookId = req.params.bookId;

  const q = "UPDATE tbl_books SET book_review = ? WHERE id = ?";
  
  db.query(q, [bookReview, bookId], (err, result) => {
    if (err) console.log(err)
  })
})
*/

app.put("/book/:id", (req, res) => {

    const bookId = req.params.id;
    const q = "UPDATE tbl_books SET `title`=?,`desc`=? WHERE id=?";
  
    const values=[
        req.body.title,
        req.body.desc
    ]
  
    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been updated.")
    })
})




// *******************
// run backend server 
// at defined port
// *******************
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`backend server is running at port: ${PORT}`);
});
