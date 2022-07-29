require("dotenv").config();
const express = require("express")
const parser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const cors = require('cors');
const app = express();
const path = require("path");

app.use(
    cors({
      origin: 'https://onlinenote-taker.herokuapp.com',
      credentials: true,
    })
  );

   

app.set('view engine', ejs);
app.use(express.json());
app.use(parser.urlencoded({
  extended: true
}));
mongoose.connect(process.env.MongoDBURL +"/notesDB");

const note_schema = mongoose.Schema({
    title:String,
    content:String
})

const note_model = mongoose.model("Note" , note_schema);


//Requests targetting all the notes
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("/", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.route("/note")
.get(function (req , res) { 
    note_model.find(function (err , notes) { 
        if(err)
        {
            res.send(err)
        }else{
            res.send(notes)
        }
     })
 })
 .post(function (req , res) { 
    const newTitle = req.body.newNote.title;
    const newContent = req.body.newNote.content;
    const new_note = new note_model({
        title: newTitle,
        content: newContent

    })
    new_note.save(function (err) { 
        if(err){
            res.send(err)
        }else{
            res.send("Data Saved in the database")
        }
     })

  })

  .delete(function (req , res) { 
    note_model.deleteMany(function (err) { 
        if(err)
        {
            res.send(err)
        }else{
            res.send("All data deleted from the database")
        }
     })
   });


// Requests targetting the requested notes

app.route("/note/:id")
.get(function (req , res) { 
    let idFind = req.params.id;
    note_model.findById(idFind , function (err , note) { 
        if(err)
        {
            res.send(err)
        }else{
            res.send(note)
        }
     })
 })

 .put(function (req , res) { 
    const idToUpdate = req.params.id;
    note_model.findByIdAndUpdate(
        idToUpdate,
        {title: req.body.title , content: req.body.content},
        function (err) { 
            if(err){
                res.send("Data couldn't updated due to some error")
            }else{
                res.send("Data is updated successfully")
            }
         })

  })

  .patch(function (req , res) { 
    const idToUpdate = req.params.id;
    note_model.findByIdAndUpdate(
        idToUpdate,
        {$set: {title: req.body.title , content: req.body.content}},
        function (err) { 
            if(err){
                res.send("Data couldn't updated due to some error")
            }else{
                res.send("Data is updated successfully")
            }
         })

  })

  .delete(function (req , res) { 
    const idToDelete = req.params.id;
    console.log(idToDelete)
    note_model.findByIdAndDelete(idToDelete , function (err) { 
        if(err)
        {
            res.send(err)
        }else{
            res.send("Data deleted from the database")
        }
     })
   })







app.listen(8080 || process.env.PORT, function () { 
    console.log("Server started")
 })