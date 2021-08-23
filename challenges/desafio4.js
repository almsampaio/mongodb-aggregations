// 4. Crie uma pipeline que retorna documentos com o novo campo title_split,
// ela deve seguir as seguintes condições:
// --> title_split deve conter uma lista de palavras presentes em title.
// --> A pipeline deve retornar apenas filmes com o título composto apenas de uma palavra.
// --> A pipeline deve ser ordenada por title em ordem alfabética.

db.movies.aggregate([
  { $addFields:
  { title_split: { $split: ["$title", " "] },
  } },
  { $addFields: { arrSize: { $size: "$title_split" } } },
  { $match: { arrSize: { $eq: 1 } } },
  { $sort: {
    title: 1,
  } },
  { $project: {
    title_split: 1,
    _id: 0,
  } },
]);

// Source: https://docs.mongodb.com/manual/reference/operator/aggregation/split/
