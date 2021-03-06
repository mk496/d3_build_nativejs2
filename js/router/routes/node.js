/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";
var express = require("express");
var async = require("async");

module.exports = function() {
	var app = express.Router();

	//Hello Router
	app.get("/", (req, res) => {
		let client = req.db;
		let hdbext = require("@sap/hdbext");
		//(client, Schema, Procedure, callback)
		hdbext.loadProcedure(client, null, "get_po_header_data", (err, sp) => {
			if (err) {
				res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
				return;
			}
			//(Input Parameters, callback(errors, Output Scalar Parameters, [Output Table Parameters])
			sp({}, (err, parameters, results) => {
				if (err) {
					res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
				}
				let result = JSON.stringify({
					EX_TOP_3_EMP_PO_COMBINED_CNT: results
				});
				res.type("application/json").status(200).send(result);
			});
		});
	});

	return app;
};