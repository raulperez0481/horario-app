const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb');

router.get('/ver', (req, res)=>{
    req.app.locals.db.collection('clases').find().toArray((err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/crear', (req, res)=>{
    console.log(req.body);
    req.app.locals.db.collection('clases').insertOne(req.body, (err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        } else {
            res.redirect('/'); 
        }
    })
})

router.put('/editar', (req, res)=>{
    console.log("id del producto");
    console.log(req.body.idProducto);
    req.app.locals.db.collection('clases').updateOne({_id: new ObjectId(req.body.idProducto)},{$set:{nombre: req.body.nombre, cantidad: req.body.cantidad,precioMercadona: req.body.precioMercadona,precioLidl: req.body.precioLidl,precioEroski: req.body.precioEroski,precioAldi: req.body.precioAldi}},(err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        } else {
            res.send(data)
        }
    })
})

router.delete('/borrar', (req, res)=>{
    req.app.locals.db.collection('clases').deleteOne({_id: new ObjectId(req.body.idClase)}, (err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        } else {
            res.send(data)
        }
    })
})

module.exports = router;