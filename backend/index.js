const express = require('express')

const app = express()

// Routes

// Main
app.get('/', (req, res) => {
    res.json({
        evento: 'Semana OmniStack 11',
        aluno: 'José Guilherme'
    })
})

app.listen(3333)