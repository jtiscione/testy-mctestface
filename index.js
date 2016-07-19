'use strict';

const padders = require('./padders.js');

const BIG = 1000000;
const DIGITS = Math.round(Math.log10(BIG));

const PAD_LENGTHS = [10, 20, 30, 40];

function rand() {
    let nDigits = 1 + Math.floor(Math.random() * DIGITS);
    return '' + Math.floor(Math.random() * Math.pow(10, nDigits));
}

const numbers = Array.from({length: BIG}, (val, idx) => rand());

function go(labrat, len) {
    return numbers.map(function(number) {
        return labrat(number, len, ' ');
    });
}

PAD_LENGTHS.forEach(function(len) {

    console.log(`\n\nPadding ${BIG} numeric strings (maximum ${DIGITS} digits) to a length of ${len}:\n`);

    const stats = [];

    for (let name in padders) {
        let before = Date.now();
        go(padders[name], len);
        let after = Date.now();
        stats.push({'name' : name, "time" : (after - before)});
    }

    stats.sort((a, b) => ((a.time === b.time) ? 0 : (a.time < b.time ? -1 : 1)));

    for (let stat of stats) {
        console.log(padders.tantrum_leftpad(stat.name, 20, ' ') + ': '+padders.tantrum_leftpad(stat.time, 5, ' ')+' ms.');
    }
});

