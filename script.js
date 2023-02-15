/*
<div class="container">
<button id="inner-button"> Klicka mig </button>
</div>
*/

// DOM elements
const body = document.querySelector('body')
const container = document.querySelector('.container')
const button = document.querySelector('#inner-button')
const openOverlayButton = document.querySelector('#open-overlay')
const lockCheckbox = document.querySelector('#lock-checkbox')
const controlledCheckbox = document.querySelector('#controlled-checkbox')
const wordList = {
	input: document.querySelector('#word-list > input'),
	button: document.querySelector('#word-list > button'),
	list: document.querySelector('#word-list > ul')
}
const remember = {
	heading: document.querySelector('#remember > h2'),
	input: document.querySelector('#remember > .name'),
	email: document.querySelector('#remember > .email'),
	button: document.querySelector('#remember > button')
}


// State (ingen)


// Events
container.addEventListener('click', () => {
	console.log('Container clicked')
})
button.addEventListener('click', () => {
	console.log('Button clicked')
})

openOverlayButton.addEventListener('click', () => {
	const overlay = document.createElement('div')
	const content = document.createElement('section')

	overlay.classList.add('overlay')
	content.innerText = 'Amazing content. Yes?'

	overlay.append(content)

	overlay.addEventListener('click', () => {
		console.log('Clicked overlay')
		overlay.remove()
	})

	content.addEventListener('click', event => {
		console.log('Clicked content. Overlay should NOT close')
		event.stopPropagation()
	})

	body.append(overlay)

	// <div class="overlay"> <div> Content </div> </div>
	// TODO: kolla in <dialog>
})

let checkboxIsLocked = false

lockCheckbox.addEventListener('input', () => {
	checkboxIsLocked = !checkboxIsLocked
	console.log('Lock checkbox changed, is locked: ', checkboxIsLocked)
})
controlledCheckbox.addEventListener('click', event => {
	console.log('Controlled checkbox changed, is locked: ', checkboxIsLocked)
	if( checkboxIsLocked ) {
		event.preventDefault()
	}
})


/*
Övning 10.4
4a Gör en webbsida som ska innehålla en lista (ul/ol) med ord. Det ska även finnas ett input-fält och en button. När användaren skriver ett ord i input-fältet och klickar på knappen, ska ordet läggas till i listan.
4b Input-fältet ska tömmas när man lagt till ett värde.
4c knappen ska bara gå att klicka på, när fältet inte är tomt.
4d Gör så att man även kan använda enter-tangenten för att lägga till ett ord.
*/
function addWord(event) {
	// Vi behöver inte parametern "event" just den här gången
	const word = wordList.input.value
	const li = document.createElement('li')
	li.innerText = word
	// li.append(word)  <- fungerar också
	wordList.list.append(li)

	wordList.input.value = ''
	wordList.button.disabled = true
}
wordList.button.addEventListener('click', addWord)

wordList.input.addEventListener('input', event => {
	// console.log('Input event on text field: ', event.target.value)
	
	const value = event.target.value  // Värdet i textfältet
	if( value === '' ) {
		wordList.button.disabled = true
	} else {
		wordList.button.disabled = false
	}
})

wordList.input.addEventListener('keydown', event => {
	// console.log('Keydown event on text field, key=', event.key)

	if (event.key === 'Enter' ) {
		addWord()
	}
})

// Datalogiska principer
// 1. Decomposition
// 2. Pattern recognition
// 3. Abstraction
// 4. Algorithm design

// Key för localStorage
const LS_KEY = '06-dom-name'

remember.input.addEventListener('input', event => {
	const value = event.target.value
	// localStorage.setItem(LS_KEY, value)

	renderRememberHeading(value)
})

remember.button.addEventListener('click', () => {
	const name = remember.input.value
	const email = remember.email.value
	const object = { name: name, email: email }  // { name, email }
	// localStorage.setItem(LS_KEY, JSON.stringify(object))
	const string = JSON.stringify(object)
	localStorage.setItem(LS_KEY, string)

	/* Alternativ kod för funktionen
	localStorage.setItem(LS_KEY, JSON.stringify({
		name: remember.input.value,
		email: remember.email.value
	}))*/
})



function renderRememberHeading(value) {
	remember.heading.innerText = `Välkommen ${value}!`
}


// När webbsidan laddas
const object = localStorage.getItem(LS_KEY)
if( object !== '' && object !== null ) {
	let realObject = JSON.parse(object)
	const savedName = realObject.name
	const savedEmail = realObject.email
	renderRememberHeading(savedName)
	remember.input.value = savedName
	remember.email.value = savedEmail
}

// För att ändra mer komplicerad data:
// 1. Hämta datan från localStorage
// 2. Gör om till JS-objekt, JSON.parse
// 3. Gör de ändringar som behövs i objektet
// 4. Gör om till sträng, JSON.stringify (serialisering)
// 5. Spara strängen i localStorage
