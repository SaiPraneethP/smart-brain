const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { json } = require('express');


const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')



const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
});



app.use(cors())
app.use(express.json());

app.get("/", (req, res) => { res.send("it's working!") })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3004, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})


/*
/ --> res =this is working
/signin --> Post (respond with --> Success or fail)
/register --> Post =user (To check everything is working , we will wreturn the new created Object(with register details))
/profile/:userID(optional param) --> GET (returns the user info )
/image  --> PUT (update the no of submits and Rank amopng the given users)

m
*/