window.addEventListener("scroll", function(){
  var header = document.querySelector("nav");
  header.classList.toggle("sticky", window.scrollY > 0);
})




const slideWrapper = document.querySelector('.slidewrapper');
const slideContainer = slideWrapper.querySelector('.slidecontainer');
const slides = slideWrapper.querySelectorAll('.slide');
const pager = slideWrapper.querySelector('.pager');
const slideCount = slides.length;
let currentIdx = 0;
let timer;
let pagerHTML = '';

// 페이저 원슬라이드로 페이저 생성
slides.forEach((item,idx)=>{
    pagerHTML = pagerHTML + `<a href="#">${idx}</a>`;
    item.style.top = `${idx*100}%`    //가로배치
  });
pager.innerHTML = pagerHTML;

const pagerBtn = pager.querySelectorAll('a');

pagerBtn.forEach( (pager, idx) => {
    pager.addEventListener('click', (e) =>{
        e.preventDefault();
        showSlide(idx);
    })
})

// 
showSlide(0)



function showSlide(num){
    console.log(num);
    if(currentIdx === num) return; 
    let currentSlide = slides[currentIdx];
    let nextSlide = slides[num];

    currentSlide.animate( [ {top: '0%'}, {top: '-100%'} ], {duration:500, fill:'forwards'} );
    nextSlide.animate( [ {top: '100%'}, {top: '0%'} ], {duration:500, fill:'forwards'} );
    currentIdx = num; 

    updatePager();
}

function updatePager(){
  for (let pager of pagerBtn){
    pager.classList.remove('active');
  }
  pagerBtn[currentIdx].classList.add('active');
}
updatePager();

function autoSlide(){
  timer = setInterval( ()=>{
    let nextIdx = (currentIdx + 1) % slideCount; 
    showSlide(nextIdx); 
  }, 4000);
  
}

autoSlide();

//마우스 들어왔을때는 slide멈추는 기능
slideWrapper.addEventListener('mouseenter', () => {
    clearInterval(timer);
})
slideWrapper.addEventListener('mouseleave', () => {
    autoSlide();
})