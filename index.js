let textField = document.querySelector('#text-field');
let badWordCount = document.querySelector('.bad-word-count');
let wordCountElement = document.querySelector('.word-count');
let btn = document.querySelector("#check-btn");
let max = document.querySelector(".max");
const spinner = document.querySelector('.spinner-grow');
let maxWords = 500;
let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener('click', () =>{
  textField.textContent = '';
  badWordCount.textContent = '0';
})
btn.addEventListener('click', async()=>{
  if(textField.textContent == ''){
    return false;
  }
  let raw = textField.textContent;
  let getData = async ()=>{
    const url = 'https://api.apilayer.com/bad_words?censor_character=*';
    const options = {
	    method: 'POST',
	    headers: {
		'apikey':'GfrtL10BlcPtm1nyGBuIlEvPnQXzvLpZ'
	},
	body: raw
};

try {
  spinner.classList.remove('d-none');
	const response = await fetch(url, options);
	const result = await response.json();
	return result;
} catch (error) {
	console.error(error);
}
finally {
  spinner.classList.add('d-none');
}
}
let jsonData = await getData();
console.log(jsonData);
if(jsonData.bad_words_total == 0){
  badWordCount.classList.remove('text-danger', 'error-underline');
}
badWordCount.innerHTML = jsonData.bad_words_total;

// let words = textField.innerText.split(" ");
// let badWordList = jsonData.bad_words_list;
// badWordList.forEach((item, index)=>{
//   if(words.includes(item.word)){
//       words[index] = `<span class="error-underline">${item.word}</span>`
//   }
// })
// textField.innerHTML = words.join(" ");
let words = textField.innerText.split(" ");
let badWordList = jsonData.bad_words_list;

words = words.map(word => {
  const foundBadWord = badWordList.some(badWord => word.includes(badWord.word));
  if (foundBadWord) {
    return `<span class="error-underline">${word}</span>`;
  }
  return word;
});

textField.innerHTML = words.join(" ");

const wordsContent = textField.textContent.trim().split(/\s+/);
const wordCount = words.length;
if(wordCount > maxWords){
  wordCountElement.classList.add('text-warning');
  textField.setAttribute("contenteditable", "false");
}else{
  textField.setAttribute("contenteditable", "true");
}
wordCountElement.textContent = wordCount;

})

max.innerHTML = maxWords;