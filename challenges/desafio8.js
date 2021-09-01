db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $in: [
          "747",
          "380",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$airline.name",
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
  // {
  //   $project: {
  //     "airline.name": 1,
  //   },
  // },
]).pretty();

db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup:
      {
        from: "air_routes",
        let: { airlines2: "$airlines", name2: "$name" },
        pipeline: [
          { $match:
              { $expr:
                    [
                      { $eq: ["$airline.name", "$$airlines2"] },
                    ],
              },
          },
        ],
      },
  },
]);

db.air_alliances.findOne();

db.air_routes.findOne();
