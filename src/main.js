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
