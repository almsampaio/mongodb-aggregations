// Crie uma pipeline que retorna documentos com o novo campo title_split, ela deve
// seguir as seguintes condições:
// title_split deve conter uma lista de palavras presentes em title.
// A pipeline deve retornar apenas filmes com o título composto apenas de uma palavra.
// A pipeline deve ser ordenada por title em ordem alfabética.
// Por exemplo, "Cinderela" e "3-25" devem entrar nessa contagem, mas "Cast Away" não.

// Dica: utilize os operadores $split, $size e $sort para te auxiliar. Documentação do
// $split

// Sua query deve retornar 8068 documentos.

db.movies.aggregate([
  {
    $project: {
      _id: 0,
      // Fonte: https://docs.mongodb.com/manual/reference/operator/aggregation/split/
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
]);
