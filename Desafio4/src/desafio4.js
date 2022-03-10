const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('./public'));

const routerProductos = express.Router();

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
    getById(buscar){
        return this._producto[buscar];
    }
    updateById(id,actualizar){
        const actualizar1 = actualizar;
        let id2 = id - 1;
        let id3 = id2 + 1;
        actualizar1.id = id3;
        this._producto[id2] = actualizar;
    }
    deleteById(borrar){
        borrar = borrar - 1;
        this._producto.splice(borrar,1);
    }

}

//TODO ------------------- Devuelve todos los productos --------------------------------------- 
routerProductos.get('/',(req,res) => {
    res.status(200).json(producto1.producto);
});

//TODO ------------------- Agrega un producto y devuelve todos los productos --------------------------------------- 
routerProductos.post('/',(req,res) => {
    const {body} = req;
    producto1.addProducto(body);
    res.status(200).send('Producto agregado');
});

//TODO ------------------- Obtener por ID --------------------------------------- 
routerProductos.get('/:id',(req,res) => {
    const {id} = req.params;
    res.status(200).json(producto1.getById(id));
});

//TODO ------------------- Recibir y actualizar por ID --------------------------------------- 
routerProductos.put('/:id',(req,res) => {
    const {id} = req.params;
    const {body} = req;
    producto1.updateById(id,body);
    res.status(200).send('Producto actualizado');
});

//TODO ------------------- Elimina por ID ---------------------------------------
routerProductos.delete('/:id', (req,res) => {
    const {id} = req.params;
    producto1.deleteById(id);
    res.status(200).send("borrado con exito");

});

const producto1 = new Productos([]);

app.use('/api/productos',routerProductos);

//* Server ajustes.
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`👾 Server started on http://localhost:8080 !!`);
});
server.on('error', (err) => console.log(err));