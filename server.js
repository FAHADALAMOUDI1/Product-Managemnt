    const express = require('express');
    const app = express();
    const port = 3000;

    // Middleware
    app.use(express.static('public'));
    app.use(express.json());

    // Product data
    let dataPro = [];

    // Create or Update product
    app.post('/product', (req, res) => {
    const newPro = req.body;
    if (
        newPro.title &&
        newPro.price &&
        newPro.category &&
        newPro.count &&
        newPro.count < 100
    ) {
        if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
        } else {
        dataPro.push(newPro);
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
    });

    // Read product data
    app.get('/product', (req, res) => {
    res.json(dataPro);
    });

    // Update product
    app.put('/product/:index', (req, res) => {
    const index = req.params.index;
    const updatedPro = req.body;
    if (index >= 0 && index < dataPro.length) {
        dataPro[index] = updatedPro;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
    });

    // Delete product
    app.delete('/product/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < dataPro.length) {
        dataPro.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
    });

    // Delete all products
    app.delete('/product', (req, res) => {
    dataPro = [];
    res.sendStatus(200);
    });

    // Start the server
    app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    });

    // Json routing
    app.use(express.json());
    app.post("/process", (request, response) => {
    //reading form data
    //POST = request.body.name
    //GET = request.query.name
    const name = request.body.name;
    const email = request.body.email;
    let msg = {};
    if (name.length > 0 && email.length > 0) {
        msg = { status: true, err: "" };
    } else {
        msg = {
        status: false,
        err: "Kindly complete the form (Name and email are required!)",
        };
    }
    response.json(msg);
    });

    // database
        function addUser(name, email, aboutus) {
            //connection
            const mysql = require("mysql2");
            let db = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "root",
            port: "8889",
            database: "mytutorial",
            });
        
            db.connect(function (err) {
            //sql command
            let sql = `INSERT INTO user (name, email, aboutus) VALUES ('${name}', '${email}', '${aboutus}')`;
            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record has been added");
                //close connection
                db.end();
            });
            });
        }
