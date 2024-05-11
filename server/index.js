const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Event = require("./models/event");
const Signup = require("./models/Signup");
const userRegister = require("./models/userRegistration");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });


app.post("/signup", async (req, res) => {
    const { fname, phone, email, pass } = req.body;
    try {
        const user = await Signup.findOne({ email: email });
        if(user){
            res.json("Already an user");
        }
        else{
            const hashpass = await bcrypt.hash(pass, 10);
            await Signup.insertMany({ fname, phone, email, pass: hashpass });
            res.status(200).json("Success");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Failed");
    }
});

app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await Signup.findOne({ email: email });
        if (user) {
            const match = await bcrypt.compare(pass, user.pass);
            if (match) {
                res.json(user);
            }
            else {
                res.json("The password is incorrect");
            }
        }
        else {
            res.json("No record existed");
        }
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
})

app.get("/event", async (req, res) => {
    try {
        const event = await Event.find();
        res.json(event);
    }
    catch (err) {
        res.json(err);
    }
})



app.post("/registeredevent", async (req, res) => {
    const { email, participantid, eventid, name, time, img, person, date ,bool} = req.body;
    try {
        const response = await Signup.findOne({ email: email });
        if (response) {
            const r=await userRegister.findOne({email,eventid});
            console.log("Already: ",r);
            if(!r){
            const eve = await userRegister.insertMany({ email, participantid, eventid, name, time, img, person, date,bool });
            console.log(eve);
            res.json("Success"); 
            }
            else{
                res.json("Already Registered");
            }
        }
        else {
            res.json("Not an user");
        }

    }
    catch (err) {
        res.json(err);
    }
})

app.post("/user", async (req, res) => {
    const { email } = req.body;
    try {
        const r = await userRegister.find({ email });
        res.json(r);
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/userfind", async (req, res) => {
    const { event } = req.body;
    try {
        const r = await Event.findOne({ event });
        res.json(r);
    }
    catch (err) {
        console.log(err);
    }
})


app.listen(3000, () => {
    console.log("Running...");
});