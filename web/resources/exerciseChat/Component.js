/*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0*/
sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("sap.xs.chat.Component", {

	metadata: {
		manifest: "json"
	},

	init: function(){
		jQuery.sap.require("sap.m.MessageBox");
		jQuery.sap.require("sap.m.MessageToast");
		
		sap.ui.core.UIComponent.prototype.init.apply(
			this, arguments);
		this.getSessionInfo();
		
		// Chat Model
		var oModel = this.getModel("chatModel");
       	var names = ["Student1","Student2","Student3","Student4","Student5","Student6"];
      	oModel.setData({
      		user: names[Math.floor(names.length * Math.random())],
        	chat: "",
        	message: ""
      	});
	},
	
	destroy: function() {
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
	},

	getSessionInfo: function() {
			var aUrl = "/xsjs/exercisesMaster.xsjs?cmd=getSessionInfo";
			this.onLoadSession(
				JSON.parse(jQuery.ajax({
					url: aUrl,
					method: "GET",
					dataType: "json",
					async: false
				}).responseText));
	},

	onLoadSession: function(myJSON) {
			for (var i = 0; i < myJSON.session.length; i++) {
				var config = this.getModel("config");
				config.setProperty("/UserName", myJSON.session[i].UserName);
			}
		}
	});

});