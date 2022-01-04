import React from 'react';

const Bug = () => {
  const link =
    'https://dev.azure.com/if-it/If%20Design%20Hub/_workItems/create/Bug?[System.Title]=Bug:&[System.Tags]=;&[Microsoft.VSTS.Common.Activity]=Development&[System.Priority]=2&[System.Severity]=3+-+Medium&[System.IterationPath]=If+Design+Hub%5CImplementation';

  return (
    <a className="sg if reportBug-link" rel="noopener noreferrer" target="_blank" href={link}>
      <span className="if icon"></span>Report a bug<span className="if axe sr-only">, Opens in new window</span>
    </a>
  );
};

export default Bug;
