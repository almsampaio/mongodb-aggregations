db.trips.aggregate([
  {
    $project: {
      _id: 0,
      nomeEstacao: "$startStationName",
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$nomeEstacao",
      diaDaSemana: { $push: "$diaDaSemana" },
    },
  },
  {
    $project: {
      total: {
        $size: {
          $filter: {
            input: "$diaDaSemana",
            as: "num",
            cond: {
              $eq: ["$$num", 5],
            },
          },
        },
      },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
  {
    $limit: 1,
  },
]);
