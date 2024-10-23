function degrees(degreesCelsius) {

    let degreesFahrenheit = (9 / 5) * degreesCelsius + 32;

    console.log(` ${degreesCelsius}°C = ${degreesFahrenheit}°F`);
}
degrees(-25);
module.exports = { degrees };