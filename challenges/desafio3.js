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
  {
    $project:
      {
        _id: 0,
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
]);
