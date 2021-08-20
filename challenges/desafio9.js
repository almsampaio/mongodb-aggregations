db.trips.aggregate(
  [
    {
      $match: {
        $and: [
          { birthYear: { $ne: "" } },
          { birthYear: { $exists: true } },
        ],
      },
    },
    {
      $group: {
        _id: null,
        maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
        menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ],
);
