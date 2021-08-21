db.movies.aggregate([{
  $match: { awards: { $regex: /won/i } } },
{ $project: { awards: { $split: ["$awards", ". "] }, "imdb.rating": 1, _id: 0 } },
{ $unwind: "$awards" },
{ $match: { awards: { $regex: /oscar/i } } },
{ $project: { "imdb.rating": 1 } },
{ $group: {
  _id: "imdb.rating",
  maior_rating: { $max: "$imdb.rating" },
  menor_rating: { $min: "$imdb.rating" },
  media_rating: { $avg: "$imdb.rating" },
  desvio_padrao: { $stdDevSamp: "$imdb.rating" },
} },
{ $project: {
  maior_rating: 1,
  menor_rating: 1,
  media_rating: { $round: ["$media_rating", 1] },
  desvio_padrao: { $round: ["$desvio_padrao", 1] },
  _id: 0,
} }]);
