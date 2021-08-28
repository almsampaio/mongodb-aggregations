/* Desafio 7 - Vamos nos aprofundar um pouco mais em nossa coleção de filmes.

Conte quantos filmes cada um dos atores e atrizes do elenco (cast no banco) já
participou e obtenha uma média do campo imdb.rating para cada um desses atores e atrizes.

1. Traga o nome do ator ou atriz;
2. Número de filmes em que participou
3. Média do imdb desses filmes arredondada para uma casa decimal usando o operador $round.
4. Considere somente os membros do elenco de filmes com o idioma inglês (English).
5. Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.

Sua query deve retornar 47055 documentos. Cada documento no resultado deve ter
exatamente o seguinte formato (incluindo a ordem dos campos): */
db.movies.aggregate([
  { $match: { languages: { $regex: /english/i } } },
  { $unwind: "$cast" },
  { $group:
    { _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  { $project: { _id: true, numeroFilmes: true, mediaIMDB: { $round: ["$mediaIMDB", 1] } } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
