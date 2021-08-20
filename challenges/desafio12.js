db.trips.aggregate([
  { $addFields: {
    dia: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$dia",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: {
    diaDaSemana: "$_id",
    _id: 0,
    total: "$total",
  } },
  { $lookup: {
    from: "trips",
    let: { dia: "$diaDaSemana" },
    pipeline: [
      { $addFields: {
        dia: { $dayOfWeek: "$startTime" },
      } },
      { $match: {
        $expr: { $eq: ["$dia", "$$dia"] },
      } },
      { $group: {
        _id: "$startStationName",
        total: { $sum: 1 },
      } },
      { $sort: { total: -1 } },
      { $limit: 1 },
    ],
    as: "estacao",
  } },
  { $unwind: "$estacao" },
  { $project: {
    nomeEstacao: "$estacao._id",
    total: "$estacao.total",
  } },
]);
