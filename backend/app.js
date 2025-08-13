// Libraries

import express from "express";
import cors from "cors";
import {createConnection} from "mysql2/promise";
import csv from "csv-parser";
import fs from "fs";
import multer from "multer";
import path from "path";
import dotenv  from "dotenv";

// Dotenv to use the .env file
dotenv.config();


const PORT = process.env.DB_PORT || 3000;

const app = express();

// Connection to mysql
async function connectDB() {
    return await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
};


// We will use cors and express json to understand this type of files
app.use(cors());
app.use(express.json());

connectDB();
// Console message when the database is connected
app.listen(PORT, () => {
    console.log("ready to go");
})

// Get ready the multer
const upload = multer({dest: path.join(process.cwd(), "uploads/")});

// Saves the csv in the system
app.post("/loadClients", upload.single("file"), async (req, res) => {
    let filePath = req.file.path;

    // Reads and post the csv
    fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (info) => {
        const {client_name, identification, email, telephone_number, address} = info;

        try {
        const connection = await connectDB();
        const [result] = await connection.execute("INSERT INTO clients (client_name, identification, email, telephone_number, address) VALUES (?,?,?,?,?)", [client_name, identification, email, telephone_number, address]);
        await connection.end();
        res.status(201).json({
            message: "Added succesfully!",
            insertedId: result.insertId
        });
    } catch (error) {
        console.error(`The client hasn't be added: ${error}`)
        res.status(500).json({error: "Failed to post"});
    };
    // Deletes the csv from the code and also keeps saved in the database
    fs.unlink(filePath, er => {
        if (er){
            console.error(er);
        }
    });
    });
    
})




// Get clients by the connection, then will appear a message in the console of the situation and finally, the connection will end.
app.get("/clients", async (req,res) => {
    try{
        const connection = await connectDB();
        const [rows] = await connection.execute(`SELECT * FROM clients`);
        await connection.end();
        return res.json(rows); 
    } catch (error) {
        console.error("ERROR: Cannot get /clients:", error.message);
        res.status(500).json({error: "Cannot get clients"})
    };
});

// Post clients, we will recive the information and the csv-parser will recive json to post it in the database.
app.post("/clients", async (req,res) => {
    const {client_name, identification, email, telephone_number, address} = req.body;

    try {
        const connection = await connectDB();
        const [result] = await connection.execute("INSERT INTO clients (client_name, identification, email, telephone_number, address) VALUES (?,?,?,?,?)", [client_name, identification, email, telephone_number, address]);
        await connection.end();
        res.status(201).json({
            message: "Added succesfully!",
            insertedId: result.insertId
        });
    } catch (error) {
        console.error(`The client hasn't be added: ${error}`)
        res.status(500).json({error: "Failed to post"});
    }
})

// We will recibe an ID of the client, the database will do a querie to find it and delete it.

app.delete("/clients/:id", async (req,res) => {
    const {id} = req.params;

    try {
        const connection = await connectDB();
        const [result] = await connection.execute("DELETE FROM clients WHERE client_id = ?", [id]);
        await connection.end();
        res.status(200).json({
            message: "Deleted succesfully!",
            id: result
        });
    } catch (error) {
        res.status(500).json({error: "The client hasn't been deleted"});
        console.error(`The client hasn't been deleted: ${error}`);
    }
})

// The database will recive the new info if there's changes, this process search the id of the client, later, will update the client.
app.patch("/clients/:id", async (req, res) => {
    const {id} = req.params;
    const {client_name, identification, email, telephone_number, address} = req.body;

    try {
        const connection = await connectDB();
        const [result] = await connection.execute("UPDATE clients SET client_name = ?, identification = ?, email = ?, telephone_number = ?, address = ? WHERE client_id = ?", [client_name, identification, email, telephone_number, address, id]);
        await connection.end();
        res.status(200).json({
            message: "Updated succesfully!",
            id: result
        });
    } catch (error) {
        res.status(500).json({error: "The client can't be updated"});
        console.error(`The client hasn't be updated: ${error}`);
    }
})




// Advanced querie #1
app.get("/clients_amount", async (req,res) => {
    try{
        const connection = await connectDB();
        const [rows] = await connection.execute(`SELECT * FROM clients_amount`);
        await connection.end();
        return res.json(rows); 
    } catch (error) {
        console.error("ERROR: Cannot get /clients:", error.message);
        res.status(500).json({error: "Cannot get clients"})
    };
});

// Advanced querie #2
app.get("/clients_debtors", async (req,res) => {
    try{
        const connection = await connectDB();
        const [rows] = await connection.execute(`SELECT * FROM clients_debtors`);
        await connection.end();
        return res.json(rows); 
    } catch (error) {
        console.error("ERROR: Cannot get /clients:", error.message);
        res.status(500).json({error: "Cannot get clients"})
    };
});

// Advanced querie #3
app.get("/client_platforms", async (req,res) => {
    try{
        const connection = await connectDB();
        const [rows] = await connection.execute(`SELECT * FROM client_platforms`);
        await connection.end();
        return res.json(rows); 
    } catch (error) {
        console.error("ERROR: Cannot get /clients:", error.message);
        res.status(500).json({error: "Cannot get clients"})
    };
});