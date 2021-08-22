// Retorne todos os filmes que satisfaça, através de uma pipeline, as condições abaixo
// 1 - imdb.rating deve ser maior ou igual a 7;
// 2 - genres não deve conter Crime ou Horror;
// 3 - rated deve ser igual a PG ou G;
// 4 - languages contém English e Spanish.
// 5 - Utilize a coleção movies.
// 6 - Sua query deve retornar 41 documentos.
// use("aggregations");
// db.movies.find();
db.movies.aggregate( // 5
  [
    {
      $match: { 
        "imdb.rating": { $gte: 7 }, // 1
        genres: { $nin: ["Crime", "Horror"] }, // 2
        rated: { $in: ["PG", "G"] }, // 3
        languages: { $all: ["English", "Spanish"] } // 4
      }
    }
  ]
);
