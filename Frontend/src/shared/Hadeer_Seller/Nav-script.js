window.addEventListener("scroll",()=>{
    const indicatorBar=document.querySelector(".scroll-indicator-bar");
    const pageScroll=document.body.scrollTop || document.documentElement.scrollTop;
    const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    const scrollValue=(pageScroll/height)*100;
    indicatorBar.style.width=scrollValue+"%";
});

window.addEventListener("scroll",()=>{
    const progress=document.querySelector("#progressbar");
    const totalHeight=document.body.scrollHeight-window.innerHeight;
    const progressHeight=(window.pageYOffset/totalHeight)*100;
    progress.style.height=progressHeight+"%";
});
