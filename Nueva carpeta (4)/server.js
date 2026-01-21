const express = require('express'); 
const cors = require('cors'); 
const questions = require('./questions.json'); 

const app = express(); 
const port = process.env.PORT || 3000; 


app.use(cors()); 


app.get('/api/questions', (req, res) => {
    res.json(questions); 
});


app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`); 
});