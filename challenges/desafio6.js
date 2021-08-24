// challenge 6;
// https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/60/commits/4f4590221a702e22ea0af9829598ee079676b716

db.movies.aggregate(
  [
    { $match: { $and: [{ awards: { $exists: true } }, { awards: { $regex: /Won \d+ Oscar/ } }] } },
    { $group: { _id: null, maior_rating: { $max: "$imdb.rating" }, menor_rating: { $min: "$imdb.rating" }, media_rating: { $avg: "$imdb.rating" }, desvio_padrao: { $stdDevSamp: "$imdb.rating" } } },
    { $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    } },
  ],
);
