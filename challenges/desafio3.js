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
  { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } },
]);

/* Como ordenar os resultados de acordo com cada campo:
https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort
*/
