db.trips.aggregate(
  [
    { $match: {
      $and: [
        { birthYear: { $exists: true } },
        { birthYear: { $ne: " " } },
      ],
    } },
    { $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    } },
    { $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    } },

  ],
);
