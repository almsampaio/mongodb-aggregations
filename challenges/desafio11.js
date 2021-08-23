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
        _diaDaSemana: "$_id",
        _total: 1,
      },
    },
    {
      $project: {
        diaDaSemana: "$_diaDaSemana",
        total: "$_total",
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
