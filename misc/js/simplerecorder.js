function CreateSimpleMediaRecorder(aFunc, aType, aRecordType) {
	if (1 === aRecordType) aRecordType = "getDisplayMedia";
	else aRecordType = "getUserMedia";
	navigator.mediaDevices[aRecordType]({ audio: !aType||2===aType, video:1===aType||2===aType }).then(function (aMediaStream) {
		var vRecorder = new MediaRecorder(aMediaStream),
			vBuffer = [], vHandle = {
				Buffer: [], Recorder: vRecorder, Stream: aMediaStream,
				Start: function (aTimeslice) { vRecorder.start(aTimeslice); }, start: function (aTimeslice) { vRecorder.start(aTimeslice); },
				Stop: function (aStopStreamsType) {
					vRecorder.stop();
					if (0 === aStopStreamsType || 2 === aStopStreamsType)
						this.StopAudioStreams();
					if (1 === aStopStreamsType || 2 === aStopStreamsType)
						this.StopVideoStreams();
				}, stop: function () { vRecorder.stop(); },
				stopAudioStreams: function() {return this.StopAudioStreams();},
				stopVideoStreams: function() {return this.StopVideoStreams();},
				getBlob: function() {return this.GetBlob();},
				getBlobURL: function() {return this.GetBlobURL();},
				GetBlob: function (aResetBuffer) {
					var vBlob = new Blob(this.Buffer);
					if (aResetBuffer) this.Buffer=[];
					return vBlob;
				}, GetBlobURL: function (aResetBuffer) {
					var vBURL = URL.createObjectURL(new Blob(this.Buffer));
					if (aResetBuffer) this.Buffer=[];
					return vBURL;
				}, StopAudioStreams: function () {
					this.Stream.getAudioTracks().forEach(function(aMS){aMS.stop()});
				}, StopVideoStreams: function () {
					this.Stream.getVideoTracks().forEach(function(aMS){aMS.stop()});
				}, DownloadBlob: function (aURL, aFileName) {
					var vAnc = document.createElement("a");
					vAnc.href = aURL;
					vAnc.download = aFileName;
					document.body.appendChild(vAnc);
					vAnc.click();
					return vAnc;
				}
			};
		vRecorder.ondataavailable = function (aE) { vHandle.Buffer.push(aE.data); };
		aFunc(vHandle);
	});
}
// scoping, example code (won't execute)
if (0) (function () {
	var vMR;
	buttontest.onclick = function () {
		buttontest.PlayState = !buttontest.PlayState;
		if (buttontest.PlayState) {
			buttontest.innerText = "stop";
			CreateSimpleMediaRecorder(function (aHandle) {
				console.log(aHandle);
				vMR = aHandle;
				aHandle.Recorder.onstop = function () {
					var vBURL = aHandle.GetBlobURL();
					audiotest.src = vBURL;
					console.log(vBURL);
				};
				aHandle.Start(1000);
			});
		} else {
			buttontest.innerText = "start";
			vMR.Stop(0);
		}
	};
})();
