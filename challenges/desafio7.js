/* Desafio 7
Vamos nos aprofundar um pouco mais em nossa coleção de filmes.

Conte quantos filmes cada um dos atores e atrizes do elenco (cast no banco) já participou e
obtenha uma média do campo imdb.rating para cada um desses atores e atrizes.
Traga o nome do ator ou atriz;
Número de filmes em que participou
Média do imdb desses filmes arredondada para uma casa decimal usando o operador $round.
Considere somente os membros do elenco de filmes com o idioma inglês (English).
Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.
Sua query deve retornar 47055 documentos. Cada documento no resultado deve ter exatamente o
seguinte formato (incluindo a ordem dos campos): */

db.movies.aggregate([{ $unwind: "$cast" }, { $match: { languages: "English" } }, { $group: { _id: "$cast", numeroFilmes: { $sum: 1 }, mediaIMDB: { $avg: "$imdb.rating" } } }, { $project: { numeroFilmes: 1, mediaIMDB: { $round: ["$mediaIMDB", 1] } } }, { $sort: { numeroFilmes: -1, _id: -1 } }]);
