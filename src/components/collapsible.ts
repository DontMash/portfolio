export default (initialState = false) => ({
  state: initialState,
  toggle() {
    this.state = !this.state;
  },
  open() {
    this.state = true;
  },
  close(focusElement?: HTMLElement) {
    this.state = false;

    if (focusElement) {
      focusElement.focus();
    }
  },
});
