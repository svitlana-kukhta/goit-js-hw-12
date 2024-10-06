import{a as v,i as l,S}from"./assets/vendor-u8rapaCG.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const L="46284520-d906981dc6cb4e25f7cb86bba",P="https://pixabay.com/api/";async function h(r,o=1){const t=new URLSearchParams({key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:o}),n=`${P}?${t.toString()}`;try{return(await v.get(n)).data}catch(e){throw console.error("Error fetching images:",e),e}}function f(r,o){const t=r.map(({webformatURL:n,largeImageURL:e,tags:s,likes:i,views:m,comments:b,downloads:w})=>`
      <div class="photo-card">
          <a href="${e}">
          <img src="${n}" alt="${s}" width="300" loading="lazy"/>
        </a>
        <ul class="info">
          <li class="info-item">
            <p>Likes</p>
            <span class="info-value">${i}</span>
          </li>
          <li class="info-item">
            <p>Views</p>
            <span class="info-value">${m}</span>
          </li>
          <li class="info-item">
            <p>Comments</p>
            <span class="info-value">${b}</span>
          </li>
          <li class="info-item">
            <p>Downloads</p>
            <span class="info-value">${w}</span>
          </li>
        </ul>
      </div>`).join("");o.insertAdjacentHTML("beforeend",t)}function q(r){r.innerHTML=""}const p=document.querySelector("#search-input"),E=document.querySelector(".btn"),d=document.querySelector(".gallery"),c=document.querySelector(".loader"),a=document.querySelector(".load-more");let u=1,g="",y;E.addEventListener("click",async r=>{r.preventDefault();const o=p.value.trim();if(!o){l.show({message:"Please try again!"});return}g=o,u=1,q(d),c.style.display="block",a.style.display="none";try{const t=await h(o,u);if(console.log(t),c.style.display="none",!t.hits||t.hits.length===0){l.show({message:"No images found for your query. Please try another search."});return}f(t.hits,d),a.style.display="block",y=new S(".gallery a",{captionDelay:250}),y.refresh(),p.value="",t.hits.length<15&&(a.style.display="none")}catch(t){console.error("Error fetching images:",t),c.style.display="none",l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}});function $(){const{height:r}=document.querySelector(".gallery a").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}a.addEventListener("click",async()=>{c.style.display="block",u+=1;try{const r=await h(g,u);console.log("Response received from API:",r),r.hits&&r.hits.length>0?(f(r.hits,d),c.style.display="none",y.refresh(),r.hits.length<15&&(a.style.display="none;"),$()):(l.show({message:"We're sorry, but you've reached the end of search results."}),a.style.display="none")}catch{l.error({title:"Error",message:"Sorry, something went wrong. Please try again!"})}});
//# sourceMappingURL=index.js.map
