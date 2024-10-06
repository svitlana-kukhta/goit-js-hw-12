import{a as v,i as l,S}from"./assets/vendor-u8rapaCG.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const L="46284520-d906981dc6cb4e25f7cb86bba",q="https://pixabay.com/api/";async function h(t,o=1){const r=new URLSearchParams({key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:o}),n=`${q}?${r.toString()}`;try{return(await v.get(n)).data}catch(e){throw console.error("Error fetching images:",e),e}}function g(t,o){const r=t.map(({webformatURL:n,largeImageURL:e,tags:s,likes:u,views:b,comments:w,downloads:P})=>`
      <div class="photo-card">
          <a href="${e}">
          <img src="${n}" alt="${s}" width="300" loading="lazy"/>
        </a>
        <ul class="info">
          <li class="info-item">
            <p>Likes</p>
            <span class="info-value">${u}</span>
          </li>
          <li class="info-item">
            <p>Views</p>
            <span class="info-value">${b}</span>
          </li>
          <li class="info-item">
            <p>Comments</p>
            <span class="info-value">${w}</span>
          </li>
          <li class="info-item">
            <p>Downloads</p>
            <span class="info-value">${P}</span>
          </li>
        </ul>
      </div>`).join("");o.insertAdjacentHTML("beforeend",r)}function E(t){t.innerHTML=""}const f=document.querySelector("#search-input"),$=document.querySelector(".btn"),y=document.querySelector(".gallery"),i=document.querySelector(".loader"),a=document.querySelector(".load-more");let c=1,d=1,m="",p;$.addEventListener("click",async t=>{t.preventDefault();const o=f.value.trim();if(!o){l.show({message:"Please try again!"});return}m=o,c=1,E(y),i.style.display="block",a.style.display="none";try{const r=await h(o,c);if(console.log(r),i.style.display="none",!r.hits||r.hits.length===0){l.show({message:"No images found for your query. Please try another search."});return}d=Math.ceil(r.totalHits/15),g(r.hits,y),p=new S(".gallery a",{captionDelay:250}),p.refresh(),c<d?a.style.display="block":a.style.display="none",f.value=""}catch(r){console.error("Error fetching images:",r),i.style.display="none",l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}});function N(){const{height:t}=document.querySelector(".gallery a").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}a.addEventListener("click",async()=>{i.style.display="block",c+=1;try{const t=await h(m,c);if(i.style.display="none",!t.hits||t.hits.length===0){l.show({message:"No more images found."}),a.style.display="none";return}g(t.hits,y),p.refresh(),N(),c<d?a.style.display="block":(l.show({message:"We're sorry, but you've reached the end of search results."}),i.style.display="none",a.style.display="none")}catch{i.style.display="none",a.style.display="none",l.error({title:"Error",message:"Sorry, something went wrong. Please try again!"})}});
//# sourceMappingURL=index.js.map
