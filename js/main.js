window.addEventListener("scroll", function(){
  var header = document.querySelector("nav");
  header.classList.toggle("sticky", window.scrollY > 0);
})





//////////////////////탭
let tabMenu = document.querySelectorAll('.tab-menu a');
let tabContent = document.querySelectorAll('#tab-content > div')

for (let tm of tabMenu){
    tm.addEventListener('click', function(e){
        e.preventDefault();

        for (let tm of tabMenu){
            tm.classList.remove('active');
        }
        tm.classList.add('active');
    
        for(let tc of tabContent){
            tc.classList.remove('active');
        }
        let target = tm.getAttribute('href'); 
        document.querySelector(target).classList.add('active');
    });
}