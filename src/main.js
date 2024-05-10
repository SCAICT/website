/** @format */

fetch("https://raw.githubusercontent.com/SCAICT/website-data/main/home.json")
    .then(response => response.json())
    .then(data => {
        document.querySelector(".lcd").innerHTML = data.lcd.text;
        document.getElementById("lcdLink").href = data.lcd.link;
        document.getElementById("lcdLink").target = "_blank";
    })
    .catch(error => {
        console.error("Error: ", error);
    });

// Events
fetch("https://raw.githubusercontent.com/SCAICT/website-data/main/events.json")
    .then(response => response.json())
    .then(data => {
        const events = data.activities;
        let eventsHTML = "";
        for (const event of events) {
            eventsHTML += `
            <article onclick=(window.location.href="${event.link}")>
            ${event.image != "" ? `<img src="${event.image}"/>` : ""}<div><h4>${
                event.title
            }</h4>
            <div>${event.subtitle}</div>
            <ul><li><i class="fa-solid fa-calendar"></i> ${
                event.date
            }</li><li><i class="fa-solid fa-location-dot"></i> ${
                event.location
            }</li><li><i class="fa-solid fa-tag"></i> ${
                event.price
            }</li></ul><h5>${event.description}</h5></div></article>`;
        }
        document.querySelector(".events").innerHTML = eventsHTML;
    })
    .catch(error => {
        console.error("Error:", error);
    });

// Images
let imageData,
    pressed = false,
    imageIndex = 0;
fetch("https://raw.githubusercontent.com/SCAICT/website-data/main/images.json")
    .then(response => response.json())
    .then(data => {
        imageData = data;
        let sdBox = document.querySelector(".sdBox");
        for (const event in imageData) {
            const div = document.createElement("div");
            div.classList.add("sdCard");
            div.textContent = event;
            sdBox.appendChild(div);
            div.addEventListener("click", showImg);
        }
    })
    .catch(error => {
        console.error("Error: ", error);
    });

// Club
fetch("https://raw.githubusercontent.com/SCAICT/website-data/main/club.txt")
    .then(response => response.text())
    .then(data => {
        var club = data.split("\n");
        club = club
            .map(club => {
                if (club === "") return "";
                return `<div><img
            src="https://raw.githubusercontent.com/SCAICT/website-data/main/converted/club/${club}"
            alt="${club}" /><div class="back"><h4>${club.replace(
                    ".webp",
                    ""
                )}</h4></div></div>`;
            })
            .join("");
        document.querySelector(".club-list").innerHTML = club + club;
    })
    .catch(error => {
        console.error("Error: ", error);
    });

const sd = document.querySelector(".sd");
const imgContainer = document.getElementById("showImg-container");
const showImg = event => {
    if (pressed)
        document.querySelector(".selected-sd").classList.remove("selected-sd");
    else pressed = true;
    const activityName = event.target.innerText;
    event.target.classList.add("selected-sd");
    sd.classList = "out sd";
    imgContainer.innerHTML = '<div class="showImg"></div>';
    imageIndex = 0;
    setTimeout(() => {
        sd.classList = "in sd";
        setTimeout(() => {
            imgContainer.innerHTML = "";
            for (var i = 0; i < imageData[activityName].length; i++) {
                const div = document.createElement("div");
                div.classList.add("showImg");
                var imgLink = `https://raw.githubusercontent.com/SCAICT/website-data/main/converted/img/${activityName}/${imageData[activityName][i]}`;

                // Fetch image and convert to base64
                fetch(imgLink)
                    .then(response => response.blob())
                    .then(blob => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            div.style.backgroundImage = `url(${reader.result})`;
                        };
                        reader.readAsDataURL(blob);
                    })
                    .catch(error => {
                        console.error("Error fetching image:", error);
                    });

                imgContainer.appendChild(div);
            }
            document
                .querySelector("#showImg-container .showImg:last-child")
                .classList.add("displaying");
        }, 500);
    }, 500);
    sd.innerText = activityName;
};
const changeImg = (direction = 1) => {
    var lastDisplay = document.querySelector(".displaying");
    lastDisplay.classList.add("last-display");
    lastDisplay.classList.remove("displaying");

    setTimeout(() => {
        lastDisplay.classList.remove("last-display");
    }, 500);

    imageIndex += direction;
    if (imageIndex < 0) imageIndex = imageData[sd.innerText].length - 1;
    if (imageIndex >= imageData[sd.innerText].length) imageIndex = 0;
    document
        .querySelector(
            `#showImg-container .showImg:nth-child(${imageIndex + 1})`
        )
        .classList.add("displaying");
};

