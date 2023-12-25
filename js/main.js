import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";
// 38) 여기서 import 가 들어가게 되면 index.html 파일에서
// main.js 파일을 가져오는 script 태그에서 type="module"
// 을 넣어야 한다!!
// 특정 JS 에서 import 를 사용한다면 module 이 된다!!
// 그래서 html 에서 불러올땐 type="module" 을 넣어줘야 한다!!

// 장바구니!
// 장바구니 관련 요소 찾기.
// 07) 장바구니 팝업 이벤트 버블링 처리 관련!!
const basketStarterEl = document.querySelector("header .basket-starter");
// 07) li 태그 요소
const basketEl = basketStarterEl.querySelector(".basket");
// 07) 팝업 요소

basketStarterEl.addEventListener("click", (event) => {
  event.stopPropagation();
  // 이벤트 버블링 정지! - 버튼을 클릭했을 때 드롭다운 메뉴가 나타나야 함.
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", (event) => {
  event.stopPropagation();
  // 이벤트 버블링 정지! - 드롭다운 메뉴 영역을 클릭했을 때 메뉴가 사라지지 않아야 함.
});
// 화면 전체를 클릭했을 때 메뉴가 사라짐. 07)
window.addEventListener("click", () => {
  hideBasket();
});

// 특정 로직을 직관적인 함수 이름으로 묶음.
function showBasket() {
  basketEl.classList.add("show");
  // 07) 클래스 추가처리 ->  요소.classList.add
}
function hideBasket() {
  basketEl.classList.remove("show");
  // 07) 클래스 제거처리 ->  요소.classList.remove
}

// 헤더 검색!
// 헤더 검색 관련 요소 찾기.
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
// 11) 위와 같이 headerEl 의 ul.menu > li 조건을 찾는다
//    바로 사용하기 위해 얕은 복사 처리를 해준다
const searchWrapEl = headerEl.querySelector(".search-wrap");
// 10) 위에서 찾은 헤더 요소에서 querySelector를 사용하여 찾을 수 있다
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
// 10) 위에서 찾은 searchWrapEl 검색바 껍대기 에서 요소 찾기
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];
// 11) 위와 같이 searchDelayEls의 autocomplete 리스트 요소는 
//     얕은 복사로 가져온다
const duration = 0.4; 
// 초(seconds) 단위, 시간을 변수에 저장해서 사용하면 쉽게 관리 용이

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", (event) => {
  event.stopPropagation();
  // 데스크탑 레이아웃에서 클릭 이벤트가 버블링되어,
  // 모바일 레이아웃에서 searchTextFieldEl가 클릭된 상태로 변하는 것을 방지
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);
// 10) 닫기 버튼 / 팝업 크림자 클릭 시 검색바(팝업) 닫기 처리

// 10) 검색바(팝업)가 보이는 처리
function showSearch() {
  headerEl.classList.add("searching");
  // 10) 헤더에 searching 클래스 추가
  stopScroll();
  // 11) reverse 메서드로 순서를 뒤집고 
  // el.style.transitionDelay 요소의 스타일 
  // transitionDelay 딜레이 시간을 index 에따라 추가처리를 해준다
  headerMenuEls.reverse().forEach((el, index) => {
    // 11) transition-delay 과 같은 것이다
    el.style.transitionDelay = `${(index * duration) / headerMenuEls.length}s`; 
    // 순서 * 지연 시간 / 애니메이션할 요소 개수
  });
  // .reverse() 사용하지 않고 원래 순서대로 반복 처리.
  searchDelayEls.forEach((el, index) => {
    // 11) 왼쪽 부터 나타나기 때문에 reverse() 를 사용할 필요가 없다
    el.style.transitionDelay = `${(index * duration) / searchDelayEls.length}s`;
    // 11) search
  });
  // 12) main.css 에서
  // header .search .autocompletes li {
  // transition: 0.6s;  여기서 0.6초로 설정했으므로
  // 아래와 같이 처리!!
  // 검색 인풋 요소가 나타난 후 동작!
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}
// 10) 검색바(팝업)가 사라지는 처리
function hideSearch() {
  headerEl.classList.remove("searching");
  playScroll();
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${(index * duration) / headerMenuEls.length}s`;
  });
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${(index * duration) / searchDelayEls.length}s`;
  });
  searchDelayEls.reverse(); // 나타날 때 원래의 순서대로 처리해야 하기 때문에 다시 뒤집어서 순서 돌려놓기!
  searchInputEl.value = ""; // 입력값 초기화 12)
}
// 10) html 태그에 fixed 클래스를 추가/제거 하여 스크롤 되기/방지 처리
function playScroll() {
  // documentElement is <html>
  document.documentElement.classList.remove("fixed");
  // 10) document.documentElement 가 html 태그이다
}
function stopScroll() {
  document.documentElement.classList.add("fixed");
}

