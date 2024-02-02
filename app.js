const express = require('express');
const app = express(); 

const { matematicas } = require('./datos/cursosex.js');

//Routers
const routerProgramacion = require('./routers/programacion.js')
app.use('/api/cursos/programacion', routerProgramacion); 

const routerMatematicas = require('./routers/matematicas.js')
app.use('/api/cursos/matematicas', routerMatematicas);



app.get('/', (req, res) => {
  res.send('Mi primer servidor, en curso ok');
});


app.get('/api/cursos', (req, res) => {
  res.send(JSON.stringify(infoCursos));
});



const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Mi servidor esta escuchando en el puerto ${PUERTO}...`);
});