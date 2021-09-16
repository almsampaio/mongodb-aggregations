db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $ne: { $in: ["Crime", "Horror"] } } } },
  { $match: { languages: { $in: ["English", "Spanish"] } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
]);
