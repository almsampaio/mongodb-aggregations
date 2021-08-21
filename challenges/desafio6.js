db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /Won ([0-9]+) Oscar/,
      },
    },
  },
  {
    $project: {
      awards: 1,
      "imdb.rating": 1,
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: {
        $max: "$imdb.rating",
      },
      menor_rating: {
        $min: "$imdb.rating",
      },
      media_rating: {
        $avg: "$imdb.rating",
      },
      desvio_padrao: {
        $stdDevSamp: "$imdb.rating",
      },
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

/**
 * Referências:
 * - Construção do Regex baseada no manual encontrado no medium
 *  Link: https://medium.com/xp-inc/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f
 *
 * - $stdDevSamp e $round consultados na documentação do mongodb
 * Links: https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/round/
 */
