import{a as w,i,S as v}from"./assets/vendor-u8rapaCG.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const S="46284520-d906981dc6cb4e25f7cb86bba",P="https://pixabay.com/api/";let L=1;async function f(r){const s=new URLSearchParams({key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:L}),o=`${P}?${s.toString()}`;try{return(await w.get(o)).data}catch(a){throw console.error("Error fetching images:",a),a}}function h(r,s){const o=r.map(({webformatURL:a,largeImageURL:e,tags:t,likes:n,views:m,comments:g,downloads:b})=>`
      <div class="photo-card">
          <a href="${e}">
          <img src="${a}" alt="${t}" width="300" loading="lazy"/>
        </a>
        <ul class="info">
          <li class="info-item">
            <p>Likes</p>
            <span class="info-value">${n}</span>
          </li>
          <li class="info-item">
            <p>Views</p>
            <span class="info-value">${m}</span>
          </li>
          <li class="info-item">
            <p>Comments</p>
            <span class="info-value">${g}</span>
          </li>
          <li class="info-item">
            <p>Downloads</p>
            <span class="info-value">${b}</span>
          </li>
        </ul>
      </div>`).join("");s.insertAdjacentHTML("beforeend",o)}function q(r){r.innerHTML=""}const p=document.querySelector("#search-input"),$=document.querySelector(".btn"),d=document.querySelector(".gallery"),l=document.querySelector(".loader"),c=document.querySelector(".load-more");let u=1,E="",y;$.addEventListener("click",async r=>{r.preventDefault();const s=p.value.trim();if(!s){i.show({message:"Please try again!"});return}u=1,q(d),l.style.display="block",c.style.display="none";try{const o=await f(s,u);if(console.log(o),l.style.display="none",!o.hits||o.hits.length===0){i.show({message:"No images found for your query. Please try another search."});return}h(o.hits,d),c.style.display="block",y=new v(".gallery a",{captionDelay:250}),y.refresh(),p.value=""}catch(o){console.error("Error fetching images:",o),l.style.display="none",i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}});function I(){const{height:r}=document.querySelector(".gallery a").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}c.addEventListener("click",async()=>{l.style.display="block",u+=1;try{const r=await f(E,u);console.log("Response received from API:",r),r.hits&&r.hits.length>0?(h(r.hits,d),l.style.display="none",y.refresh(),I()):(i.show({message:"We're sorry, but you've reached the end of search results."}),c.style.display="none")}catch{i.error({title:"Error",message:"Sorry, something went wrong. Please try again!"})}});
//# sourceMappingURL=index.js.map
