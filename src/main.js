/** @format */

fetch("https://raw.githubusercontent.com/SCAICT/website-data/main/home.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.querySelector(".lcd").innerHTML = data.lcd.text;
        document.getElementById("lcdLink").href = data.lcd.link;
        document.getElementById("lcdLink").target = "_blank";
    })
    .catch(error => {
        console.error("Error:", error);
    });

// Mouse Move Effect
const header = document.querySelector("header");
header.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth) * 10 - 5;
    const y = (e.clientY / window.innerHeight) * 10 - 5;
    header.style.transform = `translate(${-x}vh, ${-y}vh)`;
    bigHeader.style.opacity = 1;
    About.style.opacity = 0;
});

// Device Orientation Effect
var phone = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
);
var rotation = false,
    x,
    y;
function checkRotation() {
    rotation = window.innerHeight < window.innerWidth && phone;
}

function permission() {
    if (!DeviceOrientationEvent.requestPermission) return;
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == "granted") {
                window.addEventListener("deviceorientation", e => {
                    x = (rotation ? e.beta : e.gamma) / 6;
                    y = (rotation ? -e.gamma : e.beta) / 6;
                    header.style.transform = `translate3d(${-x}vh, ${-y}vh,0)`;
                });
            }
        })
        .catch(console.error);
}

window.addEventListener("resize", () => {
    checkRotation();
    permission();
});

//Scroll Effect

// Scale big header on scroll

const bigHeader = document.querySelector("header");
const container = document.querySelector(".container");
const PastActivities = document.querySelector("#PastActivities");
var last;
window.addEventListener("scroll", () => {
    // 放大效果
    if (window.scrollY < (window.innerHeight * 1.15) / 3)
        bigHeader.style.transform = `scale(${
            1 + (window.scrollY / window.innerHeight) * 80
        })`;

    // 透明度轉場
    if (window.scrollY > window.innerHeight * 0.05) {
        if (window.scrollY < (window.innerHeight * 1.15) / 3) {
            bigHeader.style.pointerEvents = "all";
            bigHeader.style.opacity =
                1 -
                ((window.scrollY - window.innerHeight * 0.05) /
                    window.innerHeight) *
                    3;
            About.style.opacity =
                ((window.scrollY - window.innerHeight * 0.05) /
                    window.innerHeight) *
                3;
        } else {
            // 轉場結束
            bigHeader.style.pointerEvents = "none";
            bigHeader.style.opacity = 0;
            About.style.opacity = 1;
            // Get the right offset of #PastActivities to the screen
            console.log(  PastActivities.getBoundingClientRect().left )
            // if (
            //     PastActivities.getBoundingClientRect().left >=
            //     0
            // )
                container.style.transform =
                    "translateX(" +
                    ((window.innerHeight * 1.15) / 3 - window.scrollY) +
                    "px)";
                    
        }
    } else {
        bigHeader.style.opacity = 1;
        About.style.opacity = 0;
    }
});
