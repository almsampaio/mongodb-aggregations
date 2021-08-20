// Desafio 1
// Ajude a Trybe a escolher um filme para a próxima noite! Baseado em uma pesquisa, 
// decidimos que os filmes em potencial devem atender alguns critérios, vejamos:

// Retorne todos os filmes que satisfaça, através de uma pipeline, as condições abaixo
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
    }
  }
]);