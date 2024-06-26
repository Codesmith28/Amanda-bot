const { MongoClient } = require('mongodb');


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports =  async(error) => {

    const db = client.db('WMC5.0'); 

  try {
    const errorCollection = db.collection('errors');
    const result = await errorCollection.insertOne({
      error: error.message,
      stack: error.stack,
      timestamp: new Date(),
    });

    console.log('Error saved to database:', result.insertedId);
  } catch (err) {
    console.error('Error saving error to database:', err);
  }
}