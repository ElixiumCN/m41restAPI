const Movies = require("./movieModel");

// List
exports.listMovies = async (req, res) => {
    try {
        let movieList = await Movies.find({});
        if (movieList.length > 0){
            console.log("listMovie")
            res.status(200).send(movieList);
        }
        else {
            console.log("You haven't added any movies yet")
            res.status(400).send({error: "Error"})
        }
    } catch (e) {
        console.log("Error in listMovie")
        res.status(500).send({error:"Internal Server Error"})
        console.log(e)
    }
}
exports.listTitles = async (req, res) => {
    try {
        let movieList = await Movies.find({});
        if (movieList.length > 0){
            console.log("listTitles")
            let title = []
            for(let i = 0; i < movieList.length; i++){
                title.push(i+1, movieList[i].title)
            }
            res.status(200).send(title);
        }
        else {
            console.log("You haven't added any movies yet")
            res.status(400).send({error: "Error"})
        }
    } catch (e) {
        console.log("Error in listTitles")
        res.status(500).send({error:"Internal Server Error"})
        console.log(e)
    }
}
exports.listActors = async (req, res) => {
    try {
        let movieList = await Movies.find({});
        if (movieList.length > 0){
            console.log("inside listActors")
            let title = []
            for(let i = 0; i < movieList.length; i++){
                title.push(i+1, movieList[i].actor)
            }
            res.status(200).send(title);
        }
        else {
            console.log("You haven't added any movies yet")
            res.status(400).send({error: "Error"})
        }
    } catch (e) {
        console.log("listActors")
        res.status(500).send({error:"Internal Server Error"})
        console.log(e)
    }
}
exports.listMovie = async (req, res) => {
    try {
        let movieTitle = await Movies.find({title: req.query.title});
        if (movieTitle.length === 0){
            res.status(404).send({message: "No results"})
            console.log(movieTitle + "not available")
        }
        else if (movieTitle.length > 0){
            console.log(movieTitle + "listMovie")
            res.status(200).send(movieTitle);
        }
        else {
            console.log("No results")
            res.status(400).send({error: "Error"})
        }
    } catch (e) {
        console.log("Error in listMovie")
        res.status(500).send({error:"Internal Server Error"})
        console.log(e)
    }
}
exports.listActor = async (req, res) => {
    try {
        let movieTitle = await Movies.find({actor: req.query.actor});
        if (movieTitle.length === 0){
            res.status(404).send({message: "no results"})
            console.log(movieTitle + " no results")
        }
        else if (movieTitle.length > 0){
            console.log(movieTitle + " listActor")
            res.status(200).send(movieTitle);
        }
        else {
            console.log("No results")
            res.status(400).send({error: "Error"})
        }
    } catch (e) {
        console.log("error in listActor")
        res.status(500).send({error:"Internal Server Error"})
        console.log(e)
    }
}
// Add
exports.addMovie = async (req, res) => {
    try {
        if (req.body.title && req.body.actor){
            console.log(req.body)
            await Movies.create({title: req.body.title, actor: req.body.actor});
            res.status(201).send(await Movies.find({}));
        }
        else {
            console.log("Title or Actor not found")
            res.status(400).send({error: "Title or Actor not found"})
        }
    } catch (e) {
        console.log("Error in Add Movie")
        res.status(500).send({error:"Internal Server Error"})
        console.log(e)

    }
}
// Delete
exports.deleteMovie = async (req, res) => {
    try {
        let title = await Movies.find({title: req.body.title})
        if ((req.body.title && req.body.actor) && title.length > 0){
            await Movies.deleteOne({ title: req.body.title, actor: req.body.actor })
            res.status(200).send(await Movies.find({}))
        }
        else if ((req.body.title && !req.body.actor) && title.length > 0){
            await Movies.deleteOne({ title: req.body.title})
            res.status(200).send(await Movies.find({}))
        } 
        else if (title.length > 0 && (!req.body.title && req.body.actor)) {
            res.status(400).send({error: "Please specify the movie you want to delete by title or title and actor not just actor!"})
        }
        else if (title.length > 0 && (!req.body.title || !req.body.actor) ){
            console.log("Please specify the movie you want to delete by specifying title or title and actor")
            res.status(400).send({error: "Please specify the movie you want to delete by specifying title or title and actor!"})
        } else if (title.length < 1){
            console.log("Nothing to delete")
            res.status(404).send({error: "Movie not found"})            
        }
        else {
            console.log("Nothing to delete")
            res.status(400).send({error: "Error"})
        }
    } catch (e) {
        console.log("error in deleteMovie")
        res.status(500).send({error:"500 - Internal Server Error"})
        console.log(e)
    }
}
// Edit
exports.editMovie = async (req, res) => {
    try {
        let title = await Movies.find({title: req.body.title})
        // update title using title key and new title key
        if(title.length > 0 && (req.body.title && req.body.newT && (!req.body.actor || !req.body.newA))){
            await Movies.updateOne(title, {title: req.body.newT})
            res.status(200).send(await Movies.find({}))
        }// update movie actor using title key and new actor 
        else if(title.length > 0 && (req.body.title && req.body.newA && (!req.body.actor || !req.body.newT))){
            await Movies.updateOne(title, {actor: req.body.newA})
            res.status(200).send(await Movies.find({}))
        }// update movie and actor using all keys
        else if(title.length > 0 && (req.body.title && req.body.newT && req.body.actor && req.body.newA)){
            await Movies.updateOne(
                { title: req.body.title, actor: req.body.actor }, 
                { title: req.body.newT, actor: req.body.newA })
            res.status(200).send(await Movies.find({}))
        }// update actor by specfiying movie actor and title and new actor
        else if (title.length > 0 && (req.body.actor && req.body.title && req.body.newA && !req.body.newT)){
            await Movies.updateOne(
                { title: req.body.title, actor: req.body.actor }, 
                {actor: req.body.newA })
            res.status(200).send(await Movies.find({}))
        }  // update title by specfiying movie actor and title and new title
        else if (title.length > 0 && (req.body.actor && req.body.title && !req.body.newA && req.body.newT)){
            await Movies.updateOne(
                { title: req.body.title, actor: req.body.actor }, 
                {actor: req.body.newA })
            res.status(200).send(await Movies.find({}))
        } 
        
        // if you try to update movie using actor only and new actor and actor using all keys
        else if (title.length > 0 && (req.body.newA && req.body.actor && (!req.body.title || !req.body.newT))){ 
            console.log("A title must be specified")
            res.status(405).send({error: `Requires "title" key `})
        } else if (title.length < 1){
            console.log("Nothing to edit")
            res.status(404).send({error: "Movie not found"})
        }
        else {
            console.log("Nothing to edit")
            res.status(400).send({error: "Error"})
        }
    } catch (e) {
        console.log("edit Movie - error")
        res.status(500).send({error:"500 - Internal Server Error"})
        console.log(e)
    }
}