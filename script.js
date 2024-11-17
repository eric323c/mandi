document.addEventListener('DOMContentLoaded', () => {
  const polaroids = document.querySelectorAll('.polaroid');
  polaroids.forEach((polaroid, index) => {
    setTimeout(() => {
      polaroid.style.transform += ' scale(1.1)';
      setTimeout(() => {
        polaroid.style.transform = polaroid.style.transform.replace(' scale(1.1)', '');
      }, 500);
    }, index * 200);
  });
});
