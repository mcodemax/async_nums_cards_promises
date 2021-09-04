const favNum = 55;
const favNumArr = [55,11,23,51];
const urlOneNum = `http://numbersapi.com/${favNum}?json`;
const urlMultiNum = `http://numbersapi.com/${favNumArr}?json`;

let factsArr = [];

//Part1
async function getFacts(){
    let data = await $.getJSON(urlOneNum)
    console.log(data)    
};

//Part2
async function getMultiFacts(){
    let data = await $.getJSON(urlMultiNum)
    console.log(data)    
};

//Part3
async function getFactsDOM(){
    let factsArr = await Promise.all(
        Array.from({length:4}, () => {
            return $.getJSON(urlOneNum) //I don't like that this has no err handling incase numfacts server goes down
        })
    )

    factsArr.forEach(data => {
        $('ul').append(`<li>${data.text}</li>`)
    });
    
};