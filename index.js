const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const userroutes = require('./router/user');
const connectdb = require('./connect');
const app = express();
app.use(cors())
app.use(express.json())
app.use('/user', userroutes)
connectdb();
port = 3300;


// schema
const schemadata = mongoose.Schema({

    name: String,
    email: String,
    password: String,
    mobilenumber: Number
}, { timestamps: true })

const usermodel = mongoose.model("usersss", schemadata);


app.get('/', async (req, res) => {
    const data = await usermodel.find({})
    res.json({ success: true, data: data })
});
// create data or saving data into database
app.post('/createuser', async (req, res) => {
    console.log(req.body);
    const data = new usermodel(req.body)
    await data.save();
    res.json({ success: true, message: "Data Saved Successfully" })
})
// updating data
app.put('/updateuser', async (req, res) => {
    const { _id, ...rest } = req.body
    await usermodel.updateOne({ _id: _id }, rest)
    res.json({ success: true, message: "Data Updated successfully" })
})
// deleting data
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const data = await usermodel.deleteOne({ _id: id })
    res.json({ success: true, message: "Data Deleted Successfully" })

})


app.listen(port, () => {
    console.log(`Server Is Running On http://localhost:${port}`)
})