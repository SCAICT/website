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

function permission() {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            // (optional) Do something after API prompt dismissed.
            if (response == "granted") {
                window.addEventListener("deviceorientation", (e) => {
                    const y = e.gamma / 6;
                    const x = e.beta / 6;
                    document.querySelector('.lcd').innerHTML = x;
                    header.style.transform = `translate(${-x}vh, ${-y}vh)`;
                })
            } else {
                alert("Permission not granted");
            }
        })
        .catch(console.error)
}

// resize event

window.addEventListener('resize', () => {
alert("spin!");
permission()
})