db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $not: { $in: ["Crime", "Horror"] } } } },
  { $match: { languages: { $all: ["English", "Spanish"] } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
]);
