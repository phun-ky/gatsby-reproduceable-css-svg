import React from 'react';
import PropTypes from 'prop-types';

const PackageLinks = ({ pkg, componentName }) => {
  return (
    <>
      <a
        href={`${pkg.repository.url}`}
        className="if button text"
        target="_blank"
        style={{
          margin: 0
        }}
        rel="noreferrer">
        <span
          className="if icon ui"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 49 49%27%3E%3Cpath fill=%27%23BC3200%27 d=%27M37.24.342H12.327c-.96 0-1.733.772-1.733 1.733v5.676h28.38V2.075A1.73 1.73 0 0 0 37.24.342z%27/%3E%3Cpath fill=%27%23D13600%27 d=%27M40.173 3.809H9.397A2.503 2.503 0 0 0 6.89 6.315v1.97h35.788v-1.97a2.503 2.503 0 0 0-2.506-2.506z%27/%3E%3Cpath fill=%27%23E15815%27 d=%27M43.779 7.365H5.791a2.503 2.503 0 0 0-2.506 2.506v35.68a2.52 2.52 0 0 0 2.516 2.516H43.77a2.52 2.52 0 0 0 2.516-2.516V9.871a2.503 2.503 0 0 0-2.506-2.506z%27/%3E%3Cpath fill=%27%23FFB290%27 d=%27M15.974 11.04a4.777 4.777 0 0 0-4.775 4.774 4.777 4.777 0 0 0 4.775 4.774 4.777 4.777 0 0 0 4.774-4.775 4.777 4.777 0 0 0-4.774-4.774zm0 7.864a3.099 3.099 0 0 1-3.1-3.1c0-1.714 1.386-3.1 3.1-3.1 1.713 0 3.1 1.386 3.1 3.1 0 1.713-1.387 3.1-3.1 3.1z%27/%3E%3Cpath fill=%27%23FFB290%27 d=%27M17.767 20.074H14.23v9.678h3.537v-9.678z%27/%3E%3Cpath fill=%27%23FFDBCA%27 d=%27M38.65 15.884a4.777 4.777 0 0 0-4.775-4.775 4.777 4.777 0 0 0-4.775 4.775 4.779 4.779 0 0 0 3.061 4.457v3.28l-17.929 5.923h-.03v6.072a4.776 4.776 0 0 0-2.991 4.428 4.777 4.777 0 0 0 4.774 4.774 4.777 4.777 0 0 0 4.775-4.774 4.788 4.788 0 0 0-2.922-4.408V31.87l17.83-5.893-.04-.07h.04v-5.606a4.768 4.768 0 0 0 2.981-4.418zm-19.574 24.17c0 1.713-1.387 3.1-3.1 3.1a3.099 3.099 0 0 1-3.1-3.1 3.098 3.098 0 0 1 3.1-3.101c1.713 0 3.1 1.387 3.1 3.1zm14.799-21.08a3.099 3.099 0 0 1-3.1-3.1c0-1.714 1.386-3.1 3.1-3.1 1.714 0 3.1 1.386 3.1 3.1 0 1.714-1.396 3.1-3.1 3.1z%27/%3E%3C/svg%3E\')'
          }}></span>
        View repository<span className="if axe sr-only">, Opens in new window</span>
      </a>
      <a
        href={`https://dev.azure.com/if-it/If%20Design%20Hub/_packaging?_a=package&feed=if-design-system&package=%40ids-js%2F${componentName}&protocolType=Npm`}
        className="if button text"
        target="_blank"
        style={{
          margin: 0
        }}
        rel="noreferrer">
        <span
          className="if icon ui"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 49 49%27%3E%3Cpath fill=%27%23B41055%27 d=%27M18.465 48.656H2.402a2.103 2.103 0 0 1-2.093-2.104V26.75c0-1.16.942-2.094 2.093-2.094h16.063v24z%27/%3E%3Cpath fill=%27%23E86299%27 d=%27M46.255 48.656H39.45v-24h6.806c1.131 0 2.054.923 2.054 2.055V46.6a2.058 2.058 0 0 1-2.054 2.055z%27/%3E%3Cpath fill=%27%23F173A7%27 d=%27M18.613 48.656h21.768v-24H16.39v21.777c0 1.22.992 2.223 2.222 2.223z%27/%3E%3Cpath fill=%27%23C12664%27 d=%27M38.199.656H10.657c-1.19 0-2.153.963-2.153 2.154v21.846h31.848V2.81A2.151 2.151 0 0 0 38.199.656z%27/%3E%3Cpath fill=%27%23CF3071%27 d=%27M32.365.656H10.657c-1.19 0-2.153.963-2.153 2.154v21.846h23.861v-24z%27/%3E%3Cpath fill=%27%23B5205C%27 d=%27M22.522 8.597h-4.167a1.99 1.99 0 0 1-1.984-1.985 1.99 1.99 0 0 1 1.984-1.985h4.167a1.984 1.984 0 1 1 0 3.97z%27/%3E%3Cpath fill=%27%23FE90BE%27 d=%27M32.313 38.64H20.438v2.035h11.876v-2.034zm-5.119 4.042h-6.756v2.034h6.756v-2.034z%27/%3E%3Cpath fill=%27%23CB2E6F%27 d=%27M30.382 32.715h-3.959a2.063 2.063 0 0 1-2.064-2.065c0-1.141.923-2.064 2.064-2.064h3.959c1.14 0 2.063.923 2.063 2.065a2.063 2.063 0 0 1-2.063 2.064z%27/%3E%3Cpath fill=%27%23900740%27 d=%27M14.276 32.715h-3.958a2.063 2.063 0 0 1-2.064-2.065c0-1.141.923-2.064 2.064-2.064h3.958c1.141 0 2.064.923 2.064 2.065a2.063 2.063 0 0 1-2.064 2.064z%27/%3E%3C/svg%3E")'
          }}></span>
        View package<span className="if axe sr-only">, Opens in new window</span>
      </a>
    </>
  );
};

export default PackageLinks;

PackageLinks.propTypes = {
  pkg: PropTypes.shape(),
  componentName: PropTypes.string
};
