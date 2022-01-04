export const getDataResponsiveId = id => {
  if (id.indexOf('desktop') !== -1) {
    return id.replace('-responsive-desktop', '');
  } else if (id.indexOf('mobile') !== -1) {
    return id.replace('-responsive-mobile', '');
  } else if (id.indexOf('tablet-landscape') !== -1) {
    return id.replace('-responsive-tablet-landscape', '');
  } else if (id.indexOf('tablet-portrait') !== -1) {
    return id.replace('-responsive-tablet-portrait', '');
  }
};
