// source: https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/80/files
db.movies.aggregate([
  { $match: { awards: { $regex: /Won/ } } },
  { $match: { awards: { $regex: /Oscar|Oscars/ } } },
  { $group: { id: null,
    count: { $sum: 1 },
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $avg: "$imdb.rating" },
    desvio_padrao: { $stdDevSamp: "$imdb.rating" },
  },
  },
  { $set: { media_rating: { $round: ["$media_rating", 1] }, desvio_padrao: { $round: ["$desvio_padrao", 1] } } },
  { $project: { _id: 0, count: 0 } },
]);
