import debounce from './debounce';
import { formatCurrency } from './number-formatter';
import { srSpeak } from './a11y';
import { createTagElement } from './tags';

const addClass = (el, className) => {
  if (className && className.indexOf(' ') !== -1) {
    className.split(' ').forEach(cl => el.classList.add(cl));
  } else {
    el.classList.add(className);
  }
};

const createSortElement = (label, className = 'if sort', tag = 'span') => {
  const fragment = document.createDocumentFragment();
  const el = document.createElement(tag);
  const wrapper = document.createElement('span');

  wrapper.classList.add('if');
  wrapper.classList.add('inline-nowrap');

  wrapper.innerHTML = '&#xfeff;';
  wrapper.appendChild(el);
  wrapper.setAttribute('title', label);
  wrapper.setAttribute('aria-label', label);
  addClass(el, className);

  fragment.appendChild(wrapper);

  return fragment;
};

const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) => (v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );

const handleTHClick = function (e) {
  const th = e.target;
  const table = th.closest('table');
  table.querySelectorAll('th.is-ascending').forEach(el => {
    if (!th.isSameNode(el)) {
      el.classList.remove('is-ascending');
    }
  });
  table.querySelectorAll('th.is-descending').forEach(el => {
    if (!th.isSameNode(el)) {
      el.classList.remove('is-descending');
    }
  });
  if (!th.classList.contains('is-ascending') && !th.classList.contains('is-descending')) {
    th.classList.add('is-descending');
    th.classList.remove('is-ascending');
  } else if (th.classList.contains('is-descending')) {
    th.classList.add('is-ascending');
    th.classList.remove('is-descending');
  } else {
    th.classList.add('is-descending');
    th.classList.remove('is-ascending');
  }
  const tbody = table.querySelector('tbody');
  Array.from(tbody.querySelectorAll('tr:not(.is-expanded)'))
    .sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
    .forEach(tr => tbody.appendChild(tr));
};

const initTableSorter = table => {
  if (
    table.classList.contains('col-left') ||
    table.classList.contains('expandable') ||
    table.classList.contains('calendar')
  )
    return;
  const headers = table.querySelectorAll('thead > tr > th');
  headers.forEach(th => {
    if (th.textContent === '') return false;
    if (th.querySelector('.if.standalone')) return false;
    th.setAttribute('tabindex', 0);
    if (th.querySelector('.if.sort')) {
      th.removeEventListener('click', handleTHClick);
      th.removeEventListener('keydown', e => {
        if (e.key === 'Enter') {
          handleTHClick(e);
        }
      });
    } else {
      th.appendChild(createSortElement('Sort column'));
    }

    th.addEventListener('click', handleTHClick);
    th.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        handleTHClick(e);
      }
    });
  });
};

const initExandableTables = table => {
  if (!table.classList.contains('expandable')) return;

  const handleToggleExpandableRow = e => {
    const td = e.target;
    const row = td.parentElement;
    const expandableControl = row.querySelector('td:first-of-type');
    const isExpanded = row.classList.contains('is-expanded');
    const expandedRows = table.querySelectorAll('tr.expandable.is-expanded');
    const expandableContent = row.nextSibling;
    if (isExpanded) {
      row.classList.remove('is-expanded');
      expandableControl.setAttribute('aria-expanded', false);
      expandableContent.setAttribute('aria-hidden', true);
    } else {
      // Close other expanded rows
      expandedRows.forEach(tr => {
        tr.classList.remove('is-expanded');
        tr.querySelector('td:first-of-type').setAttribute('aria-expanded', false);
        tr.nextSibling.setAttribute('aria-hidden', true);
      });
      row.classList.add('is-expanded');
      expandableControl.setAttribute('aria-expanded', true);
      expandableContent.setAttribute('aria-hidden', false);
    }
  };

  table.querySelectorAll('tr.expandable > td:first-child').forEach(td => {
    td.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        handleToggleExpandableRow(e);
      }
    });
    td.addEventListener('click', handleToggleExpandableRow);
  });
};

