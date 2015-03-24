if(!('trim' in String.prototype)) {
	String.prototype.trim= function() {
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
	};
};

/**
 * --------------------------------
 * 키보드 포커스 이동
 * --------------------------------
 */
(function(global, $){
	'use strict';

	/**
	 * 가입된 아이디리스트
	 * @type {Array}
	 */
	var idLists = [
		'yamoo9',
		'yamoog',
		'kwcag'
	];

	/**
	 * DOM 객체 참조
	 * jQuery 팩토리 함수 활용
	 */
	var $warn = $('#move-focus .warn'),
		$user_id = $('#user_id');

	/**
	 * idCheck 함수
	 * @param  {[string]} value [아이디 문자열]
	 */
	function idCheck(value) {
		value = value.trim();
		if ( value == '' ) { warnMsg('아이디를 입력해주세요.'); }
		else {
			value = _idcheck( value );
			if(value == true) { warnMsg('이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.'); }
			else if(value == '조건미달') { warnMsg('아이디는 최소 6자리 이상 입력해야 합니다.'); }
			else if(value == '문자아님') { warnMsg('아이디는 숫자를 포함한 문자로 구성되어야 합니다.'); }
			else {
				// alert('사용 가능한 아이디입니다.');
				$warn.text('사용 가능한 아이디입니다.');
			}
		}
		showWarn();
	}

	/**
	 * _idcheck 함수
	 * @param  {[string]} value [아이디 문자열]
	 */
	function _idcheck(value) {
		if (value.length < 6) {
			return '조건미달';
		}
		if ( !Number.isNaN( Number(value) ) ) {
			return '문자아님';
		}
		for (var i = idLists.length - 1; i >= 0; i--) {
			var id = idLists[i];
			if (id === value) { return true; }
		};
	}

	/**
	 * showWarn 함수
	 */
	function showWarn() {
		$warn.stop().animate({opacity: 1}, 300, hideWarn);
	}

	/**
	 * hideWarn 함수
	 */
	function hideWarn() {
		$warn.delay(3000).animate({opacity: 0}, 300);
	}

	/**
	 * warnMsg 함수
	 * @param  {[string]} msg [경고 메시지]
	 */
	function warnMsg(msg) {
		// alert(msg);
		$warn.text(msg);
		$user_id.select();
	}

	// 공개 함수로 설정
	global.idCheck = idCheck;

})(window, window.jQuery);



/**
 * --------------------------------
 * 레이어 팝업, 툴팁: 포커스 이동
 * --------------------------------
 */
(function(global, $){
	'use strict';

	var $layer_btn         = $('#layer-dim .layer_content_btn'),
		$layer_content_dim = $('.layer_dim, .layer_content');

	$layer_btn.on('click', function(e) {
		e.preventDefault();
		$layer_content_dim.addClass('show');
	});

	$layer_content_dim.eq(0).on('click', '.close, .dont-show', function(e) {
		$layer_content_dim.removeClass('show');
	});

})(window, window.jQuery);



/**
 * --------------------------------
 * DAUM MAP API
 * --------------------------------
 */
(function(global, $){
	'use strict';

	/**
	 * 맵 중심 위치 출력 정보
	 * http://mygeoposition.com/
	 * 37.4804899,126.9814069
	 * --------------------------------
	 */
	var map_position = {
		lat: 37.4805000,
		lng: 126.9813180
	};

	/**
	 * DAUM API: 맵 추가
	 * http://apis.map.daum.net/web/wizard/
	 * ------------------------------------
	 */
	var container = document.getElementById('d-map'),
		options = {
			center: new daum.maps.LatLng( map_position.lat, map_position.lng ),
			level: 1,
			mapTypeId : daum.maps.MapTypeId.ROADMAP // 지도종류
		};

	// 지도를 생성한다
	var map = new daum.maps.Map(container, options);


	/**
	 * DAUM API: 내장 컨트롤 추가
	 * --------------------------------
	 */
	// // 지도 타입 변경 컨트롤을 생성한다
	// var mapTypeControl = new daum.maps.MapTypeControl();
	// // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
	// map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
	// // 지도에 확대 축소 컨트롤을 생성한다
	// var zoomControl = new daum.maps.ZoomControl();
	// // 지도의 우측에 확대 축소 컨트롤을 추가한다
	// map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
	// // 지도에 마커를 생성하고 표시한다
	var marker = new daum.maps.Marker({
		position: new daum.maps.LatLng( map_position.lat, map_position.lng ), // 마커의 좌표
		map: map // 마커를 표시할 지도 객체
	});
	// // 마커 위에 표시할 인포윈도우를 생성한다
	var infowindow = new daum.maps.InfoWindow({
		content : '<div style="padding: 6px;">한국 인터넷 전문가 협회</div>' // 인포윈도우에 표시할 내용
	});
	// // 인포윈도우를 지도에 표시한다
	infowindow.open(map, marker);


	/**
	 * DAUM API: 커스텀 컨트롤 추가
	 * http://apis.map.daum.net/web/sample/addMapCustomControl/
	 * --------------------------------------------------------
	 */
	 // 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
	function setMapType(maptype) {
		var roadmapControl = document.getElementById('btnRoadmap');
		var skyviewControl = document.getElementById('btnSkyview');
		if (maptype === 'roadmap') {
			map.setMapTypeId(daum.maps.MapTypeId.ROADMAP);
			roadmapControl.className = 'selected-btn';
			skyviewControl.className = 'btn';
		} else {
			map.setMapTypeId(daum.maps.MapTypeId.HYBRID);
			skyviewControl.className = 'selected-btn';
			roadmapControl.className = 'btn';
		}
		return false;
	}

	// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
	function zoomIn() {
		map.setLevel(map.getLevel() - 1);
		return false;
	}

	// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
	function zoomOut() {
		map.setLevel(map.getLevel() + 1);
		return false;
	}


	/**
	 * DAUM API: 로드뷰 설정
	 * --------------------------------
	 */
	//로드뷰를 표시할 div
	var roadviewContainer = document.getElementById('d-roadview');
	// 로드뷰 위치
	var rvPosition = new daum.maps.LatLng( map_position.lat, map_position.lng );
	//로드뷰 객체를 생성한다
	var roadview = new daum.maps.Roadview(roadviewContainer, {
		pan: 148, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
		tilt: -1, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
		zoom: -10 // 로드뷰 줌 초기값
	});
	//좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체를 생성한다
	var roadviewClient = new daum.maps.RoadviewClient();
	// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다
	roadviewClient.getNearestPanoId(rvPosition, 50, function(panoId) {
		// panoId와 중심좌표를 통해 로드뷰를 실행한다
		roadview.setPanoId(panoId, rvPosition);
	});

	global.setMapType = setMapType;
	global.zoomIn     = zoomIn;
	global.zoomOut    = zoomOut;

})(window, window.jQuery);


/**
 * --------------------------------
 * 깜박임이 심한 콘텐츠
 * --------------------------------
 */
(function(global, $){
	'use strict';



})(window, window.jQuery);