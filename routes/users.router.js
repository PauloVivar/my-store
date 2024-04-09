
const express = require('express');

const router = express.Router();

//utilizando parametros query
//router.get('/users/idUser', (req, res)=>{
router.get('/idUser', (req, res)=>{
  const {idUser} = req.query;
  res.json({
    idUser,
    firstName: "Paulo",
    lastName: "Vivar",
    age: "31"
  });
});

module.exports = router;

