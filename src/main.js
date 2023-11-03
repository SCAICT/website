fetch('https://raw.githubusercontent.com/SCAICT/website-data/main/home.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.querySelector('.lcd').innerHTML = data.lcd.text;
        document.getElementById('lcdLink').href = data.lcd.link;
        document.getElementById('lcdLink').target = '_blank';
    })
    .catch(error => {
        console.error('Error:', error);
    });

const header = document.querySelector('header');

header.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 10 - 5;
    const y = e.clientY / window.innerHeight * 10 - 5;

    header.style.transform = `translate(${-x}vh, ${-y}vh)`;
})

var phone = (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
var rotation = false;

function checkRotation() {
    rotation = (window.innerHeight < window.innerWidth && phone);
}
var x, y;
function permission() {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            // (optional) Do something after API prompt dismissed.
            if (response == "granted") {
                window.addEventListener("deviceorientation", (e) => {
                    if (!rotation) {
                        x = e.gamma / 6;
                        y = e.beta / 6;
                    } else {
                        y = -e.gamma / 6;
                        x = e.beta / 6;
                    }

                    header.style.transform = `translate(${-x}vh, ${-y}vh)`;
                })
            } else {
                alert("Permission not granted");
            }
        })
        .catch(console.error)
}

window.addEventListener('resize', () => {
    checkRotation();
    permission()
})