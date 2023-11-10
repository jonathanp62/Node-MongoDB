/**
 * (#)local_demo.mjs    1.0.0   11/09/2023
 *
 * Copyright (c) Jonathan M. Parker
 * 324 Lantana Drive
 * Owings Mills, MD  21117 U.S.A
 * All Rights Reserved.
 */

import { Config } from "../config.mjs";

import mongo from 'mongodb';

/**
 * The demonstration class for the local.demo database/collection.
 */
class LocalDemo {
    /**
     * The configuration.
     *
     * @param   {Config}    Config
     */
    constructor(Config) {
        this._config = Config;

        this._mongoClient = new mongo.MongoClient(this._config.mongo.uri);
    }

    /**
     * The run method.
     */
    run() {
        this.firstQuery();
        this.secondQuery();
    }

    /**
     * Connect, query, and close.
     */
    firstQuery() {
        async function query(config, mongoClient) {
            try {
                const database = mongoClient.db(config.mongo.database);
                const collection = database.collection(config.collections.demo);
                const filter = {prodId: 100};
                const item = await collection.findOne(filter);

                console.log(`1st: Connected to ${config.mongo.uri}/${config.mongo.database}`);
                console.log(`From the ${config.collections.demo} collection`);
                console.log(item);
            } finally {
                await mongoClient.close();
                console.log(`1st: Disconnected from ${config.mongo.uri}/${config.mongo.database}`);
            }
        }

        query(this._config, this._mongoClient).catch(console.dir);
    }

    secondQuery() {
        async function query(config, mongoClient) {
            try {
                console.log(`2nd: Connected to ${config.mongo.uri}/${config.mongo.database}`);

                const database = mongoClient.db(config.mongo.database);
                const collection = database.collection(config.collections.demo);
                const filter = {};
                const items = await collection.find(filter);

                for await (const item of items) {
                    console.log(item);
                }
            } finally {
                mongoClient.close().then(() => console.log(`2nd: Disconnected from ${config.mongo.uri}/${config.mongo.database}`));
            }
        }

        query(this._config, this._mongoClient).catch(console.dir);
    }
}

export { LocalDemo };