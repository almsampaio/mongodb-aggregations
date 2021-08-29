db.trips.aggregate(
  [
    { $addFields: { dateWeek: { $dayOfWeek: "$startTime" } },
    },
    {
      $match: { dateWeek: 5 },
    },
    {
      $group: { _id: "$startStationName", total: { $sum: 1 } },
    },
    {
      $sort: { total: -1 },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: false,
        nomeEstacao: "$_id",
        total: "$total",
      },
    },
  ],
);
