var MongoClient = require('mongodb').MongoClient;
var connectionUrl = 'mongodb://localhost:27017/tempdb';
var collectionName = 'tempcollection';
MongoClient.connect(connectionUrl, function(err, db) {
  if(err){
    console.log('error ' + err);
    return;
  }else{
    var collection = db.collection(collectionName);
    var stream = collection.find().stream();
    stream.on('end', function() {
      console.log('stream end');
      db.close();
    });
    stream.on('data', function(data) {
      console.log('data : ' + JSON.stringify(data));
    });
  }
});
