const startKeyboardLink = document.getElementById('startKeyboardLink');

if (startKeyboardLink) {
  startKeyboardLink.addEventListener('click', () => {
    sessionStorage.setItem('babooPlayYardEntry', 'allowed');
  });
}
