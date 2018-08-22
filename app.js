const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
//port 
const port = process.env.PORT || 5000;
//DB config
const db = require('./config/keys').mongoURI;
//connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('database connected'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send("home page")
});

//use routes

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profiles', profiles);


app.listen(port, () => console.log(`server stared at port ${port}`));