// [ { diaDaSemana: 5, total: 357594 } ]

db.trips.aggregate([
  {
    $addFields: {
      diaDaSemanaInicio: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      diaDaSemanaInicio: { $eq: 5 },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      totalRides: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$totalRides",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
