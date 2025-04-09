const player1 = document.querySelector("#player-1")
const player2 = document.querySelector("#player-2")


const heroes = [
    {
        name:"",
        img:"../assets/card1.png",
        power:11,
    },
    {
        name:"",
        img:"../assets/card2.png",
        power:10,
    },
    {
        name:"",
        img:"../assets/card3.png",
        power:19,
    },
    {
        name:"",
        img:"../assets/card4.png",
        power:12,
    },
    {
        name:"",
        img:"../assets/card5.png",
        power:18,
    },
    {
        name:"",
        img:"../assets/card6.png",
        power:16,
    },
    {
        name:"",
        img:"../assets/card7.png",
        power:13,
    },
    {
        name:"",
        img:"../assets/card8.png",
        power:15,
    }
]

let choisedCards =[]
let player1Cards = []
let player2Cards = []
let hero1Hp = 4
let hero2Hp = 4
let musicPack = {
    flipcard:"../sound/flipcard.mp3",
    win:"../sound/win.mp3",
}

let flipcard = new Audio(musicPack.flipcard)
let win = new Audio(musicPack.win)

heroes.sort(() => Math.random() - 0.5)



heroes.forEach((value,index)=>{
    
let card = document.createElement("div")
card.classList.add("card")
let img = document.createElement("img")
img.src = `../assets/logo.png`
card.appendChild(img)
card.dataset.info = value.power
card.dataset.img = value.img

if(index < 4){
    player1.append(card)
    card.addEventListener("click",handleChoise)
    player1Cards.push(card)
}else{
    player2.append(card)
    card.addEventListener("click",handleChoise)
    player2Cards.push(card)
}

}
)

function handleChoise(e){

flipcard.currentTime = 0.1
flipcard.play()

if(choisedCards.length < 2){
    choisedCards.push(this)
    this.innerHTML = `<img class="card-img" src="${this.dataset.img}" alt="">`
    let powerEl = document.createElement("div")
    powerEl.classList.add("card-power")
    powerEl.append=(this.dataset.info)
    powerEl.innerHTML = `⚡${this.dataset.info}`
    this.append(powerEl)
    this.classList.add("choised")
    if(choisedCards.length === 2){
        let timeout = setTimeout(() =>{
            runVersus()
            clearTimeout(timeout)
        },1000)
    }
}
}

function runVersus(){
    let card1 = choisedCards[0]
    let card2 = choisedCards[1]

    card1.classList.remove("choised")
    card2.classList.remove("choised")

    if(card1.dataset.info > card2.dataset.info){
       player2Cards = player2Cards.filter(card=>card !== card2)
        card2.remove()
        card1.innerHTML =`<img src="../assets/logo.png" alt="">`
        hero2Hp--
    }else{
        player1Cards = player1Cards.filter(card=>card !== card1)
        card1.remove()
        card2.innerHTML =`<img src="../assets/logo.png" alt="">`
        hero1Hp--
    }
    console.log(
        hero1Hp,
        hero2Hp
    )

    if(hero1Hp === 0 || hero2Hp === 0){
        if(hero1Hp === 0){
            alert("Player 2 wins!")
            win.play()
        }else{
            alert("Player 1 wins!")
            win.play()
        }
    }

    choisedCards = []

}

