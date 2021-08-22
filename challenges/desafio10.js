db.trips.aggregate(
  [
    { $group: {
      _id: "$usertype",
      duracaoMedia:
        {
          $avg:
            {
              $divide:
                [
                  { $subtract: ["$stopTime", "$startTime"] },
                  3600000, // para saber em horas
                ],
            },
        },
    } },
    { $project:
      {
        _id: 0,
        tipo: "$_id",
        duracaoMedia: { $round: ["$duracaoMedia", 2] },
      },
    },
  ],
);
