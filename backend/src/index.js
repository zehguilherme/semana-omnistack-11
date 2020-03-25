const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())  //requisições no formato json
app.use(routes)

app.listen(3333)
