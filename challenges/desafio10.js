// Encontre a duração média de viagens por tipo de usuário.
// Exiba o valor em horas com apenas duas casas decimais
// Exiba a média de viagens ordenada de forma crescente.
// Para arredondar a média use o $round.

const oneHour = 3600000;

db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    contador: {
      $avg: {
        $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $sort: {
    contador: 1,
  } },
  { $project: {
    tipo: "$_id",
    duracaoMedia: {
      $round: [
        { $divide: ["$contador", oneHour] }, 2],
    },
    _id: 0,
  } },
]);
