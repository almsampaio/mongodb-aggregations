db.trips.aggregate([
  {
    $match: {
      birthYear: { $nin: [""] },
    },
  },
  {
    $addFields: {
      convertedBirthYear: {
        $toInt: "$birthYear",
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertedBirthYear" },
      menorAnoNascimento: { $min: "$convertedBirthYear" },
    },
  },
  {
    $limit: 1,
  },
  {
    $sort: {
      maiorAnoNascimento: -1,
      menorAnoNascimento: -1,
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
