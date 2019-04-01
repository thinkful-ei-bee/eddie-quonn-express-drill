const express = require('express');

const app = express();


app.use(express.static('public'));
app.get('/sum', (req, res) => {
const c = parseFloat(req.query.a) + parseFloat(req.query.b);
     ;
     res.send(`The sum of ${req.query.a} and ${req.query.b} is ${c}`);
  });

  app.get('/cipher', (req, res) => {
    const result = req.query.text + parseFloat(req.query.shift);

         let textString = req.query.text.split('').map((char) => {
            
            return String.fromCharCode(char.charCodeAt(0) + parseFloat(req.query.shift));
         });

         res.send(textString.join(''));
      });
  
  app.listen(8080, () => {
      console.log("express is running!");
  })