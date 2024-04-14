// netlify/functions/handleResults.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { resultId, resultValue } = body;

    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    await db.collection('results').insertOne({ resultId, resultValue });

    const totalResults = await db.collection('results').countDocuments();
    const similarResults = await db.collection('results').countDocuments({ resultValue });
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
