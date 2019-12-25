// array of features to be used later
const features = [];

// array of chores to be used later
const chores = [];

//child process and file system
const child = require('child_process');
const fs = require('fs');

//this formats the tags by the SHA and the message for versioning
const latestTag = child.execSync('git describe --long').toString('utf-8').split('-')[0];
const output = child
  .execSync(`git log ${latestTag}..HEAD --format=%B%H----DELIMITER----`)
  .toString("utf-8");const commitsArray = output.split('----DELIMITER----\n').map(commit => {
	const [message, sha] = commit.split('\n');

	return { sha, message };
}).filter(commit => Boolean(commit.sha));

//variables for the changelog
const currentChangelog = fs.readFileSync("./CHANGELOG.md", "utf-8");
const currentVersion = Number(require("./package.json").version);
const newVersion = currentVersion + 1;

//formats it into DATE obj formats
let newChangelog = `# Version ${newVersion} (${
  new Date().toISOString().split("T")[0]
})\n\n`;

// pushing changes to my github repository and formatting it by the conventional changelog formats
commitsArray.forEach(commit => {
  if (commit.message.startsWith("feature: ")) {
    features.push(
      `* ${commit.message.replace("feature: ", "")} ([${commit.sha.substring(
        0,
        6
      )}](https://github.com/yancathe/changelog-gen/commit/${
        commit.sha
      }))\n`
    );
  }

   if (commit.message.startsWith("chore: ")) {
    chores.push(
      `* ${commit.message.replace("chore: ", "")} ([${commit.sha.substring(
        0,
        6
      )}](https://github.com/yancathe/changelog-gen/commit/${
        commit.sha
      }))\n`
    );
  }
});

// for titling of the CHANGELOG and making use of the array of features and chores done
if (features.length) {
  newChangelog += `## Features\n`;
  features.forEach(feature => {
    newChangelog += feature;
  });
  newChangelog += '\n';
}

if (chores.length) {
  newChangelog += `## Chores\n`;
  chores.forEach(chore => {
    newChangelog += chore;
  });
  newChangelog += '\n';
}

// update package.json file for versioning
	fs.writeFileSync("./package.json", JSON.stringify({ version: String(newVersion) }, null, 2));

// create a new commit
	child.execSync('git add .');
	child.execSync(`git commit -m "chore: Bump to version ${newVersion}"`);

// tag the commit to make sure only recent changes were published in the CHANGELOG
	child.execSync(`git tag -a -m "Tag for version ${newVersion}" version${newVersion}`);

// output into the CHANGELOG.md file
fs.writeFileSync("./CHANGELOG.md", `${newChangelog}${currentChangelog}`);
