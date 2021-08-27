db.trips.aggregate([
  { $group:
    {
      _id: { $dayOfWeek: "$startTime" },
      numeroViagens: { $sum: 1 },
    },
  },
  { $project:
    {
      diaDaSemana: "$_id",
      total: "$numeroViagens",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

// Para achar o maior número e limitar por uma
// única resposta utilizei o $sort e o $limit
