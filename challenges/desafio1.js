db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    genres: { $nin: ["Horror", "Crime"] },
    rated: { $in: ["PG", "G"] },
    languages: { $all: ["English", "Spanish"] } } }]);
