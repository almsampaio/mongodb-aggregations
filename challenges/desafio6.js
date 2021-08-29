db.movies.aggregate([
    {
      $match: {
        awards: { $regex: /Won.*Oscar/, $options: "si" },
      },
    },
    {
      $group: {
        _id: null,
        valuation: { $push: "$imdb.rating" },
      },
    },
    {
      $project: {
        _id: false,
        maior_rating: { $max: "$valuation" },
        menor_rating: { $min: "$valuation" },
        media_rating: { $round: [{ $avg: "$valuation" }, 1] },
        desvio_padrao: { $round: [{ $stdDevSamp: "$valuation" }, 1] },
      },
    },
  ]);
