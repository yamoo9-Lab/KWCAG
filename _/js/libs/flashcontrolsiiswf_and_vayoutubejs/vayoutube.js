(function(){

	//global object to carry API
	if (!window.visionaustralia){
		window.visionaustralia = {};
	}

	var ytPlayers = {};
	
	var hasFlash = true;
	try{
		if (swfobject.getFlashPlayerVersion().major < 9)
		hasFlash =  false;
	}catch(e){
		hasFlash = false;
	}
		

	//if no flash, add the HTML5 API
	if(!hasFlash){

		var IframeAPIReadyAlreadyCalled = false;
		
		function onYouTubeIframeAPIReady() {
			//notice when this has been called by the youtube api - thanks to websilk for code fix
			window.visionaustralia.IframeAPIReadyAlreadyCalled = true;
			for (var HTMLId in ytPlayers){
				ytPlayers[HTMLId].player = new YT.Player(HTMLId, {
					width: ytPlayers[HTMLId].params.width,
					height: ytPlayers[HTMLId].params.height,
					videoId: ytPlayers[HTMLId].videoidonly,
					playerVars: ytPlayers[HTMLId].pVars
				});
			}
		}
		
		window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
		
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	function youtube(ob){
		var o = {};
		for(var key in ob){
			o[key.toLowerCase()] = ob[key];
		}
		var expectedParams = {videoid:1,width:1,height:1,htmlid:1,swfpath:1};
		for(var key in expectedParams){
			if(!o[key]){throw new Error(key + " not given as parameter to visionaustralia.youtube function"); return;}
		}
		if(!o["duration"]){
			o.duration = 0;
		}

		//unique object for this player that we can hang things on
		ytPlayers[o.htmlid] = {};
		
		//llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
		if(o["language"]){
			ytPlayers[o.htmlid].language = o["language"];
		}  

		//flash
		if(hasFlash){
		
			if(!swfobject){throw new Error("swfobject not loaded"); return;}
			
			o.videoid = o.videoid.replace(/&/g,"ampersand"); 
			
			var flashvars = {HTMLid:o.htmlid, videoid:o.videoid, height:o.height, width:o.width,duration:o.duration};
			
			if(ob.debug){
				flashvars.debug="true";
			}
			
			if(o["language"]){
				flashvars.language="true";
			}
			
			var params = {allowFullScreen: "true", AllowScriptAccess:"always"};
			o.height = (parseInt(o.height) + 30);
			
			swfobject.embedSWF(o.swfpath, o.htmlid, o.width, o.height, "9", null, flashvars, params, null);
			return;
		}
		
		//HTML5
		var arr = o.videoid.split("&");
		var pVars = {};
		for(var i=1;i<arr.length;i++){
			var param=arr[i].split("=");
			if(param.length>1){
				pVars[param[0]] = param[1];
			}
		}

		//add all player params and vars to the unique object for that player - used by onYouTubeIframeAPIReady function 
		ytPlayers[o.htmlid].params = o;
		ytPlayers[o.htmlid].videoidonly = arr[0];
		ytPlayers[o.htmlid].pVars = pVars;
		
		//if youtub setup code has run, install the player here
		if(window.visionaustralia.IframeAPIReadyAlreadyCalled){
			ytPlayers[o.htmlid].player = new YT.Player(o.htmlid, {
				width: ytPlayers[o.htmlid].params.width,
				height: ytPlayers[o.htmlid].params.height,
				videoId: ytPlayers[o.htmlid].videoidonly,
				playerVars: ytPlayers[o.htmlid].pVars
			});
		}
	}

	 function loadvideo(HTMLid,videoId){
		var wrapper = document.getElementById(HTMLid);
		if(!wrapper){throw new Error("No HTML element with id '" + HTMLid + "'"); return;}
		if(wrapper.nodeName.toLowerCase() == "iframe"){
			ytPlayers[HTMLid].player.stopVideo();
			//does not work in IE if loaded after original video is playing - bug in google code: http://code.google.com/p/gdata-issues/issues/detail?id=3813
			//ALSO, playerVars can only be specified when a player is created, not when new video is loaded, so remove any vars
			var arr = videoId.split("&");
			ytPlayers[HTMLid].player.loadVideoById(arr[0]);
			return;
		}
		wrapper.loadOtherVersion(videoId);
	}
	
	//API
	window.visionaustralia.youtube = youtube;
	window.visionaustralia.loadVideo = loadvideo;
	//used to set languages from inside Flash
	window.visionaustralia.ytplayers = ytPlayers;

})();


