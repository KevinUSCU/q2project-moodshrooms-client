// Following line is to connect to deployed Heroku server
// const baseURL = 'https://kevinuscu-q2project-moodshrooms-server.herokuapp.com'
// Following line is to connect to locally hosted server
const baseURL = 'http://localhost:3000'

// Set background image size
function resizeBkgImage() {
  const main = document.querySelector('main')
  const navbar = document.querySelector('.navbar')
  let winHeight = window.innerHeight - navbar.clientHeight // subtract navbar height
  main.style.height = `${winHeight}px`
}
resizeBkgImage() // on page load
window.onresize = resizeBkgImage //on window resize

// Check for logged in user
localStorage.setItem('shroomUser', JSON.stringify({ id: 1, username: 'Kevin' }))
// localStorage.removeItem('shroomUser')
let shroomUser = JSON.parse(localStorage.getItem('shroomUser'))
// If user not logged in, redirect to intro page
if (!shroomUser && window.location.pathname !== '/index.html') window.location='index.html'
