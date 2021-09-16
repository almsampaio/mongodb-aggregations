db.trips.aggregate([
  { $addFields: {
    date: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
  } },
  { $match: {
    date: { $in: ["2016-03-10"] },
  } },
  { $group: {
    _id: "odeio yyy-mm-dd",
    duracao: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracao" },
  } },
]);
