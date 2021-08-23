use('aggregations');
db.trips.aggregate([
  {
    $match: {
      birthYear: 
      {
        $not: { $eq: "" },
        $exists: true,
      },
    },
  },
  {
    $group: {
      _id: "$birthYear",
      maior: { $max: "$_id"},
      menor: { $min: "$_id"},
    }
  },
  {
    $project: {
      _id: 0,
      maior: {$toInt: "$_id.maior"},
      menor: 1,
    }
  }
])
