document.getElementById('show-program').addEventListener('click', loadProgram);

function getRandomTime() {
    const times = [
        '16:00', '16:30', '17:00', '17:30',
        '18:00', '18:30', '19:00', '19:30',
        '20:00', '20:30', '21:00', '21:30',
        '22:00', '22:30', '23:00', '23:30',
        '00:00', '00:30', '01:00', '01:30'
    ];
    return times[Math.floor(Math.random() * times.length)];
}

function getRandomDate() {
    const dates = ['Jour 1', 'Jour 2', 'Jour 3'];
    return dates[Math.floor(Math.random() * dates.length)];
}

async function loadProgram() {
    const response = await fetch('data/Group.json');
    const concerts = await response.json();
    const now = `${getRandomDate()} ${getRandomTime()}`;
    const ongoingConcerts = concerts.filter(concert => concert.date === now.split(' ')[0] && concert.time === now.split(' ')[1]);

    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `<h2>Current Time: ${now}</h2>`;

    if (ongoingConcerts.length === 0) {
        mainContent.innerHTML += `<p>No concerts are currently playing.</p>`;
    } else {
        ongoingConcerts.forEach(concert => {
            mainContent.innerHTML += `
                <div class="concert">
                    <img src="${concert.image}" alt="${concert.name}">
                    <h3>${concert.name}</h3>
                    <p>Genre: ${concert.genre}</p>
                    <p>Scene: ${concert.scene}</p>
                    <p>Time: ${concert.time}</p>
                    <a href="${concert.link}" target="_blank">More Info</a>
                </div>
            `;
        });
    }
}
