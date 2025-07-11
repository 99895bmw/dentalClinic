// Load scroller-bar text from src/data/scroller-text.txt
const scrollerBar = document.getElementById('scroller-bar');
if (scrollerBar){
    fetch('../data/scroller-text.txt')
      .then(res => res.text())
      .then(text => {
        scrollerBar.textContent = text;
      });
}

// --- Home page code only runs if section detected
document.addEventListener("DOMContentLoaded", function() {

    // MAIN GALLERY SLIDER
    const mainSlider = document.getElementById('main-slider');
    if (mainSlider) {
        const imgs = mainSlider.querySelectorAll('img');
        let idx = 0;
        function showSlide(i) {
            imgs.forEach((img, j) => img.classList.toggle('active', i===j));
        }
        showSlide(idx);
        setInterval(() => {
            idx = (idx+1)%imgs.length;
            showSlide(idx);
        }, 3000);
    }

    // DOCTOR REVIEWS
    const docReviewsDiv = document.getElementById('doctor-reviews');
    if (docReviewsDiv) {
        fetch('../data/reviews.json')
        .then(res => res.json())
        .then((reviewsArr) => {
            let i = 0;
            function showReview() {
                docReviewsDiv.textContent = `"${reviewsArr[i].review}" — ${reviewsArr[i].patient}`;
            }
            showReview();
            setInterval(() => {
                i = (i+1)%reviewsArr.length;
                showReview();
            }, 4000);
        });
    }

    // BLOG GALLERY (home)
    const mainTile = document.getElementById('blog-main-tile');
    const sideList = document.getElementById('blog-list');
    if (mainTile && sideList){
        fetch('../data/blogs.json')
         .then(res => res.json())
         .then(blogs => {
            let idx = 0;

            function setMainTile(i) {
                let b = blogs[i];
                mainTile.innerHTML = `
                    <img src="../../public/blogs/${b.thumbnail}" class="blog-thumb-s" style="width:110px;height:110px;float:left;border-radius:12px;margin-right:18px;" />
                    <div>
                        <div class="blog-list-title" style="font-size:1.22rem">${b.title}</div>
                    </div>
                `;
                mainTile.onclick = () => window.location.href = 'blogs.html';
            }

            function setSideList(start) {
                sideList.innerHTML = '';
                for (let k=0;k<4 && k<blogs.length;k++) {
                    let blog = blogs[(start+k+1)%blogs.length];
                    let item = document.createElement('div');
                    item.className = 'blog-list-item';
                    item.innerHTML = `
                        <span class="blog-list-title">${blog.title}</span>
                        <img src="../../public/blogs/${blog.thumbnail}" class="blog-thumb-s"/>
                    `;
                    item.onclick = ()=>window.location.href='blogs.html';
                    sideList.appendChild(item);
                }
            }

            setMainTile(0); setSideList(0);

            setInterval(()=>{
                idx=(idx+1)%blogs.length;
                setMainTile(idx);
                setSideList(idx);
            },3500);
        });
    }

    // MAIN REVIEW SLIDER
    const mainRevs = document.getElementById('main-reviews');
    if (mainRevs){
        fetch('../data/reviews.json')
        .then(res => res.json())
        .then((reviewsArr) => {
            let idx = 0;
            function showReview(j) {
                mainRevs.innerHTML = `
                    <q style="font-size:1.12rem">${reviewsArr[j].review}</q>
                    <div style="margin-top:6px;font-weight:bold;color:rgb(121,59,156,0.65);">${reviewsArr[j].patient}</div>
                `;
            }
            showReview(idx);
            setInterval(() => {
                idx = (idx+1)%reviewsArr.length;
                showReview(idx);
            }, 4800);
        });
    }

    // Smooth scroll to doctor section from navbar
    const navDoc = document.getElementById('nav-doctor');
    if (navDoc) {
        navDoc.addEventListener('click', e=>{
            e.preventDefault();
            const docSec = document.getElementById('doctor');
            if (docSec) docSec.scrollIntoView({behavior:'smooth'});
        });
    }

    // Animate floating book button on scroll
    const bookBtn = document.getElementById('book-float-btn');
    if (bookBtn) {
        window.addEventListener('scroll', ()=> {
            if (window.scrollY > 220) {
                bookBtn.style.transform = 'scale(1.03) rotate(-6deg)';
            } else {
                bookBtn.style.transform = '';
            }
        });
    }
});
