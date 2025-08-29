import fs from "fs";
import { resolve } from "path";

const raw = fs.readFileSync(resolve(process.cwd(), "blog.config.js"), "utf-8");
const config = eval(
  `((module = { exports }) => { ${raw}; return module.exports })()`
);

const clientConfig = config;

export { config, clientConfig };
