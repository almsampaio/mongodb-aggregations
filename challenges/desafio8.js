db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
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
        { $project: // o que fara parte do campo alliances_routes
          {
            _id: 1,
            name: 1,
          },
        },
      ],
    as: "alliances_routes", // atribui nome ao novo campo formado
    // que é um array de objetos(chave/valor)
  } },
  { $unwind: "$alliances_routes" }, // desestrutura o array
  { $group:
    {
      _id: "$alliances_routes.name", // agrupa pela pripriedade nome
      totalRotas: { $sum: 1 }, // soma mais um a cada repetição
    },
  },
  { $sort: { totalRotas: -1 } }, // ordena do maior pro menor
  { $limit: 1 }, // limita a um resultado
]).pretty();
