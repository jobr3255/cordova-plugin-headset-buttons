/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* 	This class lets to handle the events which have emitted by the headset buttons of the device
*/
var cordova= 	require('cordova'),
	exec= 		require('cordova/exec');

function handlers() {
	return headsetButtons.channels.buttonsListener.numHandlers;
}

var HeadsetButtons= function(){
	console.log("Volume buttons listener has been created");
	//buttonsListener:cordova.addWindowEventHandler('headsetbuttonslistener');
	this.subscribedCallback = null;
	this.channels={ buttonsListener:cordova.addWindowEventHandler('headsetbuttonslistener') };
	//for(var key in this.channels)
	//	this.channels[key].onHasSubscribersChange= HeadsetButtons.onHasSubscribersChange;
};

/**
* 	Callback used when the user presses the headset button of the device
*
*	@param {Object} info	keys: signal ['headset-up' or 'headset-down' or 'headset-hook']
*/
HeadsetButtons.prototype.headsetButtonsListener= function(info){
	var message = "headsetButtonsListener called";
	if(info){
		if(headsetButtons.subscribedCallback != null){
			headsetButtons.subscribedCallback(info);
		}
		message += " with: "+info.signal;
		//cordova.fireWindowEvent("headsetbuttonslistener", info);
	}
	//console.log(message);
};

HeadsetButtons.prototype.subscribedCallback = null;

/**
* 	Error callback for listener start
*/
HeadsetButtons.prototype.errorListener= function(e){
	console.log("Error initializing HeadsetButtons: " + e);
};

HeadsetButtons.prototype.subscribe= function(callback){
	console.log("Subscribing");
	headsetButtons.subscribedCallback = callback;
};

HeadsetButtons.prototype.listen= function(window, callback){
	console.log("Adding event listener for headset buttons");
	window.addEventListener("headsetbuttonslistener", callback, false);
	//window.addEventListener("headsetbuttonslistener", this.onHeadsetButtonsListener, false);
};

HeadsetButtons.prototype.start= function(){
	console.log("Adding event listener for headset buttons");
	exec(headsetButtons.headsetButtonsListener, headsetButtons.errorListener, "HeadsetButtons", "start", []);
};

HeadsetButtons.prototype.stop= function(){
	console.log("Removing event listener for headset buttons");
	exec(null, null, "HeadsetButtons", "stop", []);
};

var headsetButtons= new HeadsetButtons();
module.exports= headsetButtons;
