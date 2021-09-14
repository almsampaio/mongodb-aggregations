db.trips.aggregate([
  {
    $addFields: {
      date: {
        $dateToString: { format: "%d/%m/%Y", date: "$startTime" },
      },
      time: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $match: {
      date: { $eq: "10/03/2016" },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: "$time" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
    },
  },
]);

/* Referências:
  Como arredondar valor para cima:
    https://app.betrybe.com/course/back-end/mongodb-aggregation-framework/aggregation-framework-parte-2/093afb76-1695-4f68-aecd-459880cabb3e/conteudos/cb1235bf-1fd9-4f8f-adea-1b53543c269e/expressao-ceil/416d270a-1f55-4adc-90bc-ddf9c17e73fb?use_case=side_bar
  Como converter data para formato dd/mm/aaaa: https://docs.mongodb.com/manual/reference/operator/aggregation/dateToString/
*/
