const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const wordsPerMinute = document.getElementById('actualWpm')
var visited


var noWordsTyped = 0
var curI = 0


quoteInputElement.addEventListener('input', ()=>{
  const ArrayQuote = quoteDisplayElement.querySelectorAll('span')
  const ArrayValue = quoteInputElement.value.split('')
   if(typeof visited ==='undefined'){
      visited = new Array(quoteDisplayElement.querySelectorAll('span').length)
      for(let i = 0; i<visited.length;i++){
         if(ArrayQuote.item(i).innerText===" "){
            visited[i] = true
         }else{
            visited[i] = false
         }
      }
  }
  wordsPerMinute.innerText = Math.floor((noWordsTyped/timer.innerText)*60)

   
  


  let correct = true
  ArrayQuote.forEach((characterSpan,index)=>{
     const character = ArrayValue[index]
     if(character==null){
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct = false

     }else if (character === characterSpan.innerText){
         if(character===' ' && visited[index]===true){

            visited[index]=false
            noWordsTyped = noWordsTyped + 1

         }
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')

     }else{
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct = false
     }

  })

  if(correct){
     renderNewQuote()
     visited = undefined
     noWordsTyped = 0
  }
})




function getRandomQuote(){
   return fetch(RANDOM_QUOTE_API_URL)
   .then(response=>response.json())
   .then(data => data.content)
   
}

async function renderNewQuote(){
   const quote = await getRandomQuote()
   quoteDisplayElement.innerHTML = ''
   quote.split('').forEach(character=>{
     const characterSpan = document.createElement('span')
     characterSpan.innerText = character
     quoteDisplayElement.appendChild(characterSpan)
   })
   quoteInputElement.value = null
   startTimer()
}




let startTime
function startTimer(){
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(()=>{
     timer.innerText = getTimerTime()[0]
     wordsPerMinute.innerText = Math.floor((noWordsTyped/timer.innerText)*60)

  }, 1000)
}


let tempTime
let wpm
function getTimerTime(){
   var res = new Array()
   
   
   tempTime = Math.floor((new Date() - startTime)/1000)
   
   res[0] = tempTime
   


   

  return res
}


 
renderNewQuote()
