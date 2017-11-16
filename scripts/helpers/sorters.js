function sortShroomsByDate(shrooms) {
  return shrooms.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
}

function sortShroomsByName(shrooms) {
  return shrooms.sort((a, b) => {
    const nameA = a.name.toUpperCase() // ignore upper and lowercase
    const nameB = b.name.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // otherwise names must be equal
    return 0
  })
}