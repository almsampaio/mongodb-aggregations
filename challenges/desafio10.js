db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          // $subtract: [
          //   { $hour: "$stopTime" },
          //   { $hour: "$startTime" },
          // ],
          // Referência desse trecho de código:
          $divide: [{
            $subtract: ["$stopTime", "$startTime"],
          }, 3600000],
          // https://cursos.alura.com.br/forum/topico-uso-do-substract-138759
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
