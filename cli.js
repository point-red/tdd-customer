#!/usr/bin/env node

import { createRequire } from "module";
import { ExpressCli } from "@point-hub/express-cli";
import { ConsoleKernel as CustomKernel } from "./build/console/index.js";

const require = createRequire(import.meta.url);
const { version } = require("./package.json");

// Initiate CLI
const cli = new ExpressCli("node cli", version);
// Register Custom Commands
const customKernel = new CustomKernel(cli);
await customKernel.register();
// Build CLI
cli.run(process.argv);
