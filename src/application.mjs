/**
 * (#)application.mjs   1.0.0   11/09/2023
 *
 * Copyright (c) Jonathan M. Parker
 * All Rights Reserved.
 * 
 * @author    Jonathan Parker
 * @version   1.0.0
 * @since     1.0.0
 */

import { Config } from "../config.mjs";
import { LocalCompassDemo } from './local_compass_demo.mjs';
import { LocalDemo } from './local_demo.mjs';

/**
 * The application class.
 */
class Application {
    /**
     * The run method.
     */
    run() {
        console.log("Start run...");

        new LocalDemo(Config).run()
            .then(() => new LocalCompassDemo(Config).run())
                .then(() => console.log("End run."));
    }
}

export { Application };