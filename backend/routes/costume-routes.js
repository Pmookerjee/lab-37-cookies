'use strict';

const jsonParser = require('body-parser').json();
const express = require('express');
const Costume = require(__dirname + '/../models/costume');

const costumeRouter = module.exports = express.Router();


costumeRouter.post('/costumes', jsonParser, (req, res, next) => {
  console.log('post request ????')
  
  let newCostume = new Costume(req.body);

  newCostume.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 400, message: err, error: err}));

});

costumeRouter.get('/costumes', (req, res, next) => {
  let cosObj = req.params || {};
  Costume.find(cosObj)
    .then(costume => res.send(costume))
    .catch(err => next({statusCode: 500, error: err}));
});

costumeRouter.get('/costume/:id', (req, res, next) => {
  Costume.findOne({_id: req.params.id})
    .then(costume => res.send(costume))
    .catch(err => next({statusCode: 404, message: 'Not Found', error: err}));
});

costumeRouter.put('/costume/:id', jsonParser, (req, res, next) => {

  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'Bad Request'});
  }
  delete req.body._id;
  Costume.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => res.send('Costume has been updated!'))
    .catch(err => next({statusCode: 404, message: 'Bad Request', error: err}));
});


costumeRouter.delete('/costume/:id', (req, res, next) => {
  console.log('hello??????')
  Costume.remove({_id: req.params.id})
    .then(() => res.send('Costume has been deleted'))
    .catch(err => next({statusCode: 500, error: err}));
});
