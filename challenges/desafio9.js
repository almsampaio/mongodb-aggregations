db.trips.aggregate([
  {
    $match: {
      birthYear: { $ne: "" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: {
          $convert: {
            input: "$birthYear",
            to: "int",
          },
        },
      },
      menorAnoNascimento: {
        $min: {
          $convert: {
            input: "$birthYear",
            to: "int",
          },
        },
      },
    },
  },
  { $project: { _id: false } },
]);
