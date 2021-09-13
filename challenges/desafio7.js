db.movies.aggregate([
  { $match: { languages: { $in: ["English"] } } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    number_films: { $count: {} },
    mediaIMDB: { $avg: "$imdb.rating" },
  },
  },
  { $sort: { number_films: -1, _id: -1 } },
  {
    $project: {
      number_films: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
]);

/* Referências:
  Como usar o group: https://docs.mongodb.com/manual/reference/operator/aggregation/group/
  Como usar o round: https://docs.mongodb.com/manual/reference/operator/aggregation/round/
  Como usar o avg: https://docs.mongodb.com/manual/reference/operator/aggregation/avg/
  Operador que desconstrói um array e como usá-lo:
      https://app.betrybe.com/course/back-end/mongodb-aggregation-framework/aggregation-framework-parte-1/bf5e1776-42ac-44c7-82ea-d0c959136930/conteudos/144068ff-5dff-4e34-8f88-ceba21a6856f/operador-unwind/174774f3-26a6-47ef-b1de-5e0f687381c1?use_case=side_bar
*/
