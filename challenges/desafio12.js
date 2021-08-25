db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  }, {
    $match: {
      diaDaSemana: 5,
    },
  }, {
    $group: {
      _id: "$startStationName",
      count: {
        $sum: 1,
      },
    },
  }, {
    $sort: {
      count: -1,
    },
  }, {
    $limit: 1,
  }, {
    $project: {
      _id: false,
      nomeEstacao: "$_id",
      total: "$count",
    },
  },
]);
