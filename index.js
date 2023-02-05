const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

// const User = require('./models/user');

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');

app.use('/user', userRoutes);

sequelize.sync().then(result => {
    // console.log(result);
    app.listen(4000);
}).catch(err => {
    console.log(err);
});