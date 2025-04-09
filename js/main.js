const startBtn = document.querySelector("#start")
const gameMenu = document.querySelector(".game-menu")
const gameDisplay = document.querySelector(".game-display")
const cardContainer = document.querySelector(".card-container")
const versusModeBtn = document.querySelector("#versus-mode")
const versusMode = document.querySelector(".game-versus-mode")
const gameMode = document.querySelector(".game-mode")
const singlemode = document.querySelector("#single-mode")

let musicPack = {
    bgmusic:"../music/bg-music.mp3",
    sounds:{
        win:"../sound/well-done.wav",
        lose:"../sound/unluck.wav",
    }
}

let cards = [
    `../assets/card1.png`,
    `../assets/card2.png`,
    `../assets/card3.png`,
    `../assets/card4.png`,
    `../assets/card1.png`,
    `../assets/card2.png`,
    `../assets/card3.png`,
    `../assets/card4.png`
]

let pickedCards = []

cards.sort(() => Math.random() - 0.5)

function startGame(){
    let bgAudio = new Audio(musicPack.bgmusic)
    bgAudio.volume = 0.08
    bgAudio.loop = true
    bgAudio.play()
    gameMenu.classList.toggle("active")
    gameMode.classList.toggle("active")
    

}


function switchMode(){
    gameMode.style.display = "none"
    versusMode.style.display = "flex"
    let bgAudio = new Audio(musicPack.bgmusic)
    bgAudio.volume = 0.08
    bgAudio.play()
}

cards.forEach((value) => {
let  card = document.createElement("div")
card.classList.add("card")
let img = document.createElement("img")
img.src = `../assets/logo.png`
card.appendChild(img)
cardContainer.appendChild(card)
card.addEventListener("click",handlePick)
card.dataset.info = value
})

function handlePick(e){
    if(pickedCards.length < 2){
        pickedCards.push(this)
        this.innerHTML = `<img class="card-img" src="${this.dataset.info}" alt="">`
        if(pickedCards.length === 2){
            let timeout = setTimeout(() => {
                checkout()
                clearTimeout(timeout)
            },1000)
            
        }
    }
}

function checkout(){
let card1 = pickedCards[0]
let card2 = pickedCards[1]
if(card1.dataset.info === card2.dataset.info){
    card1.classList.add("matched")
    card2.classList.add("matched")
let audio = new Audio(musicPack.sounds.win)
audio.play()
}else{
    let audio = new Audio(musicPack.sounds.lose)
    audio.play()
    card1.innerHTML = `<img src="../assets/logo.png" alt="">`
    card2.innerHTML = `<img src="../assets/logo.png" alt="">`
}
pickedCards = []
}


function startCalssicMode(){
    gameDisplay.classList.toggle("active")
    versusMode.classList.remove("active")
    gameMode.classList.remove("active")
    
}

function setParalax(e){
    let x = -e.clientX / 50
    let y = -e.clientY / 50
    gameMode.style.backgroundRepeat = "no-repeat"
    gameMode.style.backgroundPosition = x + "px"+ " " + y + "px"
}



window.addEventListener("keypress",startGame)
versusModeBtn.addEventListener("click",switchMode)
window.addEventListener("mousemove",setParalax)
singlemode.addEventListener("click",startCalssicMode)