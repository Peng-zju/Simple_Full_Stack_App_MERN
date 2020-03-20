const Movie = require('../models/movie-model')

createMovie = async (req, res) => {
    const body = req.body
    console.log(body)

    if(!body){
        return res.status(400).json({
            success : false,
            error: 'You must provide a movie',
        })
    }

    const movie = new Movie(body)
    console.log(movie)

    if(!movie)
        return res.status(400).json({
            success:false,
            error: 'Movie not created.',
        })

    movie
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: movie._id,
                message : 'Movie '+movie.name +' created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })

}

updateMovie = async (req, res) => {
    const body = req.body

    if(!body){
        return res.status(400).json({
            success: failure,
            error: "You must provide information to update"
        })
    }

    Movie.findOne({_id:req.params.id}, (err, movie) => {
        if(err)
            return res.status(404).json({
                err,
                message:"Movie not found!",
            })

        //update document from db (movie) with the value from req (body)
        movie.name = body.name
        movie.time = body.time
        movie.rating = body.rating

        //save movie into db
        movie
            .save()
            .then(() => {
                res.status(200).json({
                    success: true,
                    id: movie._id,
                    message: 'Movie ' + movie._id + ' updated to ' +movie.name,
                })
            })
            .catch(err => {
                return res.status(500).json({
                    err,
                    message: 'Movie update failed!'
                })
            })
    })
}

deleteMovie = async (req, res) => {
    await Movie.findOne({_id: req.params.id}, (err, movie) => {
        if (err)
            return res.status(400).json({
                success: false,
                error: err,
            })
    })

    await Movie.findOneAndDelete({_id: req.params.id}, (err, movie) => {
        if(!movie)
            return res.status(404).json({
                success:false,
                message: 'Movie ' + movie._id + ' not found!'
            })
        return res.status(200).json({
            success:true,
            data: movie,
        })

    })
        .catch(err => console.log(err))
}

getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if(err)
            return res.status(500).json({
                success:false,
                error: err,
            })

        if(!movies.length)
            return res.status(404).json({
                success:false,
                error: 'Movie not found!'
            })

        return res.status(200).json({
            success: true,
            data: movies,
        })
    }).catch(err => {
        console.log(err)
    })
}

getMovieById = async (req, res) => {
    await Movie.findOne({_id:req.params.id}, (err, movie)=>{
        if(err)
            return res.status(500).json({
                success:false,
                error: err
            })

        if(!movie)
            return res.status(404).json({
                success:false,
                error: 'Movie not Found',
            })

        return res.status(200).json({
            success:true,
            data: movie,
        })
    }).catch(err => {
        console.log(err)
    })
}
module.exports = {
    createMovie, updateMovie, deleteMovie, getMovies, getMovieById
}

