document.addEventListener('click', function (e) {
  const link = e.target.closest('.menu-link');
  if (!link) return;

  const item = link.closest('.menu-item');
  item.classList.toggle('is-active');
});