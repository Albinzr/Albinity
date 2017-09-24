"use strict";

var _cluster = require("cluster");

var _cluster2 = _interopRequireDefault(_cluster);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_cluster2.default.isMaster) {
	for (var i = 0; i < _os2.default.cpus().length; i++) {
		_cluster2.default.fork();
	}
	_cluster2.default.on("exit", function (worker, code, signal) {
		console.log("worker " + worker.process.pid + " died");
	});
} else {
	require("./server");
}