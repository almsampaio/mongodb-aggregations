db.movies.aggregate([
    { $match:
        {
            "imdb.rating": { $gte: 7 },
            genres: { $nin: ["Crime", "Horror"] },
            rated: { $in: ["PG", "G"] },
            languages: { $all: ["English", "Spanish"] }
        }
    }
]);

// https://docs.mongodb.com/manual/reference/operator/query/all/
// The $all operator selects the documents where the value of
// a field is an array that contains all the specified elements. 
