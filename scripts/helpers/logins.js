// Login handlers
const validateButton = document.querySelector('#validate')
const loginMessageBox = document.querySelector('#login-message-box')
const newUserButton = document.querySelector('#create-new-user')
const newUserMessageBox = document.querySelector('#new-user-message-box')

validateButton.addEventListener('click', validateUser)
newUserButton.addEventListener('click', createUser)

function createUser() {
  const newUsername = document.querySelector('#new-username').value
  const newKey = document.querySelector('#new-key').value
  axios.post(`${baseURL}/users`, { username: newUsername, key: newKey })
  .then(result => {
    localStorage.setItem('shroomUser', JSON.stringify({ id: result.data, username: newUsername }))
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
  .catch(error => {
    // display error
    newUserMessageBox.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${error.response.data.error}
      </div>
    `
  })
}

function validateUser() {
  const loginUsername = document.querySelector('#username').value
  const loginKey = document.querySelector('#key').value
  axios.post(`${baseURL}/users/${loginUsername}`, { key: loginKey })
  .then(result => {
    localStorage.setItem('shroomUser', JSON.stringify({ id: result.data, username: loginUsername }))
    // display success
    loginMessageBox.innerHTML = `
      <div class="alert alert-info" role="alert">
        Welcome back!
      </div>
    `
    // wait 1 second then clear modal
    setTimeout(() => $('#loginModal').modal('hide'), 1000)
    login()
  })
  .catch(error => {
    // display error
    loginMessageBox.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${error.response.data.error}
      </div>
    `
  })
}

function login() {
  // Load user data
  shroomUser = JSON.parse(localStorage.getItem('shroomUser'))
  setNavbar(shroomUser)
}