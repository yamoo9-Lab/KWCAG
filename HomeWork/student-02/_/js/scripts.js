(function(global){

	// BGM
	var BGM = new Audio(),
			ext = Modernizr.audio.mp3 ? 'mp3' : 'oga';

	// BGM 곡 설정
	BGM.src = '../_/media/We The Kings -Say You Like Me.' + ext;

	// BGM 자동 재생
	BGM.oncanplay = function() { this.play() };

	// BGM 정지 함수
	function stopBGM() {
		BGM.pause();
	}

	// ESC(27) 키 누르면 배경음악 정지

	// .mute-BGM 버튼 누르면 stopBGM 함수 실행
	global.stopBGM = stopBGM;

})(window);