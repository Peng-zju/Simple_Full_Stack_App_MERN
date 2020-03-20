const Movie = require('../models/movie-model')

createMovie = (req, res) => {
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

module.exports = {
    createMovie,
}

