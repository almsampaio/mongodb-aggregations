// Ocorre um erro se não incluir o _id no group: a group specification must include an _id
// Desvio: https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/
db.movies.aggregate([
  { $match: { awards: { $regex: /Won [0-9] Oscar/ } } },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
