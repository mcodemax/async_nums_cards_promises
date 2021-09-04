const baseUrl = `http://deckofcardsapi.com/api/`;
const $btn = $('button');
const $cardDisplay = $('#card-display');
let deck;
let cardsDrawn = 0;
let currentCard;


async function getCardDraw1(){
    //1
    let data = await $.getJSON(`${baseUrl}deck/new/draw/?count=1`)
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
};

async function getCardDraw2(){
    //2
    let card1;
    data = await $.getJSON(`${baseUrl}deck/new/draw/?count=1`)
        
    deck = data.deck_id;
    card1 = data.cards[0]
    
    data = await $.getJSON(`${baseUrl}deck/${deck}/draw/?count=1`);

    console.log(`${card1.value} of ${card1.suit}`)
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
};



$(function() {
    
    $btn.click(async function(){ //handles drawing new card

        if(!deck){
            let data = await $.getJSON(`${baseUrl}deck/new/draw/?count=1`)
            
                console.log(`drawing first card from new gen deck...`);
                
                deck = data.deck_id;
                cardsDrawn = 1;//1 card drawn when drawing from new deck
                currentCard = data.cards[0]
                console.log({currentCard})

                showCard(currentCard);

                //return $.getJSON(`${baseUrl}deck/${deck}/draw/?count=1`);//delete?
            
            
        }else{
                
            let data = await $.getJSON(`${baseUrl}deck/${deck}/draw/?count=1`)
        
            if(cardsDrawn >= 52){//52 cards in deck
                $('#btn-stuff').remove();
            
                return alert(`The Deck is Empty!`);
            }      

            console.log(`drawing from deck currently in play...`);
            
            cardsDrawn++;

            currentCard = data.cards[0]
            console.log({currentCard});                

            if(currentCard){
                $cardDisplay.empty()
                showCard(currentCard);
            }
        }
    });
});

function showCard({image}){//needs input of card
  $cardDisplay.append(`<div id="current-card">
      <img src="${image}" alt="">
      </div>`);
};

