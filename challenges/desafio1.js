db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genre: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["G", "PG"] },
      languages: ["English", "Spanish"],
    },
  },
]);
