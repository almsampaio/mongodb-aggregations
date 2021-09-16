db.trips.aggregate([
  {
    $match: { birthYear: { $exists: true, $ne: "" } },
  }, {
    $addFields: { birthYear: { $toInt: "$birthYear" } } },
  {
    $group:
      {
        maiorAnoNascimento: { $max: "$birthYear" },
        menorAnoNascimento: { $min: "$birthYear" },
        _id: null,
      },
  }, {
    $project: {
      maiorAnoNascimento: "$maiorAnoNascimento",
      menorAnoNascimento: "$menorAnoNascimento",
      _id: 0,
    },
  },
]);
