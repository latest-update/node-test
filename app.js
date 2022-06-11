const express = require ( "express" );
const db = require ( "./db.js" );
const isEmpty = require('lodash.isempty');

const app = express ();
const jsonParser = express.json();
const database = new db();

app.post("/save", jsonParser, (request, response) => {
    if ( isEmpty(request.body) )
        response.status(400).json(
            { message: "Post request has empty body" }
        );
    const sql = "INSERT INTO apps (id, data) VALUES (NULL, ?)";
    const data = [JSON.stringify(request.body)];

    database.connection.query(sql, data)
        .then(res => {
            response.status(201).json(
                { message: "Successfully", id: res[0].insertId }
            );
        })
        .catch(err => {
            response.status(500).json(
                { message: "Something goes wrong" }
            );
        });
});

app.get("/:id", (request, response) => {

    database.connection.query(`SELECT * FROM apps WHERE id = ${request.params.id}`)
        .then(res => {
            let data = JSON.parse( res[0][0].data );
            response.json(data);
        })
        .catch(err => {
            console.log(err)
            response.status(404).json(
                { message: "Couldn't found such app" }
            );
        });

});

app.listen(process.env.PORT || 3000);