// Mouse Move Effect
const header = document.querySelector("header");
const awards = document.querySelector(".awards");
header.addEventListener("mousemove", e => {
    if (mobileVersion) {
        header.style.transform = "unset";
        return;
    }
    const x = (e.clientX / window.innerWidth) * 10 - 5;
    const y = (e.clientY / window.innerHeight) * 10 - 5;
    header.style.transform = `translate(${-x}vh, ${-y}vh)`;
    header.style.opacity = 1;
    awards.style.opacity = 1;
    About.style.opacity = 0;
});

// Device Orientation Effect
const phone = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
);
let rotation = false,
    x,
    y,
    mobileVersion = true;
function checkRotation() {
    rotation = window.innerHeight < window.innerWidth && phone;
    mobileVersion = window.innerHeight / window.innerWidth > 0.75;
    console.log("mobileVersion", mobileVersion);
    scrollFunction();
    if (mobileVersion) {
        header.style.transform = "unset";
        document.body.style.height = "unset";
        document.querySelector(".link").style.display = "none";
        // set id About_ to .cpuLogo if mobileVersion
        document.querySelector(".cpuLogo").id = "About_";
        document.querySelector(".goal h2").id = "Project_";
        document.querySelector("#Events h2").id = "Events_";
        document.querySelector(".treebox").id = "Social_";
        return;
    } else {
        document.querySelector(".cpuLogo").id = "";
        document.querySelector(".goal h2").id = "";
        document.querySelector("#Events h2").id = "";
        document.querySelector(".treebox").id = "";
    }

    document.querySelector(".link").style.display = "flex";
    containerScrollWidth =
        container.offsetWidth -
        window.innerWidth +
        (window.innerHeight * 1.15) / 3;
    SponsorBoxForHeight = document.querySelector(
        ".SponsorBoxForHeight"
    ).offsetHeight;
    document.body.style.height =
        containerScrollWidth +
        SponsorBoxForHeight -
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 5.5 +
        "px";
    document.getElementById("About_").style.height =
        document.querySelector(".before-goals").offsetWidth + "px";
    document.getElementById("Project_").style.height =
        document.querySelector("#Project").offsetWidth + "px";
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

// Scroll Effect

// Scale big header on scroll

const bigHeader = document.querySelector("header");
const container = document.querySelector(".container");
const PastActivities = document.querySelector("#Pastevents");
const charger = document.querySelector(".sponsor-fixed .sponsor-charger");
const fixedCharger = document.querySelector(".sponsor-charger.fixed");
const clubTitle = document.getElementById("clubTitle");
const introImg = document.querySelector(".introImg");
let containerScrollWidth, SponsorBoxForHeight;
window.onload = () => {
    checkRotation();
    document.querySelector(".loading").classList.add("loaded");
    console.log(
        `
                 +++++++++++++         +++      +++++++++++++++++++++      +++   
            +++++++++++++++++++++     ++++++++++++++++++++++++++++++++++++++++   
          ++++++++++++++++++++++++     +++++++++++++++++++++++++++++++++++++++   
        +++++++++              +       ++++++++ +++++++++++++++++++++ ++++++++   
      ++++++++                         +++++++++++++++++++++++++++++++++++++++   
    ++++++++                         +++++++++       +     ++  +      ++++++++++ 
   +++++++                            ++++++       ++      +    ++      +++++++  
  +++++++                           + +++++       ++      ++     ++      ++++++ +
  ++++++                             +++++++       ++    ++     ++       ++++++  
 ++++++                               +++++++       ++   ++    ++      ++++++++  
 ++++++                                +++++++++        ++          ++++++++++   
 ++++++                                 +++++++++++++++++++++++++++++++++++++    
 ++++++                                +++++++++++++++++++++++++++++++++++++++   
 ++++++                                +++++++++++++++++++++++++++++++++++++++   
  ++++++                             +++++++++++++++++++++++++++++++++++++++++   
  ++++++                           +++++++++++++++++++++++++++++++++++++++++++   
   ++++++                         ++++++++++++++++++++++++++++++++++++++++++++   
    +++++++                     ++++++++++++++                         +++++++   
     ++++++++                 ++++++++ +++++++                         +++++++   
      +++++++++            ++++++++++   ++++++                         +++++++   
        +++++++++++++++++++++++++++     ++++++                         ++++++    
          +++++++++++++++++++++++       ++++++                         ++++++    
             +++++++++++++++++           +++++                         +++++     
                   ++++                   ++++                         +++++     
                                                                             
        `
    );
};
// For scroll don't need original window.innerHeight;
const scrollFunction = () => {
    if (mobileVersion) {
        About.style.opacity = 0;
        container.style.transform = "unset";

        if (window.scrollY < (window.innerHeight * 1.15) / 3) {
            bigHeader.style.transform = `scale(${
                1 + (window.scrollY / window.innerHeight) * 80
            })`;
            bigHeader.style.opacity = 1;
            awards.style.opacity = 1;
        }
        // 透明度轉場
        if (window.scrollY > window.innerHeight * 0.05) {
            if (window.scrollY < (window.innerHeight * 1.15) / 3) {
                bigHeader.style.pointerEvents = "all";
                const opacityValue =
                    1 -
                    ((window.scrollY - window.innerHeight * 0.05) /
                        window.innerHeight) *
                        3;
                bigHeader.style.opacity = opacityValue;
                awards.style.opacity = opacityValue;
                About.style.opacity =
                    ((window.scrollY - window.innerHeight * 0.05) /
                        window.innerHeight) *
                    3;
            } else {
                // 轉場結束
                bigHeader.style.pointerEvents = "none";
                bigHeader.style.opacity = 0;
                awards.style.opacity = 0;
                About.style.opacity = 1;
                // background position
                if (
                    introImg.getBoundingClientRect().bottom <
                        window.innerHeight &&
                    introImg.getBoundingClientRect().bottom > 0
                ) {
                    console.log(
                        introImg.getBoundingClientRect().bottom /
                            window.innerHeight
                    );
                    introImg.style.backgroundPositionX =
                        (1 -
                            introImg.getBoundingClientRect().bottom /
                                window.innerHeight) *
                            100 +
                        "%";
                }
            }
        }
        return;

        // mobile end
    }
    if (window.scrollY < (window.innerHeight * 1.15) / 3)
        bigHeader.style.transform = `scale(${
            1 + (window.scrollY / window.innerHeight) * 80
        })`;
    // 透明度轉場
    if (window.scrollY > window.innerHeight * 0.05) {
        if (window.scrollY < (window.innerHeight * 1.15) / 3) {
            bigHeader.style.pointerEvents = "all";
            const opacityValue =
                1 -
                ((window.scrollY - window.innerHeight * 0.05) /
                    window.innerHeight) *
                    3;
            bigHeader.style.opacity = opacityValue;
            awards.style.opacity = opacityValue;
            About.style.opacity =
                ((window.scrollY - window.innerHeight * 0.05) /
                    window.innerHeight) *
                3;
        } else {
            // 轉場結束
            bigHeader.style.pointerEvents = "none";
            bigHeader.style.opacity = 0;
            awards.style.opacity = 0;
            About.style.opacity = 1;
            if (window.scrollY < containerScrollWidth) {
                container.style.transform =
                    "translateX(" +
                    ((window.innerHeight * 1.15) / 3 - window.scrollY) +
                    "px)";
                const projectOffset = document
                    .getElementById("Project")
                    .getBoundingClientRect().left;
                // 0.684
                if (
                    projectOffset < window.innerWidth &&
                    projectOffset > window.innerHeight * -0.684
                ) {
                    introImg.style.backgroundPositionX =
                        (1 -
                            (projectOffset + window.innerHeight * 0.684) /
                                (window.innerWidth +
                                    window.innerHeight * 0.684)) *
                            100 +
                        "%";
                }
            } else {
                container.style.transform =
                    "translate(-" +
                    (container.offsetWidth - window.innerWidth) +
                    "px," +
                    ((window.innerHeight * 1.15) / 3 -
                        window.scrollY +
                        containerScrollWidth -
                        window.innerHeight / 2) +
                    "px)";
            }
            fixedCharger.classList.toggle(
                "rise",
                window.scrollY + window.innerHeight / 5.5 > containerScrollWidth
            );
            if (clubTitle.getBoundingClientRect().top < window.innerHeight) {
                fixedCharger.style.transform =
                    "translateY(" +
                    (clubTitle.getBoundingClientRect().top -
                        window.innerHeight -
                        30) +
                    "px)";
                fixedCharger.style.transitionDuration = ".1s";
            } else {
                fixedCharger.style.transform = "";
                fixedCharger.style.transitionDuration = ".4s";
            }
        }
    } else {
        bigHeader.style.opacity = 1;
        awards.style.opacity = 1;
        About.style.opacity = 0;
    }
};

let ticking = false;
window.addEventListener("scroll", function (e) {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            scrollFunction();
            ticking = false;
        });
        ticking = true;
    }
});

