// Desafio 1
// use("aggregations");
db.movies.aggregate([
  {
    $match: {
      $and: [
        {
          "imdb.rating": { $gte: 7 }, /* maior ou igual */
        },
        {
          genres: { $nin: ["Crime", "Horror"] }, /* não deve conter  */
        },
        {
          rated: { $in: ["PG", "G"] }, /* deve ser igual */
        },
        {
          languages: { $all: ["English", "Spanish"] }, /* Todos que contém */
        },
      ],
    },
  },
]);