const initTableCellCurrencyFormatter = table => {
  const tableNumbers = table.querySelectorAll('.if.currency');

  tableNumbers.forEach(t => {
    const text = t.innerText || t.textContent;
    const number = parseInt(text.replace(/ /g, ''), 10);
    t.textContent = formatCurrency(number);
  });
};

const initRowActions = () => {
  const rowActions = document.querySelectorAll('.js-table-row-menu');

  const handleClick = e => {
    const el = e.target;
    const menu = el.parentElement.querySelector('.if[class*="menu"]:not(button)');
    menu.classList.toggle('is-open');
  };

  rowActions.forEach(el => {
    const menu = el.parentElement.querySelector('.if[class*="menu"]:not(button)');
    const elRect = el.getBoundingClientRect();
    const parentRect = el.parentElement.getBoundingClientRect();
    const top = elRect.top - parentRect.top + elRect.height;
    menu.style.top = `${top}px`;
    menu.style.right = 0;
    el.removeEventListener('click', handleClick);
    el.addEventListener('click', handleClick);
  });
};

const getPreviousSibling = (el, selector) => {
  // Get the next sibling element
  let sibling = el.previousElementSibling;

  // If there's no selector, return the first sibling
  if (!selector) return sibling;

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
};

const getNumberOfCheckedBoxes = table => table.querySelectorAll('tr > td input[type="checkbox"]:checked').length;

const toggleBulkActions = (table, checkbox) => {
  const bulkActions = getPreviousSibling(table, '.if.table-bulk-actions');
  if (!checkbox || !bulkActions) return;
  const selectedSumElement = bulkActions.querySelector('.js-table-bulk-select-selected-items');
  const numberOfCheckedBoxes = getNumberOfCheckedBoxes(table);

  if (!checkbox.checked && !checkbox.indeterminate) {
    bulkActions.classList.remove('is-open');
  } else if (checkbox.checked || checkbox.indeterminate || !bulkActions.classList.contains('is-open')) {
    selectedSumElement.textContent = `${numberOfCheckedBoxes} item(s)`;
    bulkActions.classList.add('is-open');
  }
};

const handleMasterCheckboxChange = e => {
  const masterCheckbox = e.target;
  const masterRow = masterCheckbox.closest('tr');
  const isSelected = masterRow.classList.contains('is-selected');
  const table = e.target.closest('table');
  const checkboxes = table.querySelectorAll('tr > td input[type="checkbox"]');

  if (masterCheckbox.checked) {
    masterCheckbox.indeterminate = false;
  }

  if (isSelected) {
    masterRow.classList.remove('is-selected');
  } else {
    masterRow.classList.add('is-selected');
  }

  checkboxes.forEach(checkbox => {
    const row = checkbox.closest('tr');
    if (masterCheckbox.checked) {
      row.classList.add('is-selected');
      checkbox.checked = true;
    } else {
      row.classList.remove('is-selected');
      checkbox.checked = false;
    }

    toggleBulkActions(table, masterCheckbox);
  });
};

const setCheckboxIndeterminate = (table, checkbox) => {
  const numberOfBoxes = table.querySelectorAll('tr > td input[type="checkbox"]').length;
  const numberOfCheckedBoxes = getNumberOfCheckedBoxes(table);

  if (numberOfCheckedBoxes != numberOfBoxes && numberOfCheckedBoxes !== 0) {
    checkbox.indeterminate = true;
  } else {
    checkbox.indeterminate = false;
  }
};

const toggleMasterCheckbox = (table, checkbox) => {
  const numberOfBoxes = table.querySelectorAll('tr > td input[type="checkbox"]').length;
  const numberOfCheckedBoxes = getNumberOfCheckedBoxes(table);

  if (numberOfCheckedBoxes === numberOfBoxes) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
};

const initMasterCheckboxChangeEvent = masterCheckbox => {
  masterCheckbox.addEventListener('change', handleMasterCheckboxChange);
};

const initCheckboxChangeEvents = (table, masterCheckbox) => {
  const checkboxes = table.querySelectorAll('tr > td input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function (e) {
      if (e.target.closest('tr').classList.contains('is-selected')) {
        e.target.closest('tr').classList.remove('is-selected');
      } else {
        e.target.closest('tr').classList.add('is-selected');
      }
      toggleMasterCheckbox(table, masterCheckbox);
      setCheckboxIndeterminate(table, masterCheckbox);
      toggleBulkActions(table, masterCheckbox);
    });
  });
};