elements = document.querySelectorAll(".tree i");
elements.forEach(element => {
    element.addEventListener("click", () => {
        element.style.top = "100%";
        setTimeout(() => {
            window.open(element.getAttribute("link"), "_blank");
        }, 300);
    });
});

const motorControl = () => {
    const motorSwitch = document.getElementById("motorSwitch");
    const spinner = document.querySelector(".spinner");
    if (motorSwitch.checked)
        document.querySelector(".spinner").setAttribute("style", "");
    else {
        const computedStyle = window.getComputedStyle(spinner);
        const transform = computedStyle.getPropertyValue("transform");
        const matrix = transform.match(/^matrix\((.+)\)$/);
        if (matrix) {
            const values = matrix[1].split(",");
            const a = values[0];
            const b = values[1];
            const matrixRotation = Math.round(
                Math.atan2(b, a) * (180 / Math.PI)
            );
            spinner.style.transform = `rotate(${matrixRotation}deg)`;
        }
    }
};

const ukraineBrightness = document.getElementById("ukraineBrightness");
var mouseY,
    currentBrightness = 1,
    status;
ukraineBrightness.addEventListener("mousedown", e => {
    status = 1;
    mouseY = e.clientY;
    document.addEventListener("mousemove", ukraineBrightnessChange);
});

