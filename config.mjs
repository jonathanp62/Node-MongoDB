/**
 * (#)config.mjs    1.0.0   11/09/2023
 *
 * Copyright (c) Jonathan M. Parker
 * All Rights Reserved.
 * 
 * @author    Jonathan Parker
 * @version   1.0.0
 * @since     1.0.0
 */

/**
 * The configuration.
 */
const Config = {
    mongo: {
        uri: 'mongodb://localhost:27017',
        database: 'local'
    },
    collections: {
        demo: 'demo',
        compassDemo: 'compass.demo'
    }
};

export { Config }