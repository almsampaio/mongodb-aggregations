db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      dayOfWeek: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      totalTrips: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalTrips: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$totalTrips",
    },
  },
]);
