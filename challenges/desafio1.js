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
  // {
  //   $group:{
  //     _id:null,
  //     count:{$sum:1}
  //   }
  // }
);
