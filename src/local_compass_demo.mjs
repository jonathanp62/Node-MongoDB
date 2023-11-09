/**
 * (#)local_compass_demo.mjs    1.0.0   11/09/2023
 *
 * Copyright (c) Jonathan M. Parker
 * 324 Lantana Drive
 * Owings Mills, MD  21117 U.S.A
 * All Rights Reserved.
 */

import { Config } from "../config.mjs";

import mongo from 'mongodb';

/**
 * The demonstration class for the local.compass.demo database/collection.
 */
class LocalCompassDemo {
    /**
     * The configuration.
     *
     * @param   {Config}    Config
     */
    constructor(Config) {
        this._config = Config;
    }

    /**
     * The run method.
     */
    run() {
        this.firstQuery();
    }

    /**
     * Connect, query, and close.
     */
    firstQuery() {
        const mongoUri = this._config.mongo.uri;
        const mongoClient = new mongo.MongoClient(mongoUri);
        const mongoDB = this._config.mongo.database;
        const mongoCollection = this._config.collections.compassDemo;

        async function query() {
            try {
                const database = mongoClient.db(mongoDB);
                const collection = database.collection(mongoCollection);
                const filter = { name: 'Andrea Le' };
                const item = await collection.findOne(filter);

                console.log(`Connected to ${mongoUri}/${mongoDB}`);
                console.log(`From the ${mongoCollection} collection`);
                console.log(item);
            } finally {
                await mongoClient.close();
            }
        }

        query().catch(console.dir);
    }
}

export { LocalCompassDemo };