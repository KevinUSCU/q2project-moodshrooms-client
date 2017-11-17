function navbarSignedOut() {
  return `
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <button type="button" class="btn btn-success my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">
          Sign In
        </button>
      </li>
    </ul>
  `
}

function navbarSignedIn() {
  return `
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <button id="nav-shrooms-button" class="btn btn-success" type="button">MyShrooms</button>
      </li>
      <li class="nav-item">
        <button id="nav-create-button" class="btn btn-success" type="button">Create Moodshroom</button>
      </li>
    </ul>
    <button id="nav-logout-button" class="btn btn-success" type="button">
      <span id="username">${shroomUser.username} </span>(Sign Out)
    </button>
  `
}