db.trips.aggregate([
  {
    $match: {
      $expr: {
        $ne: ["$birthYear", ""],
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: {
          $toInt: "$birthYear",
        },
      },
      menorAnoNascimento: {
        $min: {
          $toInt: "$birthYear",
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