const backgroundCenter = document.querySelector(".background-center");
const ukraineBrightnessChange = e => {
    const ukraineBrightnessValue = e.clientY - mouseY;
    backgroundCenter.style.setProperty(
        "--brightness",
        currentBrightness - ukraineBrightnessValue / 1000
    );
    ukraineBrightness.style.setProperty(
        "--brightnessR",
        (currentBrightness - ukraineBrightnessValue / 1000) * 720 + "deg"
    );
};

const ukraineHue = document.getElementById("ukraineHue");
var mouseHueY,
    currentHue = 230;
ukraineHue.addEventListener("mousedown", e => {
    mouseHueY = e.clientY;
    document.addEventListener("mousemove", ukraineHueChange);
    status = 2;
});

document.addEventListener("mouseup", e => {
    if (status == 2) {
        const ukraineHueValue = e.clientY - mouseHueY;
        currentHue += ukraineHueValue / 10;
        document.removeEventListener("mousemove", ukraineHueChange);
    } else {
        if (mouseY == "NaN") mouseY = e.clientY;
        const ukraineBrightnessValue = e.clientY - mouseY;
        currentBrightness -= ukraineBrightnessValue / 1000;
        document.removeEventListener("mousemove", ukraineBrightnessChange);
    }
});

const ukraineHueChange = e => {
    const ukraineHueValue = e.clientY - mouseHueY;
    backgroundCenter.style.setProperty(
        "--hueRotate",
        currentHue + ukraineHueValue / 10
    );
    ukraineHue.style.setProperty(
        "--hueRotateR",
        (currentHue + ukraineHueValue / 10) * -36 + "deg"
    );
};
