//Para utilzar Mongo tenemos que tener instalado MongoDB, 
//la extensión llamada MongoDb for VS Code y MongoDB Shell.
//Todo esto se encuenta en el repositorio de la clase y los vídeos. 
//Fuera de eso, para asegurrarnos que todo funcionen
//correctamente las consultas están los documentos .http,
//para usar estos documentos se necesita de la extensión
//REST Client de VS Code.

// use LibraryMongo <-- Nombre de la base de datos

//----Creación de las tablas----

//insert data
// ---Usuarios---

db.usuarios.insertOne({
    nombre: 'Mad',
    apellido: 'Max',
    email: 'madmax@gmail.com',
    direccion: 'calle falsa 231',
    localidad: 'Rosario',
    tipo: 'user',
  })
  
db.usuarios.insertOne({
    nombre: 'Obi-Wan',
    apellido: 'Kenoby',
    email: 'Starmail@hotmail.com',
    direccion: '9mongolia 111',
    localidad: 'cuadrante 4',
    tipo: 'administrador',
  })

  db.usuarios.insertOne({
    nombre: 'Daniel',
    apellido: 'Daniels',
    email: 'DDaniel@outlook.com',
    direccion: 'avenida Daniels 344',
    localidad: 'Daniels',
    tipo: 'usuario',
  })  


db.usuarios.insertOne({
    nombre: 'AC',
    apellido: 'DC',
    email: 'ACDC@hotmail.com',
    direccion: 'address 123',
    localidad: 'Earth',
    tipo: 'usuario',
  })

//Insert data  
// ---Editoriales---

db.editoriales.insertOne({
  nombre: 'Gato-loco',
  categoria:'pre-escolar',
  })  


db.editoriales.insertOne({
  nombre:'Planeta',
  categoria:'ciencia', 
  })


  //query
  // Comandos para hacer distintas consultas a la base de datos
  
  db.usuarios.find()
  db.usuarios.find({ nombre: 'Obi-Wan' })
  db.usuarios.find({ id: ObjectId('6521d2ab2c7369d343ab91ba') })

  //update

  db.usuarios.updateOne({ nombre: 'Mad' }, { $set: { nombre: 'Anakin', email: 'Fallen Jedi' } })
  
  //delete

  db.usuarios.deleteOne({ nombre: 'Daniels' })