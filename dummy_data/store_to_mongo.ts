import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config()

async function insertDocuments(docs: any[]): Promise<void> {
    const dbName="tweeter";
  const url = process.env.DB_STRING as string;

  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db: Db = client.db(dbName);

    // Get the collection (replace 'yourCollectionName' with your actual collection name)
    const collection = db.collection('tweets');

    // Insert the documents into the collection
    const result = await collection.insertMany(docs);

    console.log(`${result.insertedCount} documents inserted.`);
  } finally {
    // Close the connection when done
    await client.close();
  }
}

// Example usage
const documentsToInsert = [{
    "admin_user":"shiva",
    "username":"jerry",
    "profile":"https://www.google.com/imgres?imgurl=https%3A%2F%2Fs3images.zee5.com%2Fwp-content%2Fuploads%2Fsites%2F7%2F2021%2F12%2FUntitled-design-2021-12-19T203847.073.jpg&tbnid=ffdR5jFCJdk5iM&vet=12ahUKEwjQmKPN0pSDAxXba2wGHcJKB50QMygSegUIARCQAQ..i&imgrefurl=https%3A%2F%2Fwww.zee5.com%2Fzee5news%2Furvashi-rautela-surpasses-these-popular-hollywood-celebrities-on-instagram-crosses-44-million-mark%2F&docid=TJRTOSWva3RQdM&w=1920&h=1080&q=hollywood%20celebrities&client=ubuntu-chr&ved=2ahUKEwjQmKPN0pSDAxXba2wGHcJKB50QMygSegUIARCQAQ",
    "tweet":"I would like to say a big thank you to everyone who has supported me and my small business this year. I hope you have a wonderful Christmas and a happy and healthy new year.",
    "label":"non-violent",
    "tweet_link":"https://twitter.com/poppyscupcakes/status/1735911195813478895",
    "monitor_type":"user"
},
{
    "admin_user":"shiva",
    "username":"jack",
    "profile":"https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.zeebiz.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fzeebiz_850x478%2Fpublic%2F2020%2F07%2F06%2F123535-screenshot-2020-07-06-at-160916.png%3Fitok%3DSZHs8pZm&tbnid=vbgmr8lbjv_dsM&vet=12ahUKEwjQmKPN0pSDAxXba2wGHcJKB50QMyg-egUIARDyAQ..i&imgrefurl=https%3A%2F%2Fwww.zeebiz.com%2Fworld%2Fnews-not-ronaldo-or-kylie-jenner-this-hollywood-actor-is-the-most-paid-celebrity-on-instagram-130600&docid=rWOTE6Ggf-HhMM&w=850&h=477&q=hollywood%20celebrities&client=ubuntu-chr&ved=2ahUKEwjQmKPN0pSDAxXba2wGHcJKB50QMyg-egUIARDyAQ",
    "tweet":"A circulating clip of riots breaking out within an Israeli military base depicts Israeli soldiers participating in a vandalizing frenzy. ",
    "label":"violent",
    "tweet_link":"https://twitter.com/search?q=riot&src=typed_query",
    "monitor_type":"keyword"
}

]

insertDocuments(documentsToInsert).catch(console.error);
