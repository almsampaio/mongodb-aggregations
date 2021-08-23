db.trips.aggregate([
  {
    $addFields: {
      dia_semana: { $dayOfWeek: "$startTime" },
      // station_name: ["$startStationName", "$endStationName"],
    },
  },
  {
    $match: {
      dia_semana: 5,
    },
  },
  // { $unwind: "$station_name" },
  {
    $group: {
      _id: "$startStationName",
      soma: { $sum: 1 },
    },
  },
  { $sort: { soma: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$soma" } },
]);
