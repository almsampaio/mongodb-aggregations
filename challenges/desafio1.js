/* Retorne todos os filmes que satisfaça, através de uma pipeline, as condições abaixo
imdb.rating deve ser maior ou igual a 7;
genres não deve conter Crime ou Horror;
rated deve ser igual a PG ou G;
languages contém English e Spanish.
Utilize a coleção movies.
Sua query deve retornar 41 documentos.
*/

// use("aggregations");
db.movies.aggregate([
  {
    $match:
      {
        $or: [{ rated: { $in: ["G", "PG"] } }],
        $and: [{ languages: "English" }, { languages: "Spanish" }],
        $nor: [{ genres: { $in: ["Crime", "Horror"] } }],
        "imdb.rating": { $gte: 7 },
      },
  },
]);
