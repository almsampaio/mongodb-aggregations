db.air_routes.aggregate([
  { $match: { airplane: { $in: [747, 380] } } },
  { $lookup: {
    from: "air_alliances", // coleção externa
    let: { airlineNames: "$airline.name" }, // variavel armazena dado local 
    pipeline:
      [
        { $unwind: "$airlines" }, // desestrutura nomes das empresas
        { $match:
          { // comparação
            $expr:
              { // entre dois campos
                $eq: ["$airlines", "$$airlineNames"],
              }, // ^compara o nome descompactado com o nome local
          },
        },
        { $project:
          {
            _id: 1,
            name: 1,
          },
        },
      ],
    as: "alliances_routes",
  } },
  { $unwind: "$alliances_routes" },
  { $group:
    {
      _id: "$alliances_routes.name",
      totalRotas: { $sum: 1 },
    },
  },
  { sort: { totalRotas: -1 } },
  { limit: 1 },
]).pretty();
