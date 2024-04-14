const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const clientPromise = client.connect();

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { resultId, resultValue } = body;

    const db = (await clientPromise).db(process.env.MONGODB_DB);
    const collection = await db.collection('results')
    
    await collection.insertOne({ resultId, resultValue });

    const totalResults = await collection.countDocuments();
    const similarResults = await collection.countDocuments({ resultValue });
    const percentage = (similarResults / totalResults) * 100;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Result saved successfully', percentage })
    };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process results' })
    };
  } finally {
    await client.close();
  }
};