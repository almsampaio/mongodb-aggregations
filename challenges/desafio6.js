// use("aggregations")
// db.movies.find()

// Fazer um $project dos seguintes pontos em imdb.rating:
// 1. maior_rating
// 2. menor_rating
// 3. media_rating
// 4. desvio_padrao
// Antes disso, verificar se o filme tem ao menos 1 Oscar (tem que ter o texto "won x oscar")
// Obs: Usar $round em media_rating e desvio_padrao em 1 casa decimal
// Obs: Usar $stdDevSamp para o desvio_padrao

// método $stdDevSamp encontrado no link:
// https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/

// como usar regex com números encontrado no link:
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions

db.movies.aggregate([
  { $match: {
    awards: { $regex: /won \d oscar/i },
  } },
  { $group: {
    _id: null,
    maior_rating: {
      $max: "$imdb.rating",
    },
    menor_rating: {
      $min: "$imdb.rating",
    },
    media: {
      $avg: "$imdb.rating",
    },
    desvio: {
      $stdDevSamp: "$imdb.rating",
    },
  } },
  { $project: {
    _id: 0,
    maior_rating: 1,
    menor_rating: 1,
    media_rating: {
      $round: ["$media", 1],
    },
    desvio_padrao: {
      $round: ["$desvio", 1],
    },
  } },
]);
