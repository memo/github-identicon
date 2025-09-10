import identicon from "./index.js";
import { writeFileSync } from "node:fs";

let id = 53388337;

const icon = identicon(id, 500);
writeFileSync(`${id}.png`, icon);