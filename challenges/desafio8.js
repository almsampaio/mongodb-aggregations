/* Trocando de contexto, vamos utilizar nossa outra coleção que contém
dados de empresas aéreas, suas rotas, seus voos e parcerias.

Liste todas as parcerias da coleção air_alliances, que voam rotas com
um Boing 747 ou um Airbus A380 , para descobrir qual delas tem o maior
número de rotas com esses aviões.

No campo airplane, na coleção air_routes:

    * Boing 747 está abreviado para 747
    * Airbus A380 está abreviado para 380 */

db.air_routes.aggregate([
  { $match: {
    airplane: { $in: ["747", "380"] },
  },
  },
  {
    $project: {
      _id: 0,
      airline_name: "$airline.name",
      airplane: "$airplane",
    },
  },
  {
    $lookup:
      {
        from: "air_alliances",
        let: { airlineName: "$airline_name" },
        pipeline: [
          {
            $unwind: "$airlines",
          },
          {
            $match: {
              $expr: {
                $eq: ["$airlines", "$$airlineName"],
              },
            },
          },
        ],
        as: "dataAirline",
      },
  },
  {
    $unwind: "$dataAirline",
  },
  {
    $project: {
      _id: 0,
      airline_name: 1,
      partnerName: "$dataAirline.name",
    },
  },
  {
    $group: {
      _id: "$partnerName",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },

]);
