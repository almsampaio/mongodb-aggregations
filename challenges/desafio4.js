// use("aggregations")

// Fazer os seguintes pontos:
// 1. Criar um campo $addFields: title_split
// 2. Esse campo é um array de palavras do título
// 3. A pipeline tem que retornar apenas titulos com 1 palavra
// 4. Usar o $size pra isso
// 5. Fazer $sort de title: 1
// 6. Fazer $project apenas de title_split

// método $split encontrado no link:
// https://docs.mongodb.com/manual/reference/operator/aggregation/split/

db.movies.aggregate([
  { $addFields: {
    title_split: {
      $split: ["$title", " "],
    },
  } },
  { $match: {
    title_split: { $size: 1 },
  } },
  { $sort: { title: 1 } },
  { $project: {
    _id: 0,
    title_split: 1,
  } },
]);
