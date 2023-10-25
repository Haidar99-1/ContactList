const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://usersContacts:${process.env.DB_KEY}@cluster0.afdedm7.mongodb.net/usersContactList`);

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    telphone: String,
    company: String
})

const UserModel = mongoose.model('users', UserSchema);


app.use((err, req, res, next) => {
    console.error(err.error);
    res.status(500).send('Something broke!');
});

app.get('/getUsers', (req, res) => {
    UserModel.find({}).then((users) => {
        res.json(users)
    }).catch((err) => {
        console.log(err);
    })
})

app.get('/getUsers/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id) // _id: id
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    const { firstName, lastName, email, telphone, company } = req.body;

    if (!firstName || !lastName || !email || !telphone || !company) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: 'Internal server error' }));
});


app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    console.log("update body -> ", req.body);
    UserModel.findByIdAndUpdate({ _id: id },
        {
            email: req.body.email,
            telphone: req.body.telphone,
            company: req.body.company
        })
        .then(users => res.json(users))
        .catch(err => res.json(err))

});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(users => res.json(users))
        .catch(err => res.json(err))

})


app.listen(3001, () => {
    console.log("serve is running");
})