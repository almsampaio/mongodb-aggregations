// 6 - Calcule o maior valor, menor valor, média e o desvio padrão das
// avaliações (campo imdb.rating).
// use("aggregations");
db.movies.aggregate(
  [
    {
      $match: {
        awards: { $regex: /Won [0-9] Oscar/ },
      },
    },
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
        maior_rating: "$maior_rating",
        menor_rating: "$menor_rating",
        media_rating: { $round: ["$media_rating", 1] },
        desvio_padrao: { $round: ["$desvio_padrao", 1]},
      },
    },
  ],
);
