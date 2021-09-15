db.movies.aggregate([
  {
    $addFields: {
      favs:
        ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
    },
  },
  {
    $match: {
      $and: [
        {
          cast: {
            $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
          },
        },
        { countries: { $eq: "USA" } },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ],
    },
  },
  {
    $set: {
      commonToBoth: { $size: { $setIntersection: ["$cast", "$favs"] } },
    },
  },
  {
    $sort: { commonToBoth: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  {
    $project: {
      title: 1,
      _id: 0,
    },
  },
  { $limit: 25 },
  { $skip: 24 },
]);

/* Referências:
  Como usar o setIntersection:
      https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/

  Como ignorar os primeiros resultados do limit para obter apenas o 25 documento:
      https://docs.mongodb.com/manual/reference/operator/aggregation/skip/
*/
