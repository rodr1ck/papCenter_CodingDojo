const { MovieModel } = require('../models/movie.model')
const { ReviewModel } = require('../models/reviews.model')
const { User } = require('../models/user.model')

const newReview = async (req, res) => {
    try {
        const { createdBy, content, rating, movieId } = req.body
        const user = await User.findById(createdBy).exec()
        const review = ReviewModel({ createdBy: user, content, rating })
        await review.save()

        const movie = await MovieModel.findById(movieId).exec()
        console.log(movie)
        
        const { reviews: _reviews } = await movie
            .populate('reviews')
            .execPopulate()
        console.log({_reviews})
        console.log({review})
        // const { reviews: _reviews } = movie
        const reviews = [..._reviews, review]
        console.log({_reviews})
        const averageRating =
            reviews.reduce((acc, val) => acc + val.rating, 0) / reviews.length
        movie.averageRating = averageRating
        movie.reviews.push(review)
        await movie.save()

        user.reviews.push(review)
        await user.save()
        res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

module.exports = { newReview }
