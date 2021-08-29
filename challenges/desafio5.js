const favoriteActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate({
  $match: {
    "countries.0": "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
  } }, {
  $addFields: {
    fav_intersection: { $setIntersection: [favoriteActors, "$cast"] },
  } }, {
  $project: {
    _id: 0,
    num_favs: {
      $size: { $ifNull: [
        "$fav_intersection", [],
      ] },
    },
    title: 1,
  } }, {
  $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } }, {
  $project: {
    _id: 0,
    title: 1,
  } });
