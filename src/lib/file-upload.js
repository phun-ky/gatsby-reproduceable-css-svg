import { getSize, getSizeName, getSizeFullName } from './helper-file';
import tooltip from './tooltip';

const createFileListItem = (file, input) => {
  const listItemContainer = document.createElement('li');
  listItemContainer.classList.add('if');

  const fileNameElement = document.createElement('span');
  fileNameElement.classList.add('if');
  fileNameElement.classList.add('file-name');
  fileNameElement.classList.add('ui');
  fileNameElement.classList.add('icon');
  fileNameElement.classList.add('symbol');

  if (input.accept.indexOf('image') !== -1) {
    fileNameElement.classList.add('image');
  } else {
    fileNameElement.classList.add('document');
  }

  fileNameElement.setAttribute('title', file.name);

  const fileFeedbackElement = document.createElement('span');
  fileFeedbackElement.classList.add('if');
  fileFeedbackElement.classList.add('file-feedback');

  const fileAction = document.createElement('button');
  fileAction.setAttribute('type', 'button');
  fileAction.classList.add('if');
  fileAction.classList.add('file-action');
  fileAction.classList.add('delete');

  const fileSize = document.createElement('abbr');
  fileSize.setAttribute('title', getSizeFullName(file.size));

  const fileNameText = document.createTextNode(file.name);
  const fileFeedbackText = document.createTextNode(getSize(file.size));
  const fileSizeText = document.createTextNode(getSizeName(file.size));

  fileNameElement.appendChild(fileNameText);
  fileFeedbackElement.appendChild(fileFeedbackText);
  fileSize.appendChild(fileSizeText);
  fileFeedbackElement.appendChild(fileSize);

  listItemContainer.appendChild(fileNameElement);
  listItemContainer.appendChild(fileFeedbackElement);
  listItemContainer.appendChild(fileAction);

  return listItemContainer;
};

const createFileList = (input, files) => {
  if (!files.length) return;
  const container = document.createElement('div');
  container.classList.add('if');
  container.classList.add('uploaded-files');
  const list = document.createElement('ol');
  list.classList.add('if');

  Array.from(files).forEach(file => {
    list.appendChild(createFileListItem(file, input));
  });

  container.appendChild(list);

  return container;
};
const fileInputs = document.querySelectorAll('input[type="file"].if');
fileInputs.forEach(input => {
  input.addEventListener('change', () => {
    const fileUpload = input.parentElement.querySelector('.if.uploaded-files');
    if (fileUpload) {
      input.parentElement.removeChild(fileUpload);
    }
    input.parentElement.appendChild(createFileList(input, input.files));

    tooltip();
  });
});

const prevent = e => {
  e.preventDefault();
  e.stopPropagation();
};

const addDragOverClass = inputContainer => {
  inputContainer.classList.add('is-dragover');
};

const removeDragOverClass = inputContainer => {
  inputContainer.classList.remove('is-dragover');
};

const setDroppedFiles = (e, input) => {
  const files = e.dataTransfer.files;

  const fileUpload = input.parentElement.querySelector('.if.uploaded-files');
  if (fileUpload) {
    input.parentElement.removeChild(fileUpload);
  }
  input.parentElement.appendChild(createFileList(input, files));

  tooltip();
};

const init = () => {
  const fileDragNDropInputs = document.querySelectorAll('input[type=file].if.drag-drop');

  fileDragNDropInputs.forEach(input => {
    const form = input.closest('form');
    if (form) {
      form.addEventListener('drag', prevent);
      form.addEventListener('dragstart', prevent);
      form.addEventListener('dragend', prevent);
      form.addEventListener('dragover', prevent);
      form.addEventListener('dragenter', prevent);
      form.addEventListener('dragleave', prevent);
      form.addEventListener('drop', prevent);
    }
  });

  fileDragNDropInputs.forEach(input => {
    const inputContainer = input.parentElement;

    inputContainer.addEventListener('drag', prevent);
    inputContainer.addEventListener('dragstart', prevent);
    inputContainer.addEventListener('dragend', prevent);
    inputContainer.addEventListener('dragover', prevent);
    inputContainer.addEventListener('dragenter', prevent);
    inputContainer.addEventListener('dragleave', prevent);
    inputContainer.addEventListener('drop', prevent);

    inputContainer.addEventListener('dragover', () => {
      addDragOverClass(inputContainer);
    });
    inputContainer.addEventListener('dragenter', () => {
      addDragOverClass(inputContainer);
    });

    inputContainer.addEventListener('dragleave', () => {
      removeDragOverClass(inputContainer);
    });
    inputContainer.addEventListener('dragend', () => {
      removeDragOverClass(inputContainer);
    });
    inputContainer.addEventListener('drop', () => {
      removeDragOverClass(inputContainer);
    });
    inputContainer.addEventListener('drop', e => {
      setDroppedFiles(e, input);
    });
  });
};

export default init;
