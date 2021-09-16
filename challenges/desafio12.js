db.trips.aggregate([
  {
    $addFields: {
      diaDaPartida: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        diaDaPartida: "$diaDaPartida",
        startStationName: "$startStationName",
      },
      totalViagens: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$totalViagens",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  { $limit: 1 },
]);
