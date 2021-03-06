# Changelog Generator

## Instructions
NOTE: This is to be used with GitBash or any command line for GitHub

Make a directory called changelog-gen and directly download the files in there

Then open GitBash or any command line terminal of your choice and change directory
```cd changelog-gen```

If you make any changes, in the terminal you can write a message and push the changes
For example, I added a test.txt file
```git commit -m "chore: added a test text file"```

```git push origin master```

## Current Functionality
* Basic commits with messages attached are functional with keywords chore and feature
* Tags are kept track of to ensure only the latest changes are added to the changelog instead of writing the entire output of ```git long``` with the appended changes.
* Titling is formatted and dated as well.
* index.js cannot compile, there are some bugs I need to fix

## Future Implementation
* Fixing the versioning bug
* Make the script able to dynamically publish changes using a login authenticator (currently my GitHub repository is hard coded)

## Known Issues
* Versioning incorrect in the CHANGELOG.md due to experimenting with the package.json file, due to this latest commits may not appear

## Implementation Explanation
I picked JavaScript as I was most comfortable using this language and remembered my professor said JavaScript had capabilities outside of basic web development (which is all we learned in class). What made me feel comfortable using this language is that I was formally taught this language in school, versus using PHP or Python which I am still learning.

## Challenges Faced
* Learning how to use GitBash and integrate it using JavaScript was a challenge as I wasn't familiar with using a command line for GitHub (I've only used the Dekstop downloaded GUI).
* Only being familiar with using BitBucket, so using GitHub was only a minor problem
* Refreshing on JavaScript and figuring how to use the JavaScript API for GitHub
* Difficulty dividing time as I work full time and the holidays approaching
* Figuring out how a change log is traditionally used (never used them in past projects)
