const init = () => {
  const rangeInputList = document.querySelectorAll('input[type=range].slider')

  rangeInputList.forEach(rangeInput => {
    const PROGRESS_CLASSNAME = 'has-progress'
    const isValDefined = rangeInput.style.getPropertyValue('--val').length > 0
    let hasProgressClass = rangeInput.classList.value.indexOf(PROGRESS_CLASSNAME) > -1

    if (isValDefined && !hasProgressClass) {
      rangeInput.classList.add(PROGRESS_CLASSNAME)
    }

    rangeInput.addEventListener(
      'input',
      event => {
        const currentValue = event.target.value
        rangeInput.style.setProperty('--val', currentValue)
        rangeInput.setAttribute('value', currentValue)
        rangeInput.setAttribute('aria-valuenow', currentValue)

        if (!hasProgressClass) {
          hasProgressClass = true
          rangeInput.classList.add(PROGRESS_CLASSNAME)
        }
      },
      false
    )
  });
}

export default init
