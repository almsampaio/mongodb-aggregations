db.movies.aggregate({
  $match: {
    "imdb.rating": { $gte: 7 },
    genres: { $not: {
      $elemMatch: {
        $in: ["Crime", "Horror"],
      } } },
    rated: { $in: ["PG", "G"] },
    languages: { $all: ["English", "Spanish"] },
  },
});
