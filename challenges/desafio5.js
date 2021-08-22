// https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/
// https://docs.mongodb.com/manual/reference/operator/aggregation/size/

const FAV_ACTORS = [
  "Sandra Bullock", "Tom Hanks", "Julia Roberts",
  "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $in: FAV_ACTORS },
        },
      ] },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [FAV_ACTORS, "$cast"],
        },
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
  {
    $project: {
      title: 1,
      _id: 0,
    },
  },
  { $limit: 25 },
  { $skip: 24 },
]);
