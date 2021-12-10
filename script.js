const carList = {
    popular: {
        "maximumVelocity": { "min": 180, "max": 200 },
        "minimumVelocity": { "min": 110, "max": 130 },
        "skid": { "min": 3, "max": 4 },
        "name": "popular"

    },
    sport: {
        "maximumVelocity": { "min": 195, "max": 215 },
        "minimumVelocity": { "min": 125, "max": 145 },
        "skid": { "min": 2, "max": 3 },
        "name": "sport"
    },
    supersport: {
        "maximumVelocity": { "min": 210, "max": 230 },
        "minimumVelocity": { "min": 140, "max": 160 },
        "skid": { "min": 1, "max": 1.75 },
        "name": "supersport"
    },
}
const pointsPerRace = [{
        firstplace: 200,
        secondplace: 120,
        thirdplace: 50,
        laps: 10,
    },
    {
        firstplace: 220,
        secondplace: 130,
        thirdplace: 75,
        laps: 70,
    },
    {
        firstplace: 250,
        secondplace: 150,
        thirdplace: 90,
        laps: 160,
    },
]

const drivers = [
    //Edna
    {
        car: [],
        name: "Edna",
        points: 0,
        level: 1
    },
    //Juca
    {
        car: [],
        name: "Juca",
        points: 0,
        level: 1
    },
    //Pedro
    {
        car: [],
        name: "Pedro",
        points: 0,
        level: 1
    },

]


function updatePoints(driver) {
    let level = Math.ceil(driver.points / 450);
    while (driver.level < level && driver.level <= 9) {
        driver.car.maximumVelocity += 0.01 * driver.car.maximumVelocity
        driver.car.minimumVelocity += 0.01 * driver.car.minimumVelocity
        driver.level++
    }
}




function randomCar() {
    let odds = Math.random() * 100;
    if (odds <= 60) {
        const popular = carList.popular;
        let maximumVelocity = Math.round(Math.random() * (popular.maximumVelocity.max - popular.maximumVelocity.min) + popular.maximumVelocity.min);
        let minimumVelocity = Math.round(Math.random() * (popular.minimumVelocity.max - popular.minimumVelocity.min) + popular.minimumVelocity.min);
        let skid = Math.random() * (popular.skid.max / 100 - popular.skid.min / 100) + popular.skid.min / 100;
        let carParameters = {
            "maximumVelocity": maximumVelocity,
            "minimumVelocity": minimumVelocity,
            "skid": skid,
            "name": "popular"
        }
        return carParameters;
    }

    if (odds >= 60 && odds <= 95) {
        const sport = carList.sport;
        let maximumVelocity = Math.round(Math.random() * (sport.maximumVelocity.max - sport.maximumVelocity.min) + sport.maximumVelocity.min);
        let minimumVelocity = Math.round(Math.random() * (sport.minimumVelocity.max - sport.minimumVelocity.min) + sport.minimumVelocity.min);
        let skid = Math.random() * (sport.skid.max / 100 - sport.skid.min / 100) + sport.skid.min / 100;
        let carParameters = {
            "maximumVelocity": maximumVelocity,
            "minimumVelocity": minimumVelocity,
            "skid": skid,
            "name": "sport"
        }
        return carParameters;
    } else {
        const supersport = carList.supersport;
        let maximumVelocity = Math.round(Math.random() * (supersport.maximumVelocity.max - supersport.maximumVelocity.min) + supersport.maximumVelocity.min);
        let minimumVelocity = Math.round(Math.random() * (supersport.minimumVelocity.max - supersport.minimumVelocity.min) + supersport.minimumVelocity.min);
        let skid = Math.random() * (supersport.skid.max / 100 - supersport.skid.min / 100) + supersport.skid.min / 100;
        let carParameters = {
            "maximumVelocity": maximumVelocity,
            "minimumVelocity": minimumVelocity,
            "skid": skid,
            "name": "supersport"
        }
        return carParameters;
    }
}


drivers[0].car = randomCar(); //edna
drivers[1].car = randomCar(); //juca
drivers[2].car = randomCar(); //pedro


function levelAndPoints() {
    drivers.forEach(driver => {
        updatePoints(driver)
    });
}

