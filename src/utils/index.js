export const goToLink = (link) => () => {
  window.open(
    link,
    '_blank' // <- This is what makes it open in a new window.
  );
}