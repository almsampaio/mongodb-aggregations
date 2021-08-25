db.trips.aggregate([
  {
    $match: { startTime: { $gte: ISODate("2016-03-10") } },
  },
  {
    $addFields: {
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  {
    $group: {
      _id: null,
      media: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$media" },
      _id: 0,
    },
  },
]);

// https://docs.mongodb.com/manual/reference/method/Date/
