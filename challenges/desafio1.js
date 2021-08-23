db.movies.aggregate([
  { $match: {
    $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $nin: ["Crime", "Horror"] } },
      { rated: { $in: ["PG", "G"] } },
      { languages: { $all: ["English", "Spanish"] } },
    ],
  } },
]);

// Consegui resolver somente quando utilizei o $all para que os elementos no array fossem iguais ao passado, link de referência: https://docs.mongodb.com/manual/reference/operator/query/all/
