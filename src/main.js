fetch("https://raw.githubusercontent.com/SCAICT/website-data/main/home.json").then(a=>a.json()).then(a=>{document.querySelector(".lcd").innerHTML=a.lcd.text,document.getElementById("lcdLink").href=a.lcd.link,document.getElementById("lcdLink").target="_blank"}).catch(a=>{console.error("Error:",a)}),fetch("https://raw.githubusercontent.com/SCAICT/website-data/main/events.json").then(a=>a.json()).then(a=>{for(var b=a.activities,c="",d=0;d<b.length;d++)c+=`
            <article>
            ${""==b[d].image?"":"<img src=\""+b[d].image+"\" />"}
                <div>
                    <h4>${b[d].title}</h4>
                    <h5>${b[d].description}</h5>
                    <ul>
                        <li>
                            <i class="fa-solid fa-calendar"></i>
                            ${b[d].date}
                        </li>
                        <li>
                            <i class="fa-solid fa-location-dot"></i>
                            ${b[d].location}
                        </li>
                        <li>
                            <i class="fa-solid fa-tag"></i> ${b[d].price}
                        </li>
                    </ul>
                </div>
            </article>`;document.querySelector(".events").innerHTML=c}).catch(a=>{console.error("Error:",a)});const header=document.querySelector("header");header.addEventListener("mousemove",a=>{const b=10*(a.clientX/window.innerWidth)-5,c=10*(a.clientY/window.innerHeight)-5;header.style.transform=`translate(${-b}vh, ${-c}vh)`,bigHeader.style.opacity=1,About.style.opacity=0});var x,y,phone=/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),rotation=!1;function checkRotation(){rotation=window.innerHeight<window.innerWidth&&phone}function permission(){DeviceOrientationEvent.requestPermission&&DeviceOrientationEvent.requestPermission().then(a=>{"granted"==a&&window.addEventListener("deviceorientation",a=>{x=(rotation?a.beta:a.gamma)/6,y=(rotation?-a.gamma:a.beta)/6,header.style.transform=`translate3d(${-x}vh, ${-y}vh,0)`})}).catch(console.error)}window.addEventListener("resize",()=>{checkRotation(),permission()});const bigHeader=document.querySelector("header"),container=document.querySelector(".container"),PastActivities=document.querySelector("#Pastevents");let containerScrollWidth;window.onload=()=>{containerScrollWidth=container.offsetWidth-window.innerWidth+1.15*window.innerHeight/3};var last=window.scrollY;window.addEventListener("scroll",()=>{window.scrollY<1.15*window.innerHeight/3&&(bigHeader.style.transform=`scale(${1+80*(window.scrollY/window.innerHeight)})`),window.scrollY>.05*window.innerHeight?window.scrollY<1.15*window.innerHeight/3?(bigHeader.style.pointerEvents="all",bigHeader.style.opacity=1-3*((window.scrollY-.05*window.innerHeight)/window.innerHeight),About.style.opacity=3*((window.scrollY-.05*window.innerHeight)/window.innerHeight)):(bigHeader.style.pointerEvents="none",bigHeader.style.opacity=0,About.style.opacity=1,container.style.transform=window.scrollY<containerScrollWidth?"translateX("+(1.15*window.innerHeight/3-window.scrollY)+"px)":"translate(-"+(container.offsetWidth-window.innerWidth)+"px,"+(1.15*window.innerHeight/3-window.scrollY+containerScrollWidth-window.innerHeight/2)+"px)"):(bigHeader.style.opacity=1,About.style.opacity=0)});