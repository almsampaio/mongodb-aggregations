// Solução encontrada com ajuda do código do Eduardo Costa - Turma 10-A
const actors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate(
  {
   $match: {
    "countries": "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $in: actors },
   },
  },
  {
    $addFields: {
      num_favs: { 
        $size: { $setIntersection: [ actors, "$cast" ] },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1
    },
  },
  {
    // especifica os campos que serão incluidos ou excluidos
    $project: {
      title: 1,
      _id: 0,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
);