const initBulkActionTables = table => {
  const masterCheckbox = table.querySelector('.js-table-bulk-select');
  if (!masterCheckbox) return;
  if (masterCheckbox.checked) {
    masterCheckbox.indeterminate = false;
  }

  setCheckboxIndeterminate(table, masterCheckbox);
  toggleBulkActions(table, masterCheckbox);
  initMasterCheckboxChangeEvent(masterCheckbox);
  initCheckboxChangeEvents(table, masterCheckbox);
};

const initFilterSearch = table => {
  const tableControls = getPreviousSibling(table, '.if.table-toolbar');
  if (!tableControls) return;
  const filterSearchHolder = tableControls.querySelector('.if.filter-search-holder');
  const search = filterSearchHolder.querySelector('input[type="search"]');
  if (!search) return;
  const rows = table.querySelectorAll('tbody > tr');
  search.addEventListener(
    'keyup',
    debounce(function (e) {
      const searchValues = e.target.value.trim().replace(/ +/g, ' ').toLowerCase().split(' ');

      Array.from(rows)
        .map(row => {
          row.style.display = 'none';
          return row;
        })
        .filter(tr => {
          const tds = Array.from(tr.querySelectorAll('td'));
          const filtered = tds.filter(td => !td.contains(td.querySelector('button')));
          const text = filtered
            .map(td => td.textContent)
            .join('')
            .trim()
            .replace(/ +/g, ' ')
            .replace(/\ufeff/g, '')
            .replace(/(?:\r\n|\r|\n)/g, '')
            .toLowerCase();
          let matchesSearch = true;
          searchValues.forEach(value => {
            matchesSearch = !matchesSearch ? false : text.indexOf(value) !== -1;
          });
          return matchesSearch;
        })
        .forEach(row => {
          row.style.display = 'table-row';
        });
    }, 200)
  );
};

const removeFilterTag = (currentFilter, tag) => {
  const duplicates = currentFilter
    .closest('.if.table-toolbar')
    .querySelectorAll(`.if.filter-tags-holder > button[data-rel="${tag}"]`);
  console.info(`Tag ${tag} removed`);
  srSpeak(`Tag ${tag} removed`);
  if (duplicates) {
    duplicates.forEach(dup => dup.remove());
  }
  initRemoveFilterTagEvent();
};

const uncheckTag = currentFilter => {
  currentFilter.checked = false;
  const list = currentFilter.closest('ul');
  currentFilter.setAttribute('aria-selected', false);
  list.setAttribute('aria-activedescendant', '');
};

const createTagFromFilter = (value, currentFilter) => {
  const holder = currentFilter.closest('.if.table-toolbar').querySelector('.if.filter-tags-holder');
  const trimmedValue = value.replace(',', '').trim();
  if (trimmedValue && trimmedValue.length >= 2) {
    removeFilterTag(currentFilter, trimmedValue);
    const newTagElement = createTagElement(trimmedValue);
    holder.appendChild(newTagElement);
    initRemoveFilterTagEvent();
  }
};

