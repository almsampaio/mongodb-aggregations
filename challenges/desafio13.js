db.trips.aggregate([
  { $match: { $and: [{ startTime: { $gte: ISODate("2016-03-10T00:00:00Z") } },
    { startTime: { $lt: ISODate("2016-03-11T00:00:00Z") } }] } },
  { $group: {
    _id: null,
    media: { $avg: { $divide: [
      { $subtract: ["$stopTime", "$startTime"] },
      60 * 1000,
    ] } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$media" },
  } },
]);
