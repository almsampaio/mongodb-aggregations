db.movies.aggregate([
  { $match: { awards: { $regex: /won\s\d+\soscar/i } } },
  { $group: {
    _id: "junkook nova contratação do vasco",
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $avg: "$imdb.rating" },
    desvio_rating: { $stdDevSamp: "$imdb.rating" },
  } },
  { $project: {
    _id: 0,
    maior_rating: 1,
    menor_rating: 1,
    media_rating: { $round: ["$media_rating", 1] },
    desvio_padrao: { $round: ["$desvio_rating", 1] },
  } },
]);
