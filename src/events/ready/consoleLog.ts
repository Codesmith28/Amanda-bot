import { Client } from "discord.js";

export default function hello(client: Client) {
  console.log(`${client.user!.username} is at your service`);
}
