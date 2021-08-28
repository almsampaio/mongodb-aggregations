db.movies.aggregate([
  { $match: { awards: /Won.*Oscar/ } },
  { $group: {
    _id: null,
    maxRating: { $max: "$imdb.rating" },
    minRating: { $min: "$imdb.rating" },
    avgRating: { $avg: "$imdb.rating" },
    stdDev: { $stdDevSamp: "$imdb.rating" },
  } },
  { $project: {
    maior_rating: "$maxRating",
    menor_rating: "$minRating",
    media_rating: { $round: ["$avgRating", 1] },
    desvio_padrao: { $round: ["$stdDev", 1] },
    _id: 0,
  } },
]);
