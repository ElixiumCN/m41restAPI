const User = require('./userModel');
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = await jwt.sign({_id: newUser._id}, process.env.SECRET);
        res.status(201).send({user: "user has been created", token});
    } catch {
    console.log(error)
    res.status(500).send({error: error.message})
    }
};

exports.readUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send({user: users})
    } catch {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};

exports.updateUser = async (req, res) => {
    try {
        await User.updateOne(
            {username: req.body.username},
            {[req.body.key]: req.body.value}
        );
        res.status(200).send({message: "successfully updated a user"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({username: req.params.username});
        res.status(200).send({message: "successfully deleted a user"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};

exports.loginUser = async(req, res) => {
    try {
        const token = await jwt.sign({_id: req.user._id}, process.env.SECRET);
        res.status(200).send({user: req.user.username, token, text: "successfully logged in"})
    } catch {
        console.log(error)
        res.status(500).send({error: error.message}) 
    }
}

// Task is to generate a token on createuser & loginuser.
// This token should include unique information from the db entry.
// The token needs to be sent back in the response
// & have an endpoint that will find the user given just the token.
// - don't use this JOOP again. It irritates me.