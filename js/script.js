const doc = document,
      content = doc.getElementById("content"),
      authorBlock = doc.getElementById("author")
let index = 0,
    position = 0,
    speed = .75,
    quoteArray = [],
    author = '',
    flag = true,
    i = 0

window.addEventListener('load', typeWriter)

function loadQuote(){
    const url = "https://api.quotable.io/random"

    fetch(url)
    .then(response=>{
        if(response.ok){
            return response.json()
        }
        else{
            console.log(response.status)
        }
    })
    .then(data=>{
        authorBlock.innerHTML = ''
        quoteArray[index] = data.content
        author = data.author
    })
}

function typeWriter(){
    if(flag){
        loadQuote()
        quoteArray[index] += ' '
        flag = false
    }
    content.innerHTML = quoteArray[index].substring(0, position) + '<span>\u25AE</span>'
    if(position++ != quoteArray[index].length){
        setTimeout('typeWriter()', 100 * speed)
    }
    else{
        quoteArray[index] = ' '
        authorBlock.innerHTML = author
        setTimeout('typeWriter()', 3000 * speed)
        position = 0
        flag = true
    }
}
      