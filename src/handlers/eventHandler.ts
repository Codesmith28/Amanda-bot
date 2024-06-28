import path from "path";
import { Client } from "discord.js";
import getAllFiles from "../utils/getAllFiles";

type EventFunction = (client: Client, args: any) => void;

export default function eventHandler(client: Client): void {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder, false);

    eventFiles.sort((a, b) => a.localeCompare(b));

    const eventName = eventFolder.split(/[\/\\]/).pop();
    console.log(eventName);

    if (eventName) {
      client.on(eventName, async (args: any) => {
        for (const eventFile of eventFiles) {
          const eventFunction = require(eventFile) as {
            default: EventFunction;
          };
          eventFunction.default(client, args);
        }
      });
    }
  }
}
