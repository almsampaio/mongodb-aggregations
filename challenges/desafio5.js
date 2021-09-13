db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": {
      $gte: 3,
    },
  } },
  { $addFields: {
    arrayFavoritos: {
      $setIntersection: [
        "$cast",
        ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
      ],
    },
  } },
  { $match: {
    arrayFavoritos: { $not: { $eq: null } },
  } },
  { $addFields: {
    num_favs: { $size: "$arrayFavoritos" },
  } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: {
    _id: 0, title: 1,
  } },
]);

//  Referência: https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/#mongodb-expression-exp.-setIntersection
