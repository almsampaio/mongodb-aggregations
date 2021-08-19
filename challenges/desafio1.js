// Desafio 1

// Retorne todos os filmes que satisfaça, através de uma
//  pipeline, as condições abaixo:

// imdb.rating deve ser maior ou igual a 7;
// genres não deve conter Crime ou Horror;
// rated deve ser igual a PG ou G;
// languages contém English e Spanish.
// Utilize a coleção movies.
// Sua query deve retornar 41 documentos.

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);
