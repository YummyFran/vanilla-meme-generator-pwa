const form = document.getElementById('form')
const memeOutput = document.querySelector('.meme')
const memeImage = document.querySelector('.image')
const topTextInput = document.querySelector('#topText')
const bottomTextInput = document.querySelector('#bottomText')
const topTextOutput = document.querySelector('.topText')
const bottomTextOutput = document.querySelector('.bottomText')

let memeData = {}
let meme = {
    topText: "",
    bottomText: "",
    url: ""
}

const generateMeme = e => {
    e.preventDefault()
    const memes = memeData.map(data => data.url)

    meme = {...meme, url: memes[Math.floor(Math.random() * memes.length)]}

    renderMeme()
}


const renderMeme = () => {
    if(!meme.url) return

    memeImage.src = meme.url

    topTextOutput.innerText = meme.topText
    bottomTextOutput.innerText = meme.bottomText

    memeOutput.classList.add('show')
}

window.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('https://api.imgflip.com/get_memes')
    const data = await res.json()

    memeData = data.data.memes
})

topTextInput.addEventListener('input', e => {
    meme.topText = e.target.value
    renderMeme()
})

bottomTextInput.addEventListener('input', e => {
    meme.bottomText = e.target.value
    renderMeme()
})

form.addEventListener('submit', generateMeme)
