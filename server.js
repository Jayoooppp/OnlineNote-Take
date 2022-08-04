require("dotenv").config();
const express = require("express")
const parser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors');
const app = express();
const path = require("path");
const bcrypt = require("bcrypt")
const saltRounds = 10;;

app.use(cors());
const oneDay = 1000 * 60 * 60 * 24;




app.use(express.json());
app.use(parser.urlencoded({
    extended: true
}));
mongoose.connect(process.env.MongoDBURL + "/notesDB");

const note_schema = mongoose.Schema({
    userid: String,
    title: String,
    content: String
})

const user_schema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})

const note_model = mongoose.model("Note", note_schema);
const user_model = mongoose.model("NoteUser", user_schema);

let newsession;



//Requests targetting all the notes
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("/", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// login Route
app.post("/login", function (req, res) {
    let email_login = req.body.email;
    let password = req.body.password;
    console.log(email_login, password);
    user_model.findOne({ email: email_login }, function (err, foundUser) {
        if (!err) {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {
                    if (result === true) {
                        res.send(foundUser)
                    } else {
                        res.status(400);
                        res.json({
                            message: "Wrong Password"
                        })

                    }
                });
            } else {
                res.status(400);
                res.json({
                    message: "Invalid email Id"
                })
            }
        } else {
            console.log(err);
        }
    })
})


// Signup Route
app.post("/signup", function (req, res) {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let new_email = req.body.email;
    let new_password = req.body.password;
    user_model.findOne({ email: new_email }, function (err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            if (foundUser) {
                res.status(400);
                res.json({
                    message: "Email id is already registered"
                })
            } else {
                bcrypt.hash(new_password, saltRounds, function (err, hash) {
                    // Store hash in your password DB.
                    const new_user = new user_model({
                        _id: mongoose.Types.ObjectId(),
                        fname: fname,
                        lname: lname,
                        email: new_email,
                        password: hash
                    })


                    new_user.save(function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("User saved")
                            res.send(new_user)
                        }
                    })
                }
                )
            }

        }
    })
})




app.route("/note")
    .get(function (req, res) {
        note_model.find(function (err, notes) {
            if (err) {
                res.send(err)
            } else {
                res.send(notes)
            }
        })
    })
    .post(function (req, res) {
        const newTitle = req.body.newNote.title;
        const newContent = req.body.newNote.content;
        const new_note = new note_model({
            title: newTitle,
            content: newContent

        })
        new_note.save(function (err) {
            if (err) {
                res.send(err)
            } else {
                res.send("Data Saved in the database")
            }
        })

    })

    .delete(function (req, res) {
        note_model.deleteMany(function (err) {
            if (err) {
                res.send(err)
            } else {
                res.send("All data deleted from the database")
            }
        })
    });


// Requests targetting the requested notes

app.route("/note/:id")
    .get(function (req, res) {

        let idFind = req.params.id;
        note_model.find({ userid: idFind }, function (err, note) {
            if (err) {
                res.send(err)
            } else {
                res.send(note)
            }
        })
    })

    .post(function (req, res) {
        const newTitle = req.body.newNote.title;
        const newContent = req.body.newNote.content;
        const new_note = new note_model({
            userid: req.params.id,
            title: newTitle,
            content: newContent
        })
        new_note.save(function (err) {
            if (err) {
                res.send(err)
            } else {
                res.send("Data Saved in the database")
            }
        })

    })

    .put(function (req, res) {
        const idToUpdate = req.params.id;
        note_model.findByIdAndUpdate(
            idToUpdate,
            { title: req.body.title, content: req.body.content },
            function (err) {
                if (err) {
                    res.send("Data couldn't updated due to some error")
                } else {
                    res.send("Data is updated successfully")
                }
            })

    })

    .patch(function (req, res) {
        const idToUpdate = req.params.id;
        note_model.findByIdAndUpdate(
            idToUpdate,
            { $set: { title: req.body.title, content: req.body.content } },
            function (err) {
                if (err) {
                    res.send("Data couldn't updated due to some error")
                } else {
                    res.send("Data is updated successfully")
                }
            })

    })

    .delete(function (req, res) {
        const idToDelete = req.params.id;
        console.log(idToDelete)
        note_model.findByIdAndDelete(idToDelete, function (err) {
            if (err) {
                res.send(err)
            } else {
                res.send("Data deleted from the database")
            }
        })
    })

const host = '0.0.0.0';
const port = process.env.PORT || 8080;
app.listen(port, host, function () {
    console.log("Server started.......", port);
});