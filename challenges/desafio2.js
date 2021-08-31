db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $nin: ["Crime", "Horror"] } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $match: { $and: [
    { languages: { $eq: "English" } },
    { languages: { $eq: "Spanish" } },
  ] } },
  { $project: {
    titulo: $title,
    avaliado: $rated,
    notaIMDB: $imdb.rating,
    votosIMDB: $imdb.votes,
    ano: $year,
    _id: 0,
  } },
]);

/*
Como projetar campos específicos em uma aggregation:
https://docs.mongodb.com/manual/reference/operator/aggregation/project/

Como renomear nome dos campos dentro da pipeline:
https://stackoverflow.com/questions/35620274/mongo-aggregate-rename-field-with-project
*/
