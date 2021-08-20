// 2 - Utilizando o mesmo pipeline anterior, retorne apenas os campos title,
// rated, imdb.rating, imdb.votes e year, modificando seus nomes para titulo,
// avaliado, notaIMDB, votosIMDB e ano, respectivamente.

db.movies.aggregate([{ $match: { $and: [
  { "imdb.rating": { $gte: 7 } },
  { genres: { $ne: "Crime" } },
  { genres: { $ne: "Horror" } },
  { $or: [{ rated: { $eq: "G" } }, { rated: { $eq: "PG" } }] },
  { $and: [{ languages: { $eq: "English" } }, { languages: { $eq: "Spanish" } }] }] },
}, { $project: {
  titulo: "$title",
  avaliado: "$rated",
  notaIMDB: "$imdb.rating",
  votosIMDB: "$imdb.votes",
  ano: "$year",
  _id: 0 } }, { $limit: 41 }]);
