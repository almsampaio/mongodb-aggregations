db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    genres: { $elemMatch: { $nin: ["Crime", "Horror"] } },
    rated: { $in: ["PG", "G"] },
    languages: { $all: ["English", "Spanish"] },
  } },
]);
