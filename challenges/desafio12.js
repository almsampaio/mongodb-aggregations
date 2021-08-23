db.trips.aggregate([
  {
    $set: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      diaDaSemana: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      total: -1,
      nomeEstacao: 1,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: {
        $max: "$total",
      },
    },
  },
  {
    $limit: 1,
  },
]);
