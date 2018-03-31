const ghPages = require("gh-pages");

console.log("Deploying to Github pages!");
ghPages.publish(
  "dst",
  {
    remote: "origin"
  },
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log("Successfully deployed!");
  }
);
