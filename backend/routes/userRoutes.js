const express = require('express');
const User = require("../models/userModel")

const router = express.Router();

router.post("/createdUser", async (req, res) => {
    try {
        const reqBody = req.body;
     const userData = new User(reqBody);
     const user = await userData.save();
     res.send(user, {message: "User created successfully"});
    } catch (error) {
        console.log(error);
    }

});

router.get('/readAll', async (req, res) => {
   try {
    const getData = await User.find({});
    res.send({ data: getData , message: "Data retrieved successfully"});
   } catch (error) {
    console.log(error);

   }
});

router.get('/oneUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user1 = await User.findById({_id: id});
        res.send(user1);
    } catch (error) {
        console.log(error);

    }
});


router.put("/updatedUser/:id", async (req, res) => {
try {
    const newData = req.body;
    const id = req.params.id;
    console.log(id, newData);
    const updateUser = await User.findByIdAndUpdate({_id: id}, newData, { new : true });
    console.log(updateUser);
     res.send({data: updateUser});
} catch (error) {
    console.log(error);

}

});

router.delete("/deletedUser/:id", async (req, res) => {
    try {
        
        const id = req.params.id;
        const deleteUser = await User.findByIdAndUpdate({id: id});
        res.send(deleteUser);

    } catch (error) {
        console.log(error);

    }
});


module.exports = router;