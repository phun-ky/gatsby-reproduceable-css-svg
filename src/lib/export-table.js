import TableExport from 'tableexport';
import humanize from 'humanize-string';
import filesize from './filesize';
import tooltip from './tooltip';

const handleClick = (TB, tableId) => {
  const exportData = TB.getExportData();
  const xlsxData = exportData[tableId].xlsx;
  TB.export2file(
    xlsxData.data,
    xlsxData.mimeType,
    xlsxData.filename,
    xlsxData.fileExtension,
    xlsxData.merges,
    xlsxData.RTL,
    xlsxData.sheetname
  );
};

const init = () => {
  const _table_to_export_button_els = document.querySelectorAll('[data-export-spreadsheet]');
  _table_to_export_button_els.forEach(el => {
    const _filename = el.getAttribute('data-export-filename');
    const _table_to_export = el.getAttribute('data-export-spreadsheet');
    const _export_button_title = el.getAttribute('data-export-title');
    if (!_table_to_export) return;
    const _table_to_export_el = document.getElementById(_table_to_export);
    if (!_table_to_export_el) return;
    const TB = new TableExport(_table_to_export_el, {
      filename: _filename,
      exportButtons: false
    });
    el.querySelectorAll('span').forEach(el => el.remove());

    const _export_data = TB.getExportData();
    const _xlsx_data = _export_data[_table_to_export].xlsx;
    const _bytes = TB.getFileSize(_xlsx_data.data, _xlsx_data.fileExtension);
    const _readable_size = filesize(_bytes, { output: 'object', fullform: true });
    el.innerHTML = `<span class="if icon ui document-xlsx blue"></span> ${_export_button_title} (${
      _readable_size.value
    }&nbsp;<abbr class="if" title="${humanize(_readable_size.symbol)}">${_readable_size.unit}</abbr>)
`;
    tooltip();
    el.removeEventListener('click', () => {
      handleClick(TB, _table_to_export);
    });
    el.addEventListener('click', () => {
      handleClick(TB, _table_to_export);
    });
  });
};

export default init;
