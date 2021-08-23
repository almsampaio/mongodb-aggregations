db.movies.aggregate(
  [
    {
      $match: {
        awards: { $regex: /^Won ([0-9]|[0-9][0-9]) Oscar/ },
      },
    },
    { $sort: { "imdb.rating": -1 } },
    {
      $group: {
        _id: null,
        maior_rating: { $first: "$imdb.rating" },
        menor_rating: { $last: "$imdb.rating" },
        media_rating: { $avg: "$imdb.rating" },
        desvio_padrao: { $stdDevSamp: "$imdb.rating" },
      },
    },
    {
      $project: {
        _id: 0,
        "imdb.rating": 1,
        title: 1,
        awards: 1,
        maior_rating: 1,
        menor_rating: 1,
        media_rating: { $round: ["$media_rating", 1] },
        desvio_padrao: { $round: ["$desvio_padrao", 1] },
      },
    },
  ],
);
