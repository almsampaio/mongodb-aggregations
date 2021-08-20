// use("aggregations");
// db.movies.find();

db.movies.aggregate(
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      _id: 0,
      // title:1,
      // rated:1,
      // "imdb.rating":1,
      // "imdb.votes":1,
      // year:1,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: { ano: -1, notaIMDB: -1, titulo: 1 },
  },
  // {
  //   $group:{
  //     _id:null,
  //     count:{$sum:1}
  //   }
  // }
);
