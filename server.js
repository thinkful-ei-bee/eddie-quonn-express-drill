const express = require('express');
const app = express();

// express app
app.use(express.static('public'));

// server endpoint call
app.get('/sum', (req, res) => {

    // request variables
    const c = parseFloat(req.query.a) + parseFloat(req.query.b);
    // returns result of server call
    res.send(`The sum of ${req.query.a} and ${req.query.b} is ${c}`);
});

// server endpoint call
app.get('/cipher', (req, res) => {
    const result = req.query.text + parseFloat(req.query.shift);

    let textString = req
        .query
        .text
        .split('')
        .map((char) => {
            return String.fromCharCode(char.charCodeAt(0) + parseFloat(req.query.shift));
        });

    res.send(textString.join(''));
});

// server endpoint call
app.get('/lotto', (req, res) => {
    
    // "our" lotto numbers
    let numbers = req.query["arr"];
    
    // converts strings to numbers
    numbers = numbers.map(number => {
        return parseFloat(number)
    });

    // ceates array of winning lotto numbers
    const newRands = [];
    for (i = 0; i < 6; i++) {
        newRands.push(Math.floor(Math.random() * 20) + 1);
    }

    //compares "our" numbers to the winning numbers to create an array of matches
    let newArr = newRands.filter((number, index) => {
        if (number === numbers[index]) {
            return number;
        }
    });

    // message is based on how many numbers matched in previous step
    let message = `${newRands}`;
    if (newArr.length < 4) {
        message += `\n Sorry, you lose`;
    } else {
        message += "Congratulations, you've won the lottery!";
    }
    
    // displays winning or losing message on the screen
    res.send(message);
});

app.listen(8080, () => {
    console.log("express is running!");
})