// Following line is to connect to deployed Heroku server
const baseURL = 'https://kevinuscu-moodshrooms-server.herokuapp.com'
// Following line is to connect to locally hosted server
// const baseURL = 'http://localhost:3000'

// Check for currently logged in user
let shroomUser = JSON.parse(localStorage.getItem('shroomUser'))
// If user not logged in, redirect to intro page
if (!shroomUser && window.location.pathname !== '/index.html') window.location='index.html'

// Set navbar based on user state
const nav = document.querySelector('#navbarSupportedContent')
setNavbar(shroomUser)

// Login handlers
const loginUsername = document.querySelector('#username')
const loginKey = document.querySelector('#key')
const validateButton = document.querySelector('#validate')
const loginMessageBox = document.querySelector('#login-message-box')


const newUserButton = document.querySelector('#create-new-user')
const newUserMessageBox = document.querySelector('#new-user-message-box')

validateButton.addEventListener('click', login)
newUserButton.addEventListener('click', createUser)

function createUser() {
  const newUsername = document.querySelector('#new-username').value
  const newKey = document.querySelector('#new-key').value
  axiom.post(`${baseURL}/users`, { username: newUsername, key: newKey })
  .then(result => {
    localStorage.setItem('shroomUser', JSON.stringify({ id: result, username: newUsername }))
    // display success
    newUserMessageBox.innerHTML = `
      <div class="alert alert-info" role="alert">
        Account created. Welcome!
      </div>
    `
    // wait 1 second then clear modal
    setTimeout(() => $('#newUserModal').modal('hide'), 1000)
    login()
  })
  .catch(err => {
    // display error
    newUserMessageBox.innerHTML = `
      <div class="alert alert-alert" role="alert">
        ${err.error}
      </div>
    `
  })
}

function login() {
  // Load user data
  shroomUser = JSON.parse(localStorage.getItem('shroomUser'))
  setNavbar(shroomUser)
}

function logout() {
  localStorage.removeItem('shroomUser')
  window.location='index.html'
}

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
  }
}
