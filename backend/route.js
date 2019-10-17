const mongoose = require('mongoose');
const express = require('express');
const routes = express.Router()

let Media = require('../models/Media')

// route: /media/
routes.get('/', (req, res) => {
    Media.find({title: new RegExp(req.query.search, 'i')},
        (err, media) => {
        if (err) {
            console.log(err);
        } else {
            res.json(media);
        }
    });
});

// route: /media/new
routes.post('/new', (req, res) => {
    let newMedia = new Media(req.body);
    console.log("Creating new media!!");
    
    newMedia.save()
        .then(media => {
            res.status(200).json({'media': newMedia});
        })
        .catch(err => {
            res.json(err);
        });
});

routes.put('/update/:id', (req, res) => {
    console.log("I am updating!");

    let mediaUpdate = new Media(req.body);

    Media.updateOne({_id: req.params.id}, req.body, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(200).send("succesfully saved");
    })
})

routes.delete('/delete/:id', (req, res) => {
    console.log("deleting media!")
    
    Media.deleteOne({ _id: req.params.id })
        .then(media => {
            res.status(200).json({'deleted!': req.params.id});
        })
        .catch(err => {
                res.json(err);;
        });
})

module.exports = routes