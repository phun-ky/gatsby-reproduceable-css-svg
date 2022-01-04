/* eslint no-console: 0 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import articleEffects from '../effects/article';
import debounce from '../lib/debounce';
import '../lib/devices.css';
import '@phun-ky/speccer/speccer.css';

const Article = ({ children, fullPage }) => {
  let speccerEventFunc;
  let tabsEventFunc;
  let cardResizeEventFunc;

  useEffect(articleEffects);

  useEffect(() => {
    (async () => {
      const { default: init } = await import('../lib/relative-date');

      init();
    })();

    import('../lib/datepicker.js');
    import('../lib/phonenumber-webcomponent.umd.js');
  });
  useEffect(() => {
    import('@phun-ky/speccer/src/index.js').then(speccerScript => {
      console.info('[@phun-ky/speccer]: Activated speccer ');

      const { anatomy, speccer, specElement, measureElement, dissectElement, specTypographyElement } = speccerScript;
      const specElementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            specElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      document.querySelectorAll('[data-speccer],[data-speccer] *:not(td)').forEach(el => {
        specElementObserver.observe(el);
      });

      const specTypographyElementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            specTypographyElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      document.querySelectorAll('[data-speccer-typography]').forEach(el => {
        specTypographyElementObserver.observe(el);
      });

      const measureElementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            measureElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      document.querySelectorAll('[data-speccer-measure]').forEach(el => {
        measureElementObserver.observe(el);
      });

      const dissectElementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          const targets = entry.target.querySelectorAll('[data-anatomy]');

          if (entry.intersectionRatio > 0) {
            targets.forEach(dissectElement);
            observer.unobserve(entry.target);
          }
        });
      });
      const observeAnatomySections = section => {
        dissectElementObserver.observe(section);
      };

      document.querySelectorAll('[data-anatomy-section]').forEach(observeAnatomySections);

      speccerEventFunc = debounce(function () {
        console.info('[@phun-ky/speccer]: Event resize triggered');
        speccer();
        anatomy();
      }, 300);

      window.addEventListener('resize', speccerEventFunc);
    });
  }, []);
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.offsetWidth;

    document.documentElement.style.setProperty('--ids-scrollbar-width', `${scrollbarWidth}px`);

    import('../lib/export-table').then(exportTable => {
      exportTable.default();
    });
    import('../lib/tabs').then(tabs => {
      tabs.default();

      tabsEventFunc = debounce(function () {
        tabs.default();
      }, 300);

      window.addEventListener('resize', tabsEventFunc);
    });

    import('../lib/card').then(setCardsImageHeight => {
      setCardsImageHeight.default();

      cardResizeEventFunc = debounce(function () {
        setCardsImageHeight.default();
      }, 300);

      window.addEventListener('resize', cardResizeEventFunc);
    });
  });

  useEffect(() => {
    (async () => {
      const { default: initChart, charts } = await import('../lib/charts');
      const chartElementsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            console.log(`[IDS][data-visualization]: Creating chart with id: ${entry.target.id}`);

            requestAnimationFrame(function () {
              initChart(entry.target.id);
            });
          } else {
            if (charts[entry.target.id]) {
              console.log(`[IDS][data-visualization]: Destroying chart with id: ${entry.target.id}`);
              try {
                charts[entry.target.id].destroy();
                delete charts[entry.target.id];
              } catch (e) {
                console.log(`[IDS][data-visualization]: Chart with id: ${entry.target.id} not destroyed successfully`);
              }
            }
          }
          //          observer.unobserve(entry.target);
        });
      });
      const observeAnatomySections = section => {
        chartElementsObserver.observe(section);
      };

      document.querySelectorAll('div[id].if.visualization.chart').forEach(observeAnatomySections);
      //
      // initChartExamples();
    })();
  });

  useEffect(() => {
    return () => {
      (async () => {
        const { charts } = await import('../lib/charts');

        try {
          Object.keys(charts).forEach(chartKey => {
            charts[chartKey].destroy();
            delete charts[chartKey];
          });
        } catch (e) {
          console.log('[IDS][data-visualization]: Charts not destroyed successfully');
        }
      })();
    };
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', speccerEventFunc);
      window.removeEventListener('resize', tabsEventFunc);
      window.removeEventListener('resize', cardResizeEventFunc);
    };
  }, []);

  const classNames = cx('sg documentation', {
    'is-full-page': fullPage
  });

  return (
    <article className={classNames} id="content">
      {children}
    </article>
  );
};

Article.propTypes = {
  children: PropTypes.node,
  fullPage: PropTypes.bool
};

export default Article;
