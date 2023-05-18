require('dotenv').config();

const mongoose = require('mongoose');


// const connectionStr = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.7fxryrd.mongodb.net/Ecommerce?retryWrites=true&w=majority`;
const connectionStr = 'mongodb+srv://l201305:RivEXju4CTuHgc9l@cluster0.7fxryrd.mongodb.net/ecommerce?retryWrites=true&w=majority';
//mongoose.connect('mongodb+srv://l201305:RivEXju4CTuHgc9l@cluster0.7fxryrd.mongodb.net/?retryWrites=true&w=majority');

mongoose.connect(connectionStr, {useNewUrlparser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log("DB not connected:",err))
 
mongoose.connection.on('error', err => {
  console.log(err)
})
