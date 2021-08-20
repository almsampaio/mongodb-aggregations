db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    media: { $avg: { $divide: [
      { $subtract: ["$stopTime", "$startTime"] },
      60 * 1000,
    ] } },
  } },
  { $project: {
    bikeId: "$_id",
    _id: 0,
    duracaoMedia: { $ceil: "$media" },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
