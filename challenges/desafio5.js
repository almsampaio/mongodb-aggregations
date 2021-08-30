const favoritos = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Cloone",
];

db.movies.aggregate([
  {
    $match: {
      cast: { $in: favoritos },
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: "USA",
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [favoritos, "$cast"],
        },
      },
    },
  },
  { $project: { title: true, _id: false } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 25 },
  { $limit: 1 },
]);
