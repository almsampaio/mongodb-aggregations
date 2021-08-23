const favorites = [
  "Sandra Bullock", "Tom Hanks", "Julia Roberts",
  "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  {
    $match: {
      $and: [
        { cast: { $in: favorites } },
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ],
    } },
  { $addFields: {
    num_favs: {
      $size: {
        $setIntersection: [favorites, "$cast"],
      },
    } },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },

  { $project: {
    title: 1,
    _id: 0,
  } },

]);

// para a conclusão deste requisito realizei consulta no
// repositório do colega
// viniciusfranca019
