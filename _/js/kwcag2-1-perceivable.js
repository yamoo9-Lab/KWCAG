// Scope Function
(function(global){

	// BGM
	var BGM = new Audio(),
		ext = Modernizr.audio.mp3 ? 'mp3' : 'oga';

	// BGM 곡 설정
	BGM.src = '../_/media/We The Kings -Say You Like Me.' + ext;

	console.log(BGM.src);

	// BGM 자동 재생
	BGM.oncanplay = function() { this.play() };

	// BGM 정지 함수
	function stopBGM() {
		BGM.pause();
	}

	// global.stopBGM = stopBGM;

	// 문서에서 .mute-BGM 요소를 찾습니다.
	var muteBGMBtn = document.querySelector('.mute-BGM');

	// muteBGMBtn 변수에 참조된 요소를 사용자가 클릭하면
	muteBGMBtn.onclick = function() {
		// 재생되던 음악을 일시정지합니다.
		stopBGM();
		// a 포커스 요소의 브라우저 기본 동작을 차단
		return false;
	}


	// ESC(27) 키 누르면 배경음악 정지
	// 사용자가 ESC 키를 누르면,
	// 키코드 값을 감지하여 ESC에 해당되는 키 값과 비교하여 일치하면
	// 함수 stopBGM()을 실행하라
	document.onkeydown = function(e) {
		var key = e.keyCode || e.which;
		if (key === 27) {
			muteBGMBtn.onclick();
		}
	}

})(window);