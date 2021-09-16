db.trips.aggregate(
  {
    $match: {
      birtYear: { $ne: "" },
    },
  },
  {
    $addFields: {
      yearInt: { $toInt: "$birtYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$yearInt" },
      menorAnoNascimento: { $min: "$yearInt" },
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
