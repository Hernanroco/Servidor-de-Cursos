const express = require('express');
const { infoCursos } = require('../datos/cursosex');

const routerProgramacion = express.Router();

//Middleware
routerProgramacion.use(express.json());


routerProgramacion.get('/', (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
});


routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

  if(resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`)
  }

  if(req.query.ordenar === 'vistas') {
    return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));
  }
  res.send(JSON.stringify(resultados));
});


routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

  if(resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}` )
  }
  res.send(JSON.stringify(resultados))
});

routerProgramacion.post('/', (req, res) => {
  let cursoNuevo = req.body;
  infoCursos.programacion.push(cursoNuevo);
  res.send(JSON.stringify(infoCursos.programacion));
});

routerProgramacion.put('/:id', (req, res) => {
  const cursoActualizado = req.body;
  const id= req.params.id;

  const indice = infoCursos.programacion.findIndex(curso => curso.id == id);

  //actualizar la informacion de los cursos
  if ( indice >= 0 ){
    infoCursos.programacion[indice] = cursoActualizado;
  }
  res.send(JSON.stringify(infoCursos.programacion));
})

module.exports = routerProgramacion;