function run(voltas) {
    let numeroVoltas = pointsPerRace[voltas].laps;
    let voltasGanhasPedro = 0;
    let voltasGanhasEdna = 0;
    let voltasGanhasJuca = 0;
    let velPedro = Math.round(Math.random() * (drivers[2].car.maximumVelocity - drivers[2].car.minimumVelocity) + drivers[2].car.minimumVelocity);
    let velEdna = Math.round(Math.random() * (drivers[0].car.maximumVelocity - drivers[0].car.minimumVelocity) + drivers[0].car.minimumVelocity);
    let velJuca = Math.round(Math.random() * (drivers[1].car.maximumVelocity - drivers[1].car.minimumVelocity) + drivers[1].car.minimumVelocity);
    for (let i = 0; i < numeroVoltas; i++) {
        let velocidadeFinalPedro = Math.round(velPedro - (drivers[2].car.skid * velPedro));
        let velocidadeFinalJuca = Math.round(velJuca - (drivers[1].car.skid * velJuca));
        let velocidadeFinalEdna = Math.round(velEdna - (drivers[0].car.skid * velEdna));
        if (velocidadeFinalPedro > velocidadeFinalJuca && velocidadeFinalPedro > velocidadeFinalEdna)
            voltasGanhasPedro++;

        else if (velocidadeFinalEdna > velocidadeFinalJuca)
            voltasGanhasEdna++;

        else voltasGanhasJuca++;
    }
    if (voltasGanhasPedro > voltasGanhasEdna && voltasGanhasPedro > voltasGanhasJuca) {
        drivers[2].points += pointsPerRace[voltas].firstplace;
        if (voltasGanhasEdna > voltasGanhasJuca) {
            drivers[0].points += pointsPerRace[voltas].secondplace;
            drivers[1].points += pointsPerRace[voltas].thirdplace;
        } else {
            drivers[1].points += pointsPerRace[voltas].secondplace;
            drivers[0].points += pointsPerRace[voltas].thirdplace;
        }
    }
    if (voltasGanhasEdna > voltasGanhasPedro && voltasGanhasEdna > voltasGanhasJuca) {
        drivers[0].points += pointsPerRace[voltas].firstplace;
        if (voltasGanhasPedro > voltasGanhasJuca) {
            drivers[2].points += pointsPerRace[voltas].secondplace;
            drivers[1].points += pointsPerRace[voltas].thirdplace;
        } else {
            drivers[1].points += pointsPerRace[voltas].secondplace;
            drivers[2].points += pointsPerRace[voltas].thirdplace;
        }
    }
    if (voltasGanhasJuca > voltasGanhasPedro && voltasGanhasJuca > voltasGanhasEdna) {
        drivers[1].points += pointsPerRace[voltas].firstplace;
        if (voltasGanhasEdna > voltasGanhasPedro) {
            drivers[0].points += pointsPerRace[voltas].secondplace;
            drivers[2].points += pointsPerRace[voltas].thirdplace;
        } else {
            drivers[2].points += pointsPerRace[voltas].secondplace;
            drivers[0].points += pointsPerRace[voltas].thirdplace;
        }
    }

    levelAndPoints();

    displayOutput();

}

function displayOutput() {
    let localDrivers = drivers;
    console.log(localDrivers)
    for (let i = 0; i < localDrivers.length - 1; i++) {
        if (localDrivers[i].points < localDrivers[i + 1].points) {
            let temp = localDrivers[i]
            localDrivers[i] = localDrivers[i + 1]
            localDrivers[i + 1] = temp
        }

    }


    let html = ``
    localDrivers.forEach(driver => {
        html = html + `<div>
            <h2> ${driver.name} </h2>
            <p> Level  :  ${driver.level}</p>
            <p> Pontos : ${driver.points}</p>
            <p> Carro : ${driver.car["name"]}</p>
            <p>  MAXVelocity : ${driver.car["maximumVelocity"]} </p>
            <p> MINVelocity : ${driver.car["minimumVelocity"]} </p>
        </div>`
    })


    document.getElementById("options_and_result").innerHTML = html + `
        <button onclick="back()">GO BACK</button>
    `
}

function back() {
    document.getElementById("options_and_result").innerHTML = `
    <p id="text">Qual tipo de corrida você quer ?</p>
    <button onclick="run(0)">Corrida rápida: 10 voltas</button>
    <button onclick="run(1)">Grande Prêmio: 70 voltas</button>
    <button onclick="run(2)">Enduro: 160 voltas</button>
    `
}