db.trips.aggregate([
  {
    $match: { birthYear: { $nin: [""] } },
  },
  {
    $addFields: {
      data: { $toInt: "$birthYear" },
    },
  },
  {
    $group: { 
      _id: null,
      maiorAnoNascimento: { $max: "$data" },
      menorAnoNascimento: { $min: "$data" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
