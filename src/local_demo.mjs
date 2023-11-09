/**
 * (#)local_demo.mjs    1.0.0   11/09/2023
 *
 * Copyright (c) Jonathan M. Parker
 * 324 Lantana Drive
 * Owings Mills, MD  21117 U.S.A
 * All Rights Reserved.
 */

import mongo from 'mongodb';

/**
 * The demonstration class for the local.demo database/collection.
 */
class LocalDemo {
    /**
     * The run method.
     */
    run() {
        console.log('Hello from local.demo');

        const mongoDB = 'mongodb://localhost:27017';
        const mongoClient = new mongo.MongoClient(mongoDB);

        async function query() {
            try {
                const database = mongoClient.db('local');
                const collection = database.collection('demo');
                const filter = { prodId: 100 };
                const items = await collection.findOne(filter);

                console.log(items);
            } finally {
                await mongoClient.close();
            }
        }

        query().catch(console.dir);
    }
}

export { LocalDemo };