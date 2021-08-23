db.trips.aggregate(
  [
    {
      $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } },
    },
    {
      $group: {
        total: { $sum: 1 },
        _id: "$diaDaSemana",
      },
    },
    {
      $project: {
        _id: 0,
        diaDaSemana: "$_id",
        total: "$total",
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: 1,
    },
  ],
);
