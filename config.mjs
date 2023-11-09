/**
 * (#)config.mjs    1.0.0   11/09/2023
 *
 * Copyright (c) Jonathan M. Parker
 * 324 Lantana Drive
 * Owings Mills, MD  21117 U.S.A
 * All Rights Reserved.
 */

/**
 * The configuration.
 */
const Config = {
    mongo: {
        url: 'mongodb://localhost:27017',
        database: 'local'
    },
    collections: {
        demo: 'demo',
        compassDemo: 'compass.demo'
    }
};

export { Config }