const express = require('express');
const mongodb = require('mongodb-legacy');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

const clases = require('./routes/clases');
app.use('/clases', clases);

const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017',(err, client)=>{
  if(err !== undefined){
    console.log(err);
  } else {
    app.locals.db = client.db('horario');
  }
});

app.listen(3000, ()=>{
    console.log('Servidor levantado en el puerto 3000');
});