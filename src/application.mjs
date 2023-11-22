/**
 * (#)application.mjs   1.0.0   11/09/2023
 *
 * Copyright (c) Jonathan M. Parker
 * 324 Lantana Drive
 * Owings Mills, MD  21117 U.S.A
 * All Rights Reserved.
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