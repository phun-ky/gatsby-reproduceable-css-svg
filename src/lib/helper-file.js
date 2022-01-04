export const getSize = size => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  for (let i = 1; i < sizes.length; i++) {
    if (size < Math.pow(1024, i)) return Math.round((size / Math.pow(1024, i - 1)) * 100) / 100;
  }
  return size;
};
export const getSizeName = size => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  for (let i = 1; i < sizes.length; i++) {
    if (size < Math.pow(1024, i)) return sizes[i - 1];
  }
  return size;
};
export const getSizeFullName = size => {
  const sizes = [
    'Bytes',
    'Kilobytes',
    'Megabytes',
    'Gigabytes',
    'Terabytes',
    'Petabytes',
    'Exabytes',
    'Zettabytes',
    'Yottabytes'
  ];

  for (let i = 1; i < sizes.length; i++) {
    if (size < Math.pow(1024, i)) return sizes[i - 1];
  }
  return size;
};
