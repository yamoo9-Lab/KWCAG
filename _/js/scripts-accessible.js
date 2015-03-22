//
(function(global){

	// BGM
	var BGM = new Audio(),
			ext = Modernizr.audio.mp3 ? 'mp3' : 'oga';

	// BGM 곡 설정
	BGM.src = '../_/media/We The Kings -Say You Like Me.' + ext;

	// console.log(BGM.src);

	// BGM 자동 재생
	BGM.oncanplay = function() { this.play() };

	// BGM 정지 함수
	function stopBGM() {
		BGM.pause();
	}

	// global.stopBGM = stopBGM;

	// ESC(27) 키 누르면 배경음악 정지
	// 사용자가 ESC 키를 누르면,
	// 키코드 값을 감지하여 ESC에 해당되는 키 값과 비교하여 일치하면
	// 함수 stopBGM()을 실행하라
	document.onkeydown = function(e) {
		if (e.keyCode === 27) {
			stopBGM();
		}
	};


	// .mute-BGM 버튼 누르면 stopBGM 함수 실행
	var muteBtn = document.querySelector('.mute-BGM');
	muteBtn.onclick = function(e){
		stopBGM();
		return false;
	};


})(window);