db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $ne: "" } },
        { birthYear: { $ne: null } },
      ],
    },
  },
  {
    $addFields: {
      nascimento: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$nascimento" },
      menorAnoNascimento: { $min: "$nascimento" },
    },
  },
  { $project: { _id: 0 } },
]);
