db.movies.aggregate([
  {
    $match: {
      $and: [
        {
          cast: {
            $in: [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
          },
        },
        {
          countries: {
            $in: ["USA"],
          },
        },
        {
          "tomatoes.viewer.rating": {
            $gte: 3,
          },
        },
      ],
    },
  },
  {
    $addFields: {
      favorite_actors: [
        "Sandra Bullock",
        "Tom Hanks",
        "Julia Roberts",
        "Kevin Spacey",
        "George Clooney",
      ],
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            "$favorite_actors",
            "$cast",
          ],
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
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
