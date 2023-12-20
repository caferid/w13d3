const express = require('express')
const fileUpload = require('express-fileupload');
const path = require('path')
const app = express()
app.use(fileUpload());
const port = 3000
console.log(__dirname);
// .json
app.use(express.json()) // parse requests of content-type - application/json

app.post('/upload', function (req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = path.join(__dirname,"public", sampleFile.name);
    console.log(uploadPath);
    sampleFile.mv(uploadPath, function(err) {
        if (err)
        return res.status(500).send(err)

        res.send('File uploaded!');
    });
})


// add img in public
app.use(express.static('public'))


// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
//   })
function ferid(req, res, next) {
    console.log("helebaxaq bui nece isliyir");
    next()
}

const ispassword = function (req, res, next) {
    if (req.body.password === "12345") {
        next();
    } else {
        res.send({ status: "error", message: 'Password is incorrect' })
    }
}




app.post('/', ispassword, (req, res) => {
    res.send('Hello World!')
})
app.get('/', ferid, (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})