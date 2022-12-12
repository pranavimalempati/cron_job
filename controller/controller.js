const { db } = require("../db");
const users = db.collection("Users");
const cron = require('node-cron');

// inserting the data into database
const add = async(req,res)=>{
    try {
        const resp = await users.insertMany(req.body);
        res.send(resp)
    } catch (error) {
        res.send (error.message)
    }
}

// scheduling a cronjob to update comments every day at 12am which is equal to current date
const update = (req,res)=>{
    try {
    // const task = cron.schedule('*/30 * * * * *', cronjob)
    const task = cron.schedule('0 0 0 * * *', cronjob)
    async function cronjob(){
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    const currentDate = date+ "-" + month + "-" +year
    const input = await users.find().toArray()
    const columnName = "expiery_date";
    const output = input.map(x => x[columnName])
        for(let i=0 ; i<output.length ;i++ ){
            if(output[i] == currentDate){
                const filter ={expiery_date:currentDate}
                const updateDoc = {$set:{comment:"user expired"}}
                const resp =  await users.updateMany(filter,updateDoc);
                console.log(resp)
            }else{
                console.log("null")
            }
        }
        console.log('---------------------'),
        console.log('running a task every 30 seconds')
    }
    res.send("successfully updated")
    } catch (error) {
        console.log(error.message)
    }
}

// scheduling a cronjob to delete record every day at 12am which is equal to current date
const remove = (req,res)=>{
    try {
    // const task = cron.schedule('*/30 * * * * *', cronjob)
    const task = cron.schedule('0 0 0 * * *', cronjob)
    async function cronjob(){
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    const currentDate = date+ "-" + month + "-" +year
    const input = await users.find().toArray()
    const columnName = "expiery_date";
    const output = input.map(x => x[columnName])
        for(let i=0 ; i<output.length ;i++ ){
            if(output[i] == currentDate){
                const filter ={expiery_date:currentDate}
                const resp =  await users.deleteMany(filter);
                console.log(resp)
            }else{
                console.log("null")
            }
        }
        console.log('---------------------'),
        console.log('running a task every 30 seconds')
    }
    res.send("successfully deleted")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { add ,update, remove}