const favs = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match: {
    countries: { $all: ["USA"] },
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $exists: true },
  } },
  {
    $addFields: {
      num_favs: {
        $size: { $setIntersection: [favs, "$cast"] },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $limit: 25 },
  { $skip: 24 },
  { $project: {
    _id: 0,
    title: 1,
  } },
]);

// Tive dificuldade em elaborar a query e pude ter
// luz ao ver o PR de um dos meus colegas da turma
// https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/10
