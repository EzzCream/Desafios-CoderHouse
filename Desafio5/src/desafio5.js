const express = require('express');
const app = express();
//const {engine} = require('express-handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('./public'));

//TODO ------------------ Vistas con PUG ---------------------
// app.set('views','./src/viewsPug');
// app.set('view engine','pug');

//TODO ------------------ Vistas con HBS ---------------------
// app.set('views','./src/viewsHBS');
// app.set('view engine', 'hbs');

// app.engine('hbs',engine({
//     extname: '.hbs',
//     defaultLayout:'index.hbs',
//     layoutsDir: __dirname + '/viewsHBS/layout',
//     partialsDir: __dirname + '/viewsHBS/partials'
// }))

//TODO ------------------ Vistas con EJS ---------------------
app.set('views', './src/viewsEJS');
app.set('view engine', 'ejs');

class Productos{
    constructor(producto){
        this._producto = producto;
    }
    get producto(){
        return this._producto;
    }
    addProducto(producto){
        const producto1 = producto;
        let id = 1;
        this._producto.map(() => {
            return id++;
        });
        producto1.id = id;
        this._producto.push(producto1);
    }

}

const producto1 = new Productos([]);
let prod = producto1.producto;

//TODO ------------------- GET Ir al historial --------------------------------------- 
app.get('/productos',(req,res) => {
    //TODO ----- PUG ------
    //res.render('index',{prod})
    //TODO ----- HBS ------
    //res.render('main',{prod})
    //TODO ----- EJS ------
    res.render('pages/index',{prod});
});

//TODO ------------------- POST Agrega un producto --------------------------------------- 
app.post('/',(req,res) => {
    const {body} = req;
    producto1.addProducto(body);
    res.status(200).send('<script type="text/javascript">alert("Producto agregado");window.location.href = "http://localhost:8080";</script>');
    console.log(prod);
});

//* Server ajustes.
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`👾 Server started on http://localhost:8080 !!`);
});
server.on('error', (err) => console.log(err));