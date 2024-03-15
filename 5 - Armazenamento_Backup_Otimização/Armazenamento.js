//Double quotes quote object names (e.g. "field"). Single quotes are for strings 'string'
mb.runSQLQuery(`

       SELECT * FROM collection
       
`).sort({_id:-1})
  .limit(100)