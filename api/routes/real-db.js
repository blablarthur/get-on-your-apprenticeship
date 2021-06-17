var express = require('express');
const axios = require('axios').default;
var router = express.Router();

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'harrypotter-api-316818'
});

router.get('/', function (req, res) {
  res.send('This is real-db route');
});

router.get('/students', function (req, res) {
  const dbCollectionRef = req.query.house !== undefined ?  db.collection('students').where('house', '==', req.query.house) : db.collection('students');
  dbCollectionRef.get()
  .then(querySnapshot => {
    let docs = querySnapshot.docs;
    var students = [];
    for (let doc of docs) {
      console.log(`Document found at path: ${doc.ref.path}`);
      const data = doc.data();
      students.push(
        {
          name: data.name,
          species: data.species,
          gender: data.gender,
          house: data.house,
          dateOfBirth: data.dateOfBirth,
          yearOfBirth: data.yearOfBirth,
          ancestry: data.ancestry,
          eyeColour: data.eyeColour,
          hairColour: data.hairColour,
          wand: {
            core: data.wand.core,
            length: data.wand.length,
            wood: data.wand.wood
          },
          patronus: data.patronus,
          hogwartsStudent: data.hogwartsStudent,
          hogwartsStaff: data.hogwartsStaff,
          actor: data.actor,
          alive: data.alive,
          image: data.image
        }
        );
      }
      res.json(students);
    })
  });
  
  router.get('/randomstudent', function (req, res) {
    const dbCollectionRef = req.query.house !== undefined ?  db.collection('students').where('house', '==', req.query.house) : db.collection('students');
    dbCollectionRef.get()
    .then(querySnapshot => {
      let docs = querySnapshot.docs;
      const rand = Math.round(Math.random() * (docs.length - 1));
      const data = docs[rand].data();
      res.json(
        {
          name: data.name,
          species: data.species,
          gender: data.gender,
          house: data.house,
          dateOfBirth: data.dateOfBirth,
          yearOfBirth: data.yearOfBirth,
          ancestry: data.ancestry,
          eyeColour: data.eyeColour,
          hairColour: data.hairColour,
          wand: {
            core: data.wand.core,
            length: data.wand.length,
            wood: data.wand.wood
          },
          patronus: data.patronus,
          hogwartsStudent: data.hogwartsStudent,
          hogwartsStaff: data.hogwartsStaff,
          actor: data.actor,
          alive: data.alive,
          image: data.image
        }
      );
    });
  });
    
  module.exports = router;
    