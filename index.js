const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv') // dotenv se mera database ka password koi dekh nh skta h
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

dotenv.config() // dotenv ko access krte h isse

mongoose.connect(process.env.MONGO_URL) // jo bhi url atlas se copy kiye the wo .env file me assign kr denge aur yaha process.env ke baad likhnge
.then(() => console.log("DB Connection Successfull"))
.catch((err) => console.log(err))

app.use(express.json()) // iske bina postman se kuch bhi bhejoge to nh aayega response me

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute); // jb is api pe jaynge to userRoute pe le jayega




app.listen(process.env.PORT || 5000, () => { // yaha bhi agr port nh h to 5000 se connect ho jayega
    console.log('Backend is Connected')
})