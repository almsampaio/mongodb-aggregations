const favoriteActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
    // para realizar essa filtragem extra me baseei nessa discussão do stack overflow: https://stackoverflow.com/questions/61977081/how-to-get-the-size-of-the-set-obtained-from-setintersection-method-in-mongod
    cast: { $in: favoriteActors },
  } },
  { $addFields: {
    num_favs: {
      $size: { $setIntersection: [favoriteActors, "$cast"] },
    },
  } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: {
    title: 1,
    _id: 0,
  } },
]);
