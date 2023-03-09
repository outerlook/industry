import { generateHelpers } from "../src/meta/generate-helpers";

async function main() {
  await generateHelpers();
}

main().then(() => {
    console.log("PRE-BUILD SUCCESS");
    process.exit(0)
});
