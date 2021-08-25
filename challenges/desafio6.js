db.movies.aggregate([
  { $match: {
    awards: { $regex: /^Won \d+ Oscar/i },
  } },

  { $group: {
    _id: null,
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $avg: "$imdb.rating" },
    desvio_padrao: { $stdDevSamp: "$imdb.rating" },
  },
  },
  { $project: {
    maior_rating: 1,
    menor_rating: 1,
    media_rating: { $round: ["$media_rating", 1] },
    desvio_padrao: { $round: ["$desvio_padrao", 1] },
    _id: 0,
  },
  },
]);

// no match, utilizei da expressão ^WOn para buscar uma string que comece com o valor Won
// também utilizei o \d para buscar um valor numérico e o + para indicar que também
// busco o valor Oscar seguindo diretamente do valor numérico.
// ( o + só funciona colado na expressão \d )

// no group, utilizei o _id com valor null para indicar que o agrupamento deveria ser
// feito com todos os documentos que passassem pelo match.
// utilizei do max, min, avg e stdDevSamp para o calculo dos valores, os colocando em novos campos

// no project, pus os quatro novos campos menos o _id para aparecerem na visualização.

// fontes utilizadas : https://docs.mongodb.com/manual/reference/operator/aggregation/group/
// para o conceito de null no _id.

// https://docs.mongodb.com/manual/reference/operator/query/regex/ e
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
// para a utilização do regex.
