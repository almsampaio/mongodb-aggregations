use("aggregations");
db.movies.aggregate([
  { $match: {
    $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $nin: ["Crime", "Horror"] } },
      { $or: [{ rated: "PG" }, { rated: "G" }] },
      { $and: [{ languages: "English" }, { languages: "Spanish" }] },
    ],
  } },
]);
