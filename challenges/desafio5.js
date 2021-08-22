const favs = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  { $match:
    { $and:
      [{
        countries: "USA",
        "tomatoes.viewer.rating": { $gte: 3 },
        cast: { $in: favs },
      }],
    },
  },
  { $addFields:
    { num_favs:
      { $setIntersection: ["$cast", favs] },
    },
  },
  { $project: { title: 1, _id: 0 } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
]);

// https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/
