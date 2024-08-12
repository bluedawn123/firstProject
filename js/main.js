

window.addEventListener("scroll", function(){
  var header = document.querySelector("nav");
  header.classList.toggle("sticky", window.scrollY > 0);
})
















// 변수 지정
let slideWrapper = document.querySelector('.slide-wrapper');
let slideContainer = slideWrapper.querySelector('.slide-container');
let slides = slideContainer.querySelectorAll('li');
let slideCount = slides.length;
let currentIdx = 0;
let nextBtn = slideWrapper.querySelector('#next');
let prevBtn = slideWrapper.querySelector('#prev');
let pager = slideWrapper.querySelector('.pager');
let pagerHTML = '';
let timer;

function setLayout(){
  //슬라이드 레이아웃 설정
  let slideWidth = slideWrapper.offsetWidth;
  //slideContainer.style.transform = `translateX(-3000px)`;
  slideContainer.style.transform = `translateX(-${slideWidth*slideCount}px)`;
}
setLayout();

window.addEventListener('resize',()=>{
  setLayout();
});

/*
요소의 크기 파악하기
대상.offsetWidth
대상.offsetHeight
*/

let title = document.querySelector('h1');


for(let i = 0; i<slideCount;i++){
  let cloneSlide = slides[i].cloneNode(true); //복사
  cloneSlide.classList.add('clone'); //복사 클래스 추가
  slideContainer.appendChild(cloneSlide); //ul의 내용의 뒤에 추가
}
for(let i = slideCount -1; i >=0 ; i--){
  let cloneSlide = slides[i].cloneNode(true); //복사
  cloneSlide.classList.add('clone'); //복사 클래스 추가
  slideContainer.prepend(cloneSlide); //ul의 내용의 앞에 추가
}

let allslides = slideContainer.querySelectorAll('li'); //복사본 포함 전체 슬라이드

//대상.prepend(추가할 요소);

slides.forEach((slide,idx)=>{//원슬라이드로 페이저 생성
  pagerHTML = pagerHTML + `<a href="#">${idx}</a>`;
});

allslides.forEach((slide,idx)=>{ //복사본 포함 전체 슬라이드를 가로 배치
  slide.style.left = `${idx * 100}%`;
});


pager.innerHTML = pagerHTML;
let pagerBtn = pager.querySelectorAll('a');



function goToslide(num){
  slideContainer.style.left = `${-num*100}%`;
  currentIdx = num;

  //gager 업데이트
  /* 모든 페이저에서 active 제거, 현재 슬라이드번호에 해당하는 그 요소에만 active 추가*/
  for(let pb of pagerBtn){
    pb.classList.remove('active');
  }

  
  //슬라이드 활성화
  for(let slide of allslides){
    slide.classList.remove('active');
  }
  allslides[slideCount + num].classList.add('active');
  let pagerIndex = allslides[slideCount + num].getAttribute('data-idx');
  
  pagerBtn[pagerIndex].classList.add('active');

  //슬라이드 재배치(원위치)
  if(currentIdx === -5){
    setTimeout(()=>{
      slideContainer.classList.remove('animated');
      slideContainer.style.left = 0;
      currentIdx = 0;
    }, 400);
    setTimeout(()=>{
      slideContainer.classList.add('animated');
    },500)
  }
  if(currentIdx == slideCount*2-1){
    setTimeout(()=>{
      slideContainer.classList.remove('animated');
      slideContainer.style.left = `${(slideCount-1)*-100}%`;
      currentIdx = slideCount-1;
    }, 400);
    setTimeout(()=>{
      slideContainer.classList.add('animated');
    },500)
  }

}

//nextBtn 버튼을 클릭하면 현재 슬라이드 번호에 1을 더해서 gotoSlide에 전달한다
nextBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  goToslide(currentIdx + 1);
});
prevBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  goToslide(currentIdx - 1);
});

goToslide(0);


pagerBtn.forEach((pager,idx)=>{
  pager.addEventListener('click',(e)=>{
    e.preventDefault();
    let targetIdx = Number(e.target.innerText);
    goToslide(targetIdx);
  });
})

function AutoSlide(){
  timer = setInterval(()=>{
    let nextIdx = (currentIdx + 1)%slideCount;

    goToslide(nextIdx);
  }, 4000);
}

// AutoSlide();

// slideWrapper.addEventListener('mouseenter',()=>{
//   clearInterval(timer);
// });
// slideWrapper.addEventListener('mouseleave',()=>{
//   AutoSlide();
// });


