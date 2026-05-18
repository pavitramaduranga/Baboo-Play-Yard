const keyboardLinks = document.querySelectorAll('a[href="./keyBoard.html"]');
const sharePageBtn = document.getElementById('sharePageBtn');

keyboardLinks.forEach(link => {
  link.addEventListener('click', () => {
    sessionStorage.setItem('babooPlayYardEntry', 'allowed');
  });
});

if (sharePageBtn) {
  sharePageBtn.addEventListener('click', async () => {
    const shareUrl = window.location.origin && window.location.origin !== 'null'
      ? window.location.origin + window.location.pathname
      : window.location.href;

    const shareData = {
      title: 'Baboo Play Yard',
      text: 'A kids keyboard game for exploring letters, numbers, sounds, and emoji reactions with a parent nearby.',
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      if (error.name !== 'AbortError') console.log('Sharing is not available', error);
    }
  });
}
