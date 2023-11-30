/**
 * (#)local_demo.mjs    1.0.0   11/09/2023
 *
 * Copyright (c) Jonathan M. Parker
 * All Rights Reserved.
 * 
 * @author    Jonathan Parker
 * @version   1.0.0
 * @since     1.0.0
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
        return new Promise(resolve => {
            start(this._config)
                .then(() => queryOne(this._config, this._mongoClient))
                .then(() => queryTwo(this._config, this._mongoClient))
                .then(() => this._mongoClient.close())
                .then(() => console.log(`Disconnected from ${this._config.mongo.uri}/${this._config.mongo.database}`))
                .catch(console.dir)
                .finally(() => resolve());
        });
    }
}

async function start(config) {
    console.log(`Connected to ${config.mongo.uri}/${config.mongo.database}`);
    console.log(`From the ${config.collections.demo} collection`);
}

async function queryOne(config, mongoClient) {
    const database = mongoClient.db(config.mongo.database);
    const collection = database.collection(config.collections.demo);
    const filter = {prodId: 100};
    const item = await collection.findOne(filter);

    console.log(item);
}

async function queryTwo(config, mongoClient) {
    const database = mongoClient.db(config.mongo.database);
    const collection = database.collection(config.collections.demo);
    const filter = {};
    const items = await collection.find(filter);

    for await (const item of items) {
        console.log(item);
    }
}

export { LocalDemo };