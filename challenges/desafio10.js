db.trips.aggregate([
  {
    $addFields: {
      duration: { $divide: [
        { $subtract: ["$stopTime", "$startTime"] }, 3600000,
      ] },
    } },
  { $group: {
    _id: "$usertype",
    duration: { $avg: "$duration" },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duration", 2] },
  } },
]);
