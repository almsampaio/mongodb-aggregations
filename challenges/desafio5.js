const FAV_ACTORS = [
  'Sandra Bullock',
  'Tom Hanks',
  'Julia Roberts',
  'Kevin Spacey',
  'George Clooney'
];

db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": {$gte: 3} },
        { cast: { $in: FAV_ACTORS } }
      ]
    }
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: [FAV_ACTORS, "$cast"] } }
    }
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1
    }
  },
  {
    $project: {
      _id: 0,
      title: 1
    }
  },
  { $limit: 25 },
  { $skip: 24 }
]);