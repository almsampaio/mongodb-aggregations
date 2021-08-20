const dateToSearch = { year: 2016, month: 3, day: 10 };

db.trips.aggregate([
  { $project:
    {
      year: { $year: "$startTime" },
      month: { $month: "$startTime" },
      day: { $dayOfMonth: "$startTime" },
      duracaoMediaEmMinutos: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] },
    },
  },
  { $match: dateToSearch },
  { $group: { _id: null, duracaoMediaEmMinutos: { $avg: "$duracaoMediaEmMinutos" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } },
]);
