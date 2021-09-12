db.movies.aggregate([
  {
    $match: {
      $and: [
        { awards: { $regex: /\bwon\b.*\boscar/i } },
        { "imdb.rating": { $ne: "" } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media: { $avg: "$imdb.rating" },
      desvio: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media", 1] },
      desvio_padrao: { $round: ["$desvio", 1] },
      _id: 0,
    },
  },
]);

/* Referências:
  Como usar o round: https://docs.mongodb.com/manual/reference/operator/aggregation/round/
  Calcular o desvio padrão: https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/
  Como usar o group para calcular os valores: https://docs.mongodb.com/manual/reference/operator/aggregation/group/
  Como usar o regex para buscar os termos vencedores: https://docs.mongodb.com/manual/reference/operator/query/regex/
  Ajuda do desenvolvedor Felipe Teixeira (meu marido) na construção do regex
*/
