// 6.Considerando todos os filmes que ganharam o Oscar pelo menos uma vez,
// calcule o maior valor, menor valor, média e
// o desvio padrão das avaliações (informação do campo imdb.rating no banco).

db.movies.aggregate([
  { $match: { awards: { $regex: /Won.*Oscar/i } },
  }, { $group: {
    _id: null, // para agregar todos os documentos da coleção
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $avg: "$imdb.rating" },
    desvio_padrao: { $stdDevSamp: "$imdb.rating" },
  },
  }, {
    $project: {
      maior_rating: { $round: ["$maior_rating", 1] },
      menor_rating: { $round: ["$menor_rating", 1] },
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
      _id: 0,
    },
  },
]);

// Source:
// https://mongoing.com/docs/reference/operator/aggregation-group.html
// https://mongoing.com/docs/reference/operator/aggregation/group.html#pipe._S_group
// https://docs.mongodb.com/manual/reference/operator/aggregation/round/
