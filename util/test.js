const Fuse = require("fuse.js");

let s = ["like erik estrada dean cain like all", "dom can't dance"];

const options = {
	includeScore: true,
};

const fuse = new Fuse(s, options);

const result = fuse.search("estrada");

console.log(result);
