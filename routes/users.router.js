
const express = require('express');
const router = express.Router();

//utilizandop parametros query
router.get('/users/idUser', (req, res)=>{
  const {idUser} = req.query;
  res.json({
  });
});
