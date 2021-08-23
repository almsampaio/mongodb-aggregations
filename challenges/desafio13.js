db.trips.aggregate([
  {
    $addFields: {
      day: { $dayOfMonth: "$startTime" },
      month: { $month: "$startTime" },
      year: { $year: "$startTime" },
    },
  },
  { $match: {
    day: 10,
    month: 3,
    year: 2016,
  } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
  } },
]);
