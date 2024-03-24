const socket = io();

socket.on('stream', function(stream) {
  const audio = new Audio();
  audio.srcObject = stream;
  audio.play();
});

socket.on('answer', function(answer) {
  pc.setRemoteDescription(new wrtc.RTCSessionDescription(answer));
});

navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
  const pc = new wrtc.RTCPeerConnection();

  pc.addStream(stream);

  const offer = pc.createOffer(function(offer) {
    pc.setLocalDescription(new wrtc.RTCSessionDescription(offer));
    socket.emit('offer', offer);
  });
});
