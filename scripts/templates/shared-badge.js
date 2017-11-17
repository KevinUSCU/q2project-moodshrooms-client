function makeSharedBadge() {
  const badge = document.createElement('div')
  badge.classList = 'badge badge-pill badge-success'
  badge.style = 'position: absolute; top: 20px; right: 20px;'
  badge.innerText = 's'
  return badge
}