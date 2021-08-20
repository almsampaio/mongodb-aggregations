// challenge 1;

db.movies.aggregate(
  [
    { $match: { $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $nin: ["Crime", "Horror"] } },
      { rated: { $in: ["PG", "G"] } },
      { $and: [{ languages: { $in: ["English"] } }, { languages: { $in: ["Spanish"] } }] },
    ] } },
  ],
);
