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
let shroomUser = JSON.parse(localStorage.getItem('shroomUser'))
// If user not logged in, redirect to intro page
if (!shroomUser && window.location.pathname !== '/index.html') window.location='index.html'

// Set navbar based on user state
const nav = document.querySelector('#navbarSupportedContent')
setNavbar(shroomUser)

function setNavbar(user) {
  if (user) {
    nav.innerHTML = navbarSignedIn()
    const logoutButton = document.querySelector('#nav-logout-button')
    const myShroomsButton = document.querySelector('#nav-shrooms-button')
    const createButton = document.querySelector('#nav-create-button')
    logoutButton.addEventListener('click', logout)
    myShroomsButton.addEventListener('click', () => window.location='view-myshrooms.html')
    createButton.addEventListener('click', () => window.location='create.html')
  } else {
    nav.innerHTML = navbarSignedOut()
    const loginButton = document.querySelector('#nav-login-button')
    loginButton.addEventListener('click', login)
  }
}

function logout() {
  localStorage.removeItem('shroomUser')
  window.location='index.html'
}

function login() {
  localStorage.setItem('shroomUser', JSON.stringify({ id: 1, username: 'Kevin' }))
  shroomUser = JSON.parse(localStorage.getItem('shroomUser'))
  setNavbar(shroomUser)
}