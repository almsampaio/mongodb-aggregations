db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won.*Oscar/i },
    },
    // Regex copiado de: https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/31/files
  },
  {
    $group: {
      _id: 0,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$maior_rating", 1] },
      menor_rating: { $round: ["$menor_rating", 1] },
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
