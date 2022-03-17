const setCaretToEnd = (element) => {
  if (element.innerText.length === 0) {
    element.focus();
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  element.focus();
};

export default setCaretToEnd;