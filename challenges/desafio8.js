// Estudei e me baseei no PR do Iago conforme o link abaixo:
// https://github.com/tryber/sd-010-a-mongodb-aggregations/pull/46/files

db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $in: ["747", "380"],
      },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: {
        air_name: "$airline.name",
      },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: {
              $eq: ["$airlines", "$$air_name"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
          },
        },
      ],
      as: "airlines_routes_alliances",
    },
  },
  {
    $unwind: "$airlines_routes_alliances",
  },
  {
    $group: {
      _id: "$airlines_routes_alliances.name",
      totalRotas: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
