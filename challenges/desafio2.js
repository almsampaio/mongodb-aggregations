db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $nin: ["Crime", "Horror"] } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $match: { $and: [
    { languages: { $eq: "English" } },
    { languages: { $eq: "Spanish" } },
  ] } },
  { $project: {
    _id: 0,
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year",
  } },
]);

/*
Como projetar campos específicos em uma aggregation:
https://docs.mongodb.com/manual/reference/operator/aggregation/project/

Como renomear nome dos campos dentro da pipeline:
https://stackoverflow.com/questions/35620274/mongo-aggregate-rename-field-with-project

Consulta ao repositório para identificar possíveis erros do avaliador:
https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/124/commits/644a56b96a0809bc5dce9a9cfe3ee99afd336352
*/
