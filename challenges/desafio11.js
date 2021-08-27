// use("aggregations")

// Fazer os seguintes pontos:
// 1. Criar um novo campo ($addFields) para armazenar o dia da semana em formato de número
// 2. Agrupar ($group) pelo campo criado na etapa anterior
// 3. Contar quantos são os valores para cada dia
// 4. Fazer um $sort em total: -1
// 5. $limit de 1 elemento

db.trips.aggregate([
  { $addFields: {
    diaDaPartida: {
      $dayOfWeek: "$startTime",
    },
  } },
  { $group: {
    _id: "$diaDaPartida",
    totalViagens: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$totalViagens",
  } },
  { $sort: {
    total: -1,
  } },
  { $limit: 1 },
]);
