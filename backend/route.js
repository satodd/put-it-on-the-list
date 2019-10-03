const mongoose = require('mongoose');
const express = require('express');
const routes = express.Router()

let Show = require('../models/Show')

// route: /shows/
routes.get('/', (req, res) => {
    Show.find({title: new RegExp(req.query.search, 'i')},
        (err, shows) => {
        if (err) {
            console.log(err);
        } else {
            res.json(shows);
        }
    });
});

// route: /shows/new
routes.post('/new', (req, res) => {
    let newShow = new Show(req.body);
    console.log("Creating new show!!");
    
    newShow.save()
        .then(show => {
            res.status(200).json({'show': newShow});
        })
        .catch(err => {
            res.json(err);
        });
});

routes.put('/update/:id', (req, res) => {
    console.log("I am updating!");

    let showUpdate = new Show(req.body);

    Show.updateOne({_id: req.params.id}, req.body, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(200).send("succesfully saved");
    })
})

routes.delete('/delete/:id', (req, res) => {
    console.log("deleting show!")
    
    Show.deleteOne({ _id: req.params.id })
        .then(show => {
            res.status(200).json({'deleted!': req.params.id});
        })
        .catch(err => {
                res.json(err);;
        });
})

module.exports = routes