const initTableFilters = () => {
  const tableFiltersEls = document.querySelectorAll('.if.table-filters');

  tableFiltersEls.forEach(tableFilter => {
    const filterGroups = tableFilter.querySelectorAll('.if.dropdown-filter-groups [role="combobox"]');
    filterGroups.forEach(combobox => {
      combobox.addEventListener('click', e => {
        const currentCombobox = e.target;
        const listMenu = currentCombobox.parentElement.querySelector('[role="listbox"]');
        const isOpen = listMenu.classList.contains('is-open');

        if (isOpen) {
          currentCombobox.setAttribute('aria-expanded', false);
          listMenu.classList.remove('is-open');
        } else {
          currentCombobox.setAttribute('aria-expanded', true);
          listMenu
            .closest('ul')
            .querySelectorAll('.dropdown-filter.is-open')
            .forEach(el => el.classList.remove('is-open'));
          listMenu.classList.add('is-open');
          const comboboxGroupText = combobox.textContent;
          const selectedFilters = listMenu.querySelectorAll('[role="option"]:checked').length;
          srSpeak(`${selectedFilters} selected from group ${comboboxGroupText.trim().replace(/ +/g, ' ')}`);
        }
      });
      const filters = combobox.parentElement.querySelectorAll('[role="option"]');
      const list = combobox.parentElement.querySelector('[role="listbox"] > ul');
      filters.forEach(filter => {
        filter.addEventListener('change', e => {
          const currentFilter = e.target;
          const isSelected = currentFilter.checked;
          const selectedLabel = currentFilter.parentElement.querySelector('label');
          currentFilter.setAttribute('aria-selected', isSelected);
          if (isSelected) {
            list.setAttribute('aria-activedescendant', currentFilter.getAttribute('id'));
            srSpeak(`Selected ${selectedLabel.textContent}`);
            createTagFromFilter(selectedLabel.textContent, currentFilter);
          } else {
            removeFilterTag(currentFilter, selectedLabel.textContent);
            list.setAttribute('aria-activedescendant', '');
          }
        });
        filter.addEventListener('keyup', e => {
          if (e.key === 'Enter') {
            const currentFilter = e.target;
            let isSelected = currentFilter.checked;
            if (isSelected) {
              currentFilter.checked = false;
              isSelected = false;
            } else {
              currentFilter.checked = true;
              isSelected = true;
            }
            const selectedLabel = currentFilter.parentElement.querySelector('label');
            currentFilter.setAttribute('aria-selected', isSelected);
            if (isSelected) {
              list.setAttribute('aria-activedescendant', currentFilter.getAttribute('id'));
              srSpeak(`Selected ${selectedLabel.textContent}`);
              createTagFromFilter(selectedLabel.textContent, currentFilter);
            } else {
              removeFilterTag(currentFilter, selectedLabel.textContent);
              list.setAttribute('aria-activedescendant', '');
            }
          }
        });
      });
    });
  });
};

const initRemoveFilterTagEvent = () => {
  const tags = document.querySelectorAll('button.if.tag.is-interactive');
  tags.forEach(tag => {
    tag.removeEventListener('click', handleClickFilterTag);
    tag.addEventListener('click', handleClickFilterTag);
  });
};

const handleClickFilterTag = e => {
  e.preventDefault();
  const tag = e.target;
  const tagText = tag.getAttribute('data-rel');
  const checkbox = e.target.closest('.if.table-toolbar').querySelector(`input[data-rel="${tagText}"]`);
  const nextTag = tag.nextElementSibling;
  const comboBox = e.target.closest('.if.table-toolbar').querySelector('[role="combobox"]');
  const elementToFocus = nextTag && nextTag.classList.contains('tag') ? nextTag : comboBox;
  removeFilterTag(e.target, tag.getAttribute('data-rel'));
  uncheckTag(checkbox);
  elementToFocus.focus();
};

const handleClickOutsideFilterGroups = e => {
  try {
    const component = e.target.closest('.if.table-filters');
    const list = component.querySelector('.if.dropdown-filter-groups');

    if (!list.contains(e.target)) {
      component.querySelectorAll('.dropdown-filter.is-open').forEach(el => el.classList.remove('is-open'));
    }
  } catch (er) {
    document.querySelectorAll('.if.table-filters').forEach(component => {
      component.querySelectorAll('.dropdown-filter.is-open').forEach(el => el.classList.remove('is-open'));
    });
  }
};

// Init
const initClickOutsideFilterGroupsEvent = () => {
  document.addEventListener('click', handleClickOutsideFilterGroups);
};

const initTableFeatures = () => {
  document.querySelectorAll('table').forEach(table => {
    initTableSorter(table);
    initBulkActionTables(table);
    initExandableTables(table);
    initFilterSearch(table);
    initTableCellCurrencyFormatter(table);

    initRowActions();
  });
  initTableFilters();

  if (document.querySelector('.if.table-filters [role="listbox"]')) {
    initClickOutsideFilterGroupsEvent();
  }
};

export default initTableFeatures;
