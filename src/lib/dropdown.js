const init = () => {
  const dropdowns = document.querySelectorAll('select.if.dropdown-select');
  const checkIfSelectIsNotSelected = dropdown => dropdown.value === '';
  const setNotSelectedClass = dropdown => dropdown.classList.add('is-unselected');
  const handleSelectChange = e => e.target.classList.remove('is-unselected');
  dropdowns.forEach(dropdown => {
    if (checkIfSelectIsNotSelected(dropdown)) {
      setNotSelectedClass(dropdown);
    }
    dropdown.removeEventListener('change', handleSelectChange);
    dropdown.addEventListener('change', handleSelectChange);
  });
};
export default init;
