// 2 - Utilizando o mesmo pipeline anterior, retorne apenas os
// campos title, rated, imdb.rating, imdb.votes e year,
// modificando seus nomes para titulo, avaliado, notaIMDB,
// votosIMDB e ano
// use("commerce");
db.movies.aggregate( // 5
  [
    {
      $match: {
        "imdb.rating": { $gte: 7 }, // 1
        genres: { $nin: ["Crime", "Horror"] }, // 2
        rated: { $in: ["PG", "G"] }, // 3
        languages: { $all: ["English", "Spanish"] }, // 4
      },
    },
    {
      $project: {
        _id: 0,
        titulo: "$title",
        avaliado: "$rated",
        notaIMDB: "$imdb.rating",
        votosIMDB: "$imdb.votes",
        ano: "$year",
      },
    },
  ],
);
