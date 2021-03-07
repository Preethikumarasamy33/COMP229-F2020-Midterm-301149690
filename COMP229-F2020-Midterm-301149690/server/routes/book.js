let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//const { displayBookList } = require('../controllers/book');

// connect to our Book Model
let Book = require('../models/book');
router.get('/', (req, res, next) => {

    Book.find((err, bookList) => {
    if(err)
    {
    return console.error(err);
    }
    else{
    res.render('book/list', {title: 'Books', 
    BookList: bookList})
    }
    });
});

router.get('/add', (req,res,next) => {

    let AddBook = Book  ({

        });
    res.render('book/add', {
        title: 'Add Book',
        bookList: AddBook
        });
});

router.post('/add', (req, res,next) => {
let newBook = Book({
    "name": req.body.name,
    "author":req.body.author,
    "description":req.body.description,
    "price":req.body.price
   });
   Book.create(newBook, (err,Book) =>{
if(err)
{
    console.log(err);
    res.end(err);
}
else{
    //refresh the book list
    res.redirect('/book-list');
}
   });
});
router.get('/edit/:id', (req, res,next) => {
let id= req.params.id;

Book.findById(id, (err, bookToEdit) =>{
    if(err){
        console.log(err);
        res.end(err);
    }
    else
    {
        //show the edit
        res.render('book/edit', { title: 'Edit Book'}, bookToEdit)
    }
    });
});
router.post('/edit/:id', (req, res,next) => {
let id = req.params.id

let updatedBook = Book({
    "_id": id,
    "name": req.body.name,
    "author":req.body.author,
    "description":req.body.description,
    "price":req.body.price
});

Book.updateOne({_id: id}, updatedBook, (err) => {
if(err)
{
    console.log(err);
    res.end(err);
}
else{
    //refresh the book-list
    res.redirect('/book-list');
    }
});
});
router.get('/delete/:id', (req, res,next) => {
let id = req.params.id;

Book.remove({_id: id}, (err) => {
    if(err){
        console.log(err);
        res.end(err);
    }
    else{
        //refresh the book-list
        res.redirect('/book-list');
    }
});
});


module.exports = router;