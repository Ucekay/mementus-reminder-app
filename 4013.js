"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tailwindCli = void 0;
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const metro_1 = require("react-native-css-interop/metro");
let version = 1;
async function tailwindCli(input, metroConfig, options) {
  let done;
  let reject = () => {};
  const deferred = new Promise((resolve, _reject) => {
    done = resolve;
    reject = _reject;
  });
  const env = {
    ...process.env,
    NATIVEWIND_NATIVE: options.platform,
    BROWSERSLIST: options.browserslist ?? undefined,
    BROWSERSLIST_ENV: options.browserslistEnv ?? undefined,
  };
  process.stdout.write(`tailwindcss(${options.platform}) rebuilding... `);
  const timeout = setTimeout(() => {
    if (options.dev && !process.env.CI) {
      console.warn(
        `tailwindcss(${options.platform}) is taking a long time to build, please read https://tailwindcss.com/docs/content-configuration#pattern-recommendations to speed up your build time`
      );
    }
    reject();
  }, 60000);
  (0, node_fs_1.mkdirSync)((0, node_path_1.dirname)(options.output), {
    recursive: true,
  });
  const spawnCommands = [
    ...options.cliCommand.split(" "),
    "--input",
    `"${input}"`,
    "--output",
    `"${options.output}"`,
  ];
  if (options.dev && options.hot) {
    spawnCommands.push("--watch");
  }
  try {
    const [command, ...args] = spawnCommands;
    const cli = (0, node_child_process_1.spawn)(command, args, {
      shell: true,
      env,
      windowsVerbatimArguments: true,
      windowsHide: true,
    });
    cli.on("error", (error) => {
      console.error("NativeWind failed while running TailwindCLI");
      console.error(error);
      clearTimeout(timeout);
      reject();
    });
    cli.stderr.on("data", (data) => {
      data = data.toString();
      if (data.includes("tailwindcss/lib/cli") || data.includes("npm ERR!")) {
        reject();
      }
      if (data.includes("warn - ")) {
        console.warn(data);
        return;
      }
      if (data.startsWith("Specified input file")) {
        console.log("");
        console.error(data);
        clearTimeout(timeout);
        return;
      }
      if (!data.includes("Done in")) return;
      clearTimeout(timeout);
      const rawOutput = (0, node_fs_1.readFileSync)(options.output, "utf-8");
      (0, metro_1.sendUpdate)(
        rawOutput,
        version,
        metroConfig.transformer.cssToReactNativeRuntime
      );
      version++;
      done(rawOutput);
    });
  } catch (error) {
    console.error("NativeWind had an unknown error while running TailwindCLI");
    console.error(error);
    clearTimeout(timeout);
    reject();
  }
  return deferred
    .then((data) => {
      console.log("done");
      return data;
    })
    .catch(() => {
      console.error(
        "\nError running TailwindCSS CLI, please run the CLI manually to see the error."
      );
      console.error("Command used: ", ...spawnCommands);
      process.exit(1);
    });
}
exports.tailwindCli = tailwindCli;
//# sourceMappingURL=tailwind-cli.js.map
