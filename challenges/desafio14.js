db.trips.aggregate([
  { $addFields: {
    viagemEmMinutos: {
      $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        60000,
      ],
    },
  } },
  { $group: {
    _id: "$bikeid",
    mediaViagens: {
      $avg: "$viagemEmMinutos",
    },
  } },
  { $sort: {
    mediaViagens: -1,
  } },
  { $limit: 5 },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: {
      $ceil: "$mediaViagens",
    },
  } },
]);
