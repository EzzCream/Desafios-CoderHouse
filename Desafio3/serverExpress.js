const express = require('express');
const fs = require('fs');

class Contenedor {

    constructor (prod) {
        this._prod = prod;
    }

    get producto() {
        return this._prod;
    }

    async save(nombre,apellido){

        let id = 1;
        this._prod.map(() => {
            return id++;
        })
        this._prod.push({id,nombre, apellido});

        try {
            await fs.promises.writeFile("Desafio.txt",JSON.stringify(this._prod));
        } catch (error) {
            console.log(error);
        }

        //return await console.log(`El id asignado a ${nombre} es: ${id}`);

    }

    async getAll(){
        try {
            const data = await fs.promises.readFile('Desafio.txt','utf-8');
            return console.log(JSON.parse(data));
        } catch (error) {
            console.log(error);
        }
    }

    async getById(buscar){

        try {
            this._buscar = buscar - 1;

            const data = await fs.promises.readFile('Desafio.txt','utf-8');
            const elem = JSON.parse(data);
            return console.log(elem[this._buscar]);
        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteById(borrar){

        try {
            this._borrar = borrar - 1;
            const data = await fs.promises.readFile('Desafio.txt','utf-8');
            const elem = JSON.parse(data);
    
            elem.splice(this._borrar,1);
    
            await fs.promises.writeFile("Desafio.txt",JSON.stringify(elem));
    
            return console.log(`Se ha eliminado el elemento con el ID: ${borrar}`);
        } catch (error) {
            console.log(error);
        }

    }

    async deleteAll(){

        try {
            await fs.promises.unlink("Desafio.txt");
            await fs.promises.writeFile("Desafio.txt",' ');
            return await console.log('Se han borrado los datos');
        } catch (error) {
            console.log(error);
        }

    }
    
}

const elemento1 = new Contenedor([]);

// * Salvando personas en el arreglo 
elemento1.save('Angelica','Torres');
elemento1.save('Uriel','Badillo');
elemento1.save('Oscar','Antonio');

// * Obtener por un ID
//elemento1.getById(3);

// * Obteniendo TODO lo que se encuentra en el archivo
//elemento1.getAll();

// * Eliminar por el ID
//elemento1.deleteById(1);

// ! Eliminar todo
//elemento1.deleteAll();

const app = express();

// * Productos
const prod = JSON.stringify(elemento1.producto);

app.get('/productos',(req,res) => {
    res.send(`<h3>Los elementos son: ${prod}</h3>`);
});

const elemento = elemento1.producto;
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
let valor = getRandomArbitrary(0,2).toFixed();
let valor2 = elemento[valor];
const prod2 = JSON.stringify(valor2);

app.get('/productoRandom',(req,res) => {
    res.send(`<h3>El elemento random es: ${prod2}</h3>`);
});

const PORT = 8080;

const server = app.listen(PORT, () => {

    console.log(`🥳 Servidor escuchado en el puerto http://localhost:${PORT}`)

});

server.on('error', (error) => console.log(error));