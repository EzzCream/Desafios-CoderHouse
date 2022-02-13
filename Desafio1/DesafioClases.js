class Usuario {

    constructor(nombre, apellidos, libros, mascota){
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._libros = libros;
        this._mascota = mascota;
    }
    get mascota(){
        return this._mascota;
    }
    set mascota(mascota){
        this._mascota = mascota;
    }
    get libros(){
        return this._libros;
    }
    set libros(libros){
        this._libros = libros;
    }
    getFullName (){
        return this._nombre + ' ' + this._apellidos;
    }
    addMascota(animal){
        this._mascota.push(animal);
    }
    countMascotas(){
        return this._mascota.length;
    }
    addBook(libroP,autP){
        this._libros.libro.push(libroP);
        this._libros.autor.push(autP);
    }
    getBookNames(){
        return this._libros.libro;
    }

}

const usuario1 = new Usuario('Oscar','Antonio',{libro: ['Libro1'], autor: ['Autor1']},['Perro','Gato']);

//Obtener el nombre completo de la persona
console.log(usuario1.getFullName());

console.log(usuario1.mascota);

//Agregar mascotas
usuario1.addMascota('Jirafa');
console.log(usuario1.mascota);

//Ver el numero de mascotas que tiene
console.log(usuario1.countMascotas());

console.log(usuario1.libros);

//Agregar un libro
usuario1.addBook('LibroAgregado','AutorAgregdo');
console.log(usuario1.libros);

//Obtener el nombre de los libros
console.log(usuario1.getBookNames());