// 헤더 메뉴 토글! [모바일]
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", () => {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

// 헤더 검색! [모바일]
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");
searchTextFieldEl.addEventListener("click", () => {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});
searchCancelEl.addEventListener("click", () => {
  headerEl.classList.remove("searching--mobile");
});

// 화면 크기가 달라졌을 때 검색 모드가 종료되도록 처리.
window.addEventListener("resize", (event) => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

// 네비게이션 메뉴 토글! [모바일]
const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");
navMenuToggleEl.addEventListener("click", () => {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
navEl.addEventListener("click", (event) => {
  event.stopPropagation();
});
navMenuShadowEl.addEventListener("click", hideNavMenu);
window.addEventListener("click", hideNavMenu);
function showNavMenu() {
  navEl.classList.add("menuing");
}
function hideNavMenu() {
  navEl.classList.remove("menuing");
}

// 25) 화면에 요소가 보일때 처리하는 로직!!
// 요소의 가시성 관찰 로직!
const io = new IntersectionObserver((entries) => {
  // entries는 `io.observe(el)`로 등록된 모든 관찰 대상 배열.
  entries.forEach((entry) => {
    // 사라질 때.
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});
// 관찰할 요소들 검색
const infoEls = document.querySelectorAll(".info");
// 관찰 시작!
infoEls.forEach((el) => io.observe(el));

// 28) 비디오 불러올때 사용
// 비디오 재생!
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

// Google 자동 재생 정책 확인! - https://developer.chrome.com/blog/autoplay/#audiovideo-elements
// video.play()
//   .then(played)
//   .catch(paused)

playBtn.addEventListener("click", () => {
  video.play();
  // 28) 여기서 바로 실행 메서드 사용
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", () => {
  video.pause();
  // 28) 여기선 멈추는 메서드 실행
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// '당신에게 맞는 iPad는?' 랜더링!
// 38) 해당 영역 찾기 처리
const itemsEl = document.querySelector("section.compare .items");
// 38) ipad.js 에서 가져온 정보를 바탕으로 해당 요소 만들기 처리
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  // 38) div 요소 생성!
  itemEl.classList.add("item");
  // 38) div에 item 클래스를 추가해준다

  // 38) 색상이 여러개이므로 아래와 같이 추가해준다
  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += /* html */`<li style="background-color: ${color};"></li>`;
  });

  // VS Code 확장 프로그램 - Comment tagged templates
  // 37) Comment tagged templates 는 백틱 사이의 내용이
  // 원래는 문자열로 나오는데.. /* html */ 뒤의 백틱이
  // HTML 처럼 코드 하이라이팅 처리를 해준다!!
  // 37) innerHTML 은 html 내용을 삽입해준다
  // 37) textContent 는 그냥 내용을 삽입해준다
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  // 38) ipad.price.toLocaleString("en-US") 는 세자릿수 콤마를 만들어준다

  itemsEl.append(itemEl);
  // 38) 만들어진 요소를 해당요소(section.compare .items)에
  // 추가로 넣어준다!!
});

// 푸터 내비게이션 맵 랜더링!
// 42)
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");
  //42) 메모리상 가상요소 생성 및 map 클래스 추가처리

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`;
  });
  //42) 여기서 li 태그 만들기 처리

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;
  //42) 여기서 형태 만들기처리

  navigationsEl.append(mapEl);
  // 42) 위에서 만든 부분을 해당 요소에 추가해주기
});

// 올해 연도를 적용!
// 43) 날짜 처리
const thisYearEl = document.querySelector(".this-year");
thisYearEl.textContent = new Date().getFullYear();

// 푸터 내비게이션 맵 아코디언
const mapEls = [...document.querySelectorAll("footer .navigations .map")];
mapEls.forEach((el) => {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", () => {
    el.classList.toggle("active");
  });
});
