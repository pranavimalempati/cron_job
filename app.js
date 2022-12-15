const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config()
const controller = require("./controller/controller")
const router = require("./router/router")
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use("/", router);
app.use(cors())
async function run() {
    //   const task = cron.schedule('0 0 0 * * *', controller.remove)
    const task = cron.schedule('*/30 * * * * *', controller.remove)
    await mongoose.connect("mongodb://localhost:27017");
    app.listen(process.env.PORT, () => {        
        console.log(`Now listening on port ${process.env.PORT}`); 
    });
}
run();


