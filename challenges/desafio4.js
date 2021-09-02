db.movies.aggregate([
  { $addFields: {
    title_split: { $split: ["$title", " "] },
  } },
  { $match: { title_split: { $size: 1 } } },
  { $sort: { title: 1 } },
  { $project: {
    _id: 0,
    title_split: 1,
  } },
]);

/*
Como utilizar o operador split:
https://docs.mongodb.com/manual/reference/operator/aggregation/split/

Como utilizar o operador size:
https://docs.mongodb.com/manual/reference/operator/aggregation/size/

Consulta ao repositório do aluno Rafael Medeiros para entender
a melhor forma de usar o operador $size:
https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/90/commits/4a938a0481fe69b5d19a0878a8d29a5f348c99dc
*/
