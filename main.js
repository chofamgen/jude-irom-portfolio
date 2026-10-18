// Grab the elements once. WHY: re-querying the DOM on every click is wasteful.
const navToggleButton = document.getElementById("nav-toggle-button");
const navLinkList = document.getElementById("nav-link-list");

// WHY the guard: if either element is ever renamed in the HTML, we fail quietly
// instead of throwing an error that would break any JS added to this file later.
if (navToggleButton && navLinkList) {

  // One helper so open/close logic lives in a single place.
  const setMenuOpen = (shouldOpen) => {
    // WHY String(): aria attributes expect the TEXT "true"/"false", not a boolean.
    // The CSS reads this attribute to show or hide the menu, so there is one source of truth
    // and screen readers and sighted users can never see different states.
    navToggleButton.setAttribute('aria-expanded', String(shouldOpen));
  };

  // Toggle on button click: read the current state, then flip it.
  navToggleButton.addEventListener('click', () => {
    const isCurrentlyOpen = navToggleButton.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isCurrentlyOpen);
  });

  // WHY close on link tap: one-page anchor links don't reload the page, so the dropdown
  // would otherwise stay open and cover the section the user just jumped to.
  // WHY one listener on the <ul> (event delegation): it covers every link, even ones added later.
  navLinkList.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  // WHY Escape: standard keyboard behaviour for popup menus.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
}