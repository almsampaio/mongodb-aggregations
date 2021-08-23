// 4 - Crie um pipeline que retorne apenas os filmes com o título composto apenas de uma palavra.
// 1 title_split deve conter uma lista de palavras presentes em title.
// 2 A pipeline deve retornar apenas filmes com o título composto apenas de uma palavra.
// 3 A pipeline deve ser ordenada por title em ordem alfabética.
// 4 A pipeline deve retornar apenas o campo title_split.
// use("aggregations");
db.movies.aggregate(
  [
    { $project: { title_split: { $split: ["$title", " "] }, _id: 0 } },
    {
      $sort: { title_split: 1 },
    },
    { $match: {
      title_split: { $size: 1 },
    } },
  ],
);
