/* regex pego do colega https://github.com/tryber/sd-010-a-mongodb-aggregations/
blob/FelipeFloresweb-mongodb-aggregations/challenges/desafio6.js */
// material de apoio regex: https://regexone.com/lesson/line_beginning_end

db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won.*Oscar/i },
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
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
