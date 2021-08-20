db.movies.aggregate([{ $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { $nor: [{ genres: "Crime" }, { genres: "Horror" }] } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $match: { $and: [{ languages: "English" }, { languages: "Spanish" }] } }]);
