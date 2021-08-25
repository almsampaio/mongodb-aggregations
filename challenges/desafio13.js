db.trips.aggregate([{
  $match: {
    $and: [
      { startTime: { $gte: new Date("2016-03-10T00:00:00.000Z") } },
      { startTime: { $lt: new Date("2016-03-11T00:00:00.000Z") } },
    ] },
},
{ $project: {
  media: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
  _id: 0,
},
},
{ $group: {
  _id: "$null",
  total: { $avg: "$media" },
},
},
{ $project: { duracaoMediaEmMinutos: { $ceil: "$total" }, _id: 0 } }]);
