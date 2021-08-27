db.trips.aggregate([
  { $addFields:
    { numeroDoDia: { $dayOfWeek: "$startTime" } },
  },
  { $group:
    { _id:
      {
        dia: "$numeroDoDia",
        nomeEstacao: "$startStationName", 
      },
      numeroViagens: { $sum: 1 },
    },
  },
  { $project:
    {
      nomeEstacao: "$_id.nomeEstacao",
      total: "$numeroViagens",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

// Para achar o maior número e limitar por uma
// única resposta utilizei o $sort e o $limit
