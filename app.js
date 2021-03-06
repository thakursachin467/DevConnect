const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const path = require('path');



//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//port 
const port = process.env.PORT || 5000;
//DB config
const db = require('./config/keys').mongoURI;
//connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('database connected'))
    .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profiles', profiles);

//serve static asset if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.listen(port, () => console.log(`server stared at port ${port}`));