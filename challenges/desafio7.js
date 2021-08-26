db.movies.aggregate([
  { $unwind: "$cast" },
  { $match: { languages: "English" } },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    mediaIMDB: { $avg: "$imdb.rating" },
  },
  },
  { $project: {
    _id: 1,
    numeroFilmes: 1,
    mediaIMDB: { $round: ["$mediaIMDB", 1] },
  } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);

// primeiro utilizei o unwind para separar os atores dos filmes em que cast era um array,
// fazendo assim um documento para cada ator.
// depois com o match, eu filtrei apenas os atores cujo filme estivesse com o idioma em inglês.
// por ultimo, com o group, eu juntei todos os valores passando como parâmetro para o group,
// o nome do ator/atriz. Assim, podendo calcular em quantos filmes cada um aparecia e também
// sua nota média no imdb.
