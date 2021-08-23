db.trips.aggregate([
  {
    $addFields: {
      dia_semana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$dia_semana",
      soma: { $sum: 1 },
    },
  },
  { $sort: { soma: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$soma" } },
]);
