// Agora que você tem os campos essenciais, aplique mais
// um estágio na pipeline do desafio anterior que atenda
// a seguinte demanda:

// Retorne esses filmes ordenados por ano e nota
// IMDB de forma decrescente e título por ordem alfabética.
db.movies.aggregate([{ $match:
  { $and: [
    { "imdb.rating": { $gte: 7 } },
    { genres: { $ne: "Crime" } },
    { genres: { $ne: "Horror" } },
    { $or: [{ rated: { $eq: "G" } },
      { rated: { $eq: "PG" } }] },
    { $and: [{ languages: { $eq: "English" } },
      { languages: { $eq: "Spanish" } }] },
  ] } },
{ $sort: { year: -1, "imdb.rating": -1, title: 1 } },
{ $project: {
  titulo: "$title",
  avaliado: "$rated",
  notaIMDB: "$imdb.rating",
  votosIMDB: "$imdb.votes",
  ano: "$year",
  _id: 0,
} }, { $limit: 41 }]);
