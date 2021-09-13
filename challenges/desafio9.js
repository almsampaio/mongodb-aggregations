db.trips.aggregate(
  {
    $match: {
      birthYear: { $ne: "" },
    },
  },
  {
    $addFields: {
      yearToInt: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$yearToInt" },
      menorAnoNascimento: { $min: "$yearToInt" },
    },
  },
  {
    $project: {
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
      _id: 0,
    },
  },
);
