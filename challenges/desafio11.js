db.trips.aggregate(
  [
    {
      $project: {
        dateWeek: { $dayOfWeek: "$startTime" },
      },
    },
    {
      $group: {
        _id: "$dateWeek",
        total: { $sum: 1 },
      },
    },
    {
      $sort: { total: -1 },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        diaDaSemana: "$_id",
        total: "$total",
      },
    },
  ],
);
