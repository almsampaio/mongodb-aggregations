db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ['747', '380'] }
    }
  },
  {
    $group: {
      _id: "$airline.name",
      somaRotas: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: 'air_alliances',
      let: { airline: "$_id", totalRotas: "$somaRotas" },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$$airline", "$airlines"],
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
      as: 'airlineRoutes',
    }
  },
  {
    $group: {
      _id: "$airlineRoutes.name",
      finalSum: { $sum: "$somaRotas" },
    },
  },
  {
    $unwind: "$_id",
  },
  {
    $sort: {
      finalSum: -1,
    },
  },
  {
    $project: {
      _id: 1,
      totalRotas: "$finalSum",
    },
  },
  {
    $limit: 1,
  },
]);