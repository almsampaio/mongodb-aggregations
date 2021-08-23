const dayOfWeek = db.trips.aggregate(
  [
    {
      $group: {
        _id: { $dayOfWeek: ["$startTime"] },
        total: { $sum: 1 },
      },
    },
    {
      $sort: { total: -1 },
    },
    {
      $project: {
        _id: 0,
        diaDaSemana: "$_id",
        total: "$total",
      },
    },
    { $limit: 1 },
  ],
).toArray();

db.trips.aggregate(
  [
    {
      $group: {
        _id: { nomeEstacao: "$startStationName", day: { $dayOfWeek: ["$startTime"] } },
        total: { $count: { } },
      },
    },
    {
      $match: {
        "_id.day": dayOfWeek[0].diaDaSemana,
      },
    },
    {
      $sort: { total: -1 },
    },
    {
      $project: {
        _id: 0,
        nomeEstacao: "$_id.nomeEstacao",
        total: "$total",
      },
    },
    { $limit: 1 },
  ],
);
