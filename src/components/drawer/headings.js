import React from 'react';
import PropTypes from 'prop-types';

import Scroll from '../scroll';
const createHeadingHierarchy = headings => {
  const lowestDepth = Math.min.apply(
    Math,
    headings.map(heading => heading.depth)
  );

  let lastParentIndex = 0;
  let a = [];
  let currentIndex = 0;
  let currentChildIndex = 0;
  let lastChildParentIndex = 0;

  for (let i = 0; i < headings.length; i++) {
    if (headings[i].depth === lowestDepth) {
      lastParentIndex = currentIndex;
      a[currentIndex] = headings[i];
      a[currentIndex].children = [];
      currentIndex++;
    } else {
      if (headings[i].depth === lowestDepth + 1) {
        lastChildParentIndex = currentChildIndex;
        if (a[lastParentIndex]) {
          a[lastParentIndex].children[currentChildIndex] = headings[i];
          a[lastParentIndex].children[currentChildIndex].children = [];

          currentChildIndex++;
        }
      } else {
        a[lastParentIndex].children[lastChildParentIndex].children.push(headings[i]);
      }
    }
  }
  return a;
};

const Headings = ({ headings }) => {
  // console.log(headings);
  if (!headings || (headings && headings.length === 0)) return null;

  const items = createHeadingHierarchy(headings);
  return (
    <div className="if sidebar-menu" role="menu">
      <ul className="if" role="presentation">
        {items.map((heading, index) => {
          const { value, id, children } = heading;
          return (
            <li role="presentation" className="if" key={`key-drawer-navigation-headings-item-${index}`}>
              <Scroll type="id" offset={-104} element={id}>
                <a className="if" role="menuitem" data-scroll-id={id} href={`#${id}`}>
                  {value}
                </a>
              </Scroll>
              {children && children.length !== 0 && (
                <div className="if sidebar-menu" role="menu">
                  <ul className="if" role="presentation">
                    {children.map((heading, index) => {
                      const { value, id, children } = heading;
                      return (
                        <li role="presentation" className="if" key={`key-drawer-navigation-subHeadings-item-${index}`}>
                          <Scroll type="id" offset={-104} element={id}>
                            <a className="if" role="menuitem" data-scroll-id={id} href={`#${id}`}>
                              {value.replace(/(<([^>]+)>)/gi, '')}
                            </a>
                          </Scroll>
                          {children && children.length !== 0 && (
                            <div className="if sidebar-menu" role="menu">
                              <ul className="if" role="presentation">
                                {children.map((heading, index) => {
                                  const { value, id } = heading;
                                  return (
                                    <li
                                      role="presentation"
                                      className="if"
                                      key={`key-drawer-navigation-subsubHeadings-item-${index}`}>
                                      <Scroll type="id" offset={-104} element={id}>
                                        <a role="menuitem" className="if" data-scroll-id={id} href={`#${id}`}>
                                          {value.replace(/(<([^>]+)>)/gi, '')}
                                        </a>
                                      </Scroll>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Headings.propTypes = {
  headings: PropTypes.array
};

export default Headings;
