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
    let tempDB = JSON.parse(fs.readFileSync('db/db.json'))
    let id = 1;
    while
        (tempDB.some((value, index) => {
            return value.id === id
        })) {
        id++
    }
    req.body.id = id;
    tempDB.push(req.body)
    console.log('Posting new note...')
    fs.writeFileSync('db/db.json', JSON.stringify(tempDB))
})
app.delete('/api/notes/:id', (req, res) => {
    let tempDB = JSON.parse(fs.readFileSync('db/db.json'));
    let id = parseInt(req.params.id);
    console.log(id)
    tempDB = tempDB.filter(value => {
        return value.id !== id
    });
    console.log(tempDB)
    fs.writeFileSync('db/db.json', JSON.stringify(tempDB))
})

app.listen(PORT, () => {
    console.log("Server is listening on PORT " + PORT)
})