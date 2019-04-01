const express = require('express');

const app = express();

app.use(express.static('public'));
app.get('/sum', (req, res) => {
const c = parseFloat(req.query.a) + parseFloat(req.query.b);
     ;
     res.send(`The sum of ${req.query.a} and ${req.query.b} is ${c}`);
  });

  
  app.listen(8080, () => {
      console.log("express is running!");
  })