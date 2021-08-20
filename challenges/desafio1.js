// Retorne todos os filmes que satisfaça, através de uma pipeline, as condições abaixo
// imdb.rating deve ser maior ou igual a 7;
// genres não deve conter Crime ou Horror;
// rated deve ser igual a PG ou G;
// languages contém English e Spanish.
// Utilize a coleção movies.
// Sua query deve retornar 41 documentos.

db.movies.aggregate([{ $match:
  { $and: [
    { "imdb.rating": { $gte: 7 } },
    { genres: { $ne: "Crime" } },
    { genres: { $ne: "Horror" } },
    { $or: [{ rated: { $eq: "G" } }, { rated: { $eq: "PG" } }] },
    { $and: [{ languages: { $eq: "English" } }, { languages: { $eq: "Spanish" } }] },
  ] } }, { $limit: 41 }]);
