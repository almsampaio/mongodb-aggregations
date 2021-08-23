const searchTerm = /^Won \d+ Oscars?/g;

db.movies.aggregate([
  { $match: {
    awards: searchTerm,
  } },
  { $group: {
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $avg: "$imdb.rating" },
    desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    _id: null,
  } },
  { $project: {
    maior_rating: { $round: ["$maior_rating", 1] },
    menor_rating: { $round: ["$menor_rating", 1] },
    media_rating: { $round: ["$media_rating", 1] },
    desvio_padrao: { $round: ["$desvio_padrao", 1] },
    _id: 0,
  } },
]);
