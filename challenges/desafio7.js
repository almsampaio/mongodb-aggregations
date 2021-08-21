/* Conte quantos filmes cada um dos atores e atrizes do elenco (cast no banco)
já participou e obtenha uma média do campo imdb.rating para cada um desses
atores e atrizes.
   * Traga o nome do ator ou atriz;
   * Número de filmes em que participou
   * Média do imdb desses filmes arredondada para uma casa decimal usando o
    operador $round.
   * Considere somente os membros do elenco de filmes com o idioma inglês
    (English).
Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome
do ator ou atriz. */

db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      media_IMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$media_IMDB", 1] },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
]);
