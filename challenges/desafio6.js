db.movies.aggregate([
  { $match:
    { awards:
      { $regex: /Won [0-9] oscar/i },
    },
  },
  { $group:
    {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  { $project:
    {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
      _id: 0,
    },
  },
]);

// https://medium.com/xp-inc/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f
// Podemos determinar um conjunto de match em letras que vão
// de A à Z ou pegue qualquer digito (0 à 9).
