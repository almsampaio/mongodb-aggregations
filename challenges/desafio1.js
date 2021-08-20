db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    $and: [{ languages: { $in: ["English"] } }, { languages: { $in: ["Spanish"] } }],
    $or: [{ rated: "G" }, { rated: "PG" }],
    $nor: [{ genres: "Crime" }, { genres: "Horror" }],

  } },
]);
