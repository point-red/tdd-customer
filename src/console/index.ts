import { URL } from "url";
import { ExpressCli } from "@point-hub/express-cli";
import DbInit from "./commands/db-init/index.command.js";

export class ConsoleKernel {
  public path = new URL(".", import.meta.url).pathname;
  private command: ExpressCli;

  constructor(command: ExpressCli) {
    this.command = command;
  }

  /**
   * Register the commands for the application.
   *
   * @example
   * command.register(new ExampleCommand());
   */
  async register() {
    this.command.register(new DbInit());
  }
}
