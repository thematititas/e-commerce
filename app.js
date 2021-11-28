const express = require("express");
const app = express();
const port = 3000;

const fs = require('fs');

app.use(express.static(__dirname + "/static"))
app.use(express.json());


app.get("/categorias",(req,res)=>{
    res.sendFile(__dirname + "/static/json/category.json");
});

app.get("/publish",(req,res)=>{
    res.sendFile(__dirname + "/static/json/publish.json");
});

app.get("/categorias-info",(req,res)=>{
    res.sendFile(__dirname + "/static/json/category-info.json");
});

app.get("/productos",(req,res)=>{
    res.sendFile(__dirname + "/static/json/productos.json");
});

app.get("/productos-info",(req,res)=>{
    res.sendFile(__dirname + "/static/json/productos-info.json");
});

app.get("/comentarios",(req,res)=>{
    res.sendFile(__dirname + "/static/json/productos-comentarios.json");
});

app.get("/carrito",(req,res)=>{
    res.sendFile(__dirname + "/static/json/cart.json");
});

app.get("/buy",(req,res)=>{
    res.sendFile(__dirname + "/static/json/buy.json");
});



app.post('/nuevo-comentario',function(req, res) {
   
    let newComent = 
`Usuario: ${req.body.user},
Comentario: ${req.body. description},
Calificación: ${req.body.score},
Fecha: ${req.body.dateTime}

`;

    fs.appendFile("new coment.txt",newComent, function(err){
        if(err){
            console.log(err);
            res.send({
                mensaje: "Ha ocurrido un error:" + err
            });
        } else {
            console.log("Archivo guardado");
            res.send({
                mensaje: "El comentario ha sido guardado con exito"
            })
        }
    })
});

app.post('/nuevo-carrito',function(req, res) {
   
    let newComent = 
`Nombre: ${req.body.name},
Precio: ${req.body.unitCost},
Moneda: ${req.body.currency},
Cantidad: ${req.body.count},
Foto: ${req.body.src}

`;

    fs.appendFile("new cart.txt",newComent, function(err){
        if(err){
            console.log(err);
            res.send({
                mensaje: "Ha ocurrido un error:" + err
            });
        } else {
            console.log("Archivo guardado");
            res.send({
                mensaje: "El producto ha sido guardado con exito"
            })
        }
    })
});


app.use((req,res,next) =>{
    res.status(404).sendFile(__dirname + "/static/404.html");
})

app.listen(port, ()=>{
    console.log("Escuchando a http://localhost:" + port);
});