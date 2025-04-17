import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const git = simpleGit();
const path = "./temp.txt"; // A dummy file to track commits

const run = async () => {
  const { coordinates, commitsPerDay } = await jsonfile.readFile("./data.json");

  for (const { x, y } of coordinates) {
    const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d");

    for (let i = 0; i < commitsPerDay; i++) {
      const commitDate = date.format();
      const content = `${commitDate} - Commit #${i + 1}`;
      await jsonfile.writeFile(path, { content });

      await git.add(path);
      await git.commit(content, { "--date": commitDate });
      console.log(`✅ Commit made on ${commitDate}`);
    }
  }

  await git.push();
  console.log("🎉 All commits pushed!");
};

run();
