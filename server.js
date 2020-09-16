const express = require("express");
const path = require("path")
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'db')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get('/api/notes', (req, res) => {
    console.log('Serving database..')
    return res.json(JSON.parse(fs.readFileSync('db/db.json')))
})
app.post('/api/notes', (req, res) => {
    console.log('Posting new note...')
    let tempDB = JSON.parse(fs.readFileSync('db/db.json'))
    tempDB.push(req.body)
    fs.writeFileSync('db/db.json', JSON.stringify(tempDB))
})

app.listen(PORT, () => {
    console.log("Server is listening on PORT " + PORT)
})