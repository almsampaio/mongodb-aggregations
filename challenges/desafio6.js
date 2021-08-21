/* Vamos explorar mais operadores aritméticos!

Considerando todos os filmes que ganharam o Oscar pelo menos uma vez,
calcule o maior valor, menor valor, média e o desvio padrão das avaliações
(informação do campo imdb.rating no banco)
Para a média e o desvio padrão arredonde os valores para uma casa decimal
utilizando o $round. */

db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /^Won\s[1-9]\sOscar/,
      },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      avg: { $avg: "$imdb.rating" },
      dp: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$avg", 1] },
      desvio_padrao: { $round: ["$dp", 1] },
    },
  },
]);
