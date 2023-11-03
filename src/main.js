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

//Use gyroscopes on mobile devices

window.addEventListener('deviceorientation', (e) => {
    const x = e.gamma / 10;
    const y = e.beta / 10;
document.querySelector('.lcd').innerHTML = x;
    header.style.transform = `translate(${-x}vh, ${-y}vh)`;
})