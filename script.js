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