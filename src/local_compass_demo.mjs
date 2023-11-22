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

        this._mongoClient = new mongo.MongoClient(this._config.mongo.uri);
    }

    /**
     * The run method.
     */
    run() {
        return new Promise(resolve => {
            start(this._config)
                .then(() => firstQuery(this._config, this._mongoClient))
                .then(() => secondQuery(this._config, this._mongoClient))
                .then(() => this._mongoClient.close())
                .then(() => console.log(`Disconnected from ${this._config.mongo.uri}/${this._config.mongo.database}`))
                .catch(console.dir)
                .finally(() => resolve());
        });
    }
}

async function start(config) {
    console.log(`Connected to ${config.mongo.uri}/${config.mongo.database}`);
    console.log(`From the ${config.collections.compassDemo} collection`);
}

async function firstQuery(config, mongoClient) {
    const database = mongoClient.db(config.mongo.database);
    const collection = database.collection(config.collections.compassDemo);
    const filter = { name: 'Andrea Le' };
    const item = await collection.findOne(filter);

    console.log(item);
}

async function secondQuery(config, mongoClient) {
    const database = mongoClient.db(config.mongo.database);
    const collection = database.collection(config.collections.compassDemo);
    const filter = {};
    const items = await collection.find(filter);

    for await (const item of items) {
        console.log(item);
    }
}

export { LocalCompassDemo };