import { globalHistory } from '@reach/router';
import { SizeBreakpointMinMd } from '@ids-core/breakpoint/src/variables/js/variables.esm.js';

import { scrollToSection } from '../lib/helpers';
import expandable from '../lib/expandable';

import rde from '../lib/responsive-examples';
// import wrapCode from '../lib/expandable-code';

const articleEffects = () => {
  import('../lib/iconfilter').then(iconfilter => {
    const onDOMContentLoaded = () => {
      iconfilter.default();
    };

    if (document.readyState === 'loading') {
      document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
      document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    } else {
      // `DOMContentLoaded` already fired
      iconfilter.default();
    }
  });
  import('../lib/help-tooltip');
  import('../lib/info-tooltip');

  import('../lib/video').then(video => {
    video.default();
  });
  import('../lib/dropdown').then(dropdown => {
    dropdown.default();
  });
  import('../lib/tooltip').then(fixAbbr => {
    fixAbbr.default();
  });
  import('../lib/overflow-menu').then(contextualMenu => {
    contextualMenu.default();
  });
  import('../lib/hero').then(hero => {
    hero.default();
  });
  import('../lib/file-upload').then(init => {
    const onDOMContentLoaded = () => {
      init.default();
    };

    if (document.readyState === 'loading') {
      document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
      document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    } else {
      // `DOMContentLoaded` already fired
      init.default();
    }
  });
  import('../lib/crosslinks').then(crosslinks => {
    setTimeout(function () {
      crosslinks.default();

      const expandableCrosslinksThatAreOpen = document.querySelectorAll('.if.disclosure-card.is-expanded');

      expandableCrosslinksThatAreOpen.forEach(crosslink => crosslinks.fixExpandableCrosslinkExamples(crosslink));
    }, 1000);
  });
  import('../lib/onload-article').then(onloadArticle => {
    const onDOMContentLoaded = () => {
      onloadArticle.default();
    };

    if (document.readyState === 'loading') {
      document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
      document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    } else {
      // `DOMContentLoaded` already fired
      onloadArticle.default();
    }
  });

  const mediumMQ = window.matchMedia(`screen and (min-width: ${SizeBreakpointMinMd})`);

  import('../lib/examples').then(examples => {
    const _fix = () => {
      const handleMedium = mql => {
        if (mql.matches) {
          examples.fixScaledExamples();
        } else {
          examples.revertScaledExamples();
        }
      };

      mediumMQ.addListener(handleMedium);

      handleMedium(mediumMQ);
    };

    setTimeout(_fix, 400);
    window.removeEventListener('resize', () => {
      requestAnimationFrame(_fix);
    });
    window.addEventListener('resize', () => {
      requestAnimationFrame(_fix);
    });
  });

  const locationHash = globalHistory.location.hash;

  if (locationHash) {
    const elementToScrollTo = document.getElementById(locationHash.replace('#', ''));

    scrollToSection(elementToScrollTo);
  }

  rde();
  // wrapCode();

  if (globalHistory.location.pathname.indexOf('components') !== -1) {
    import('../lib/toolbox').then(toolbox => {
      toolbox.init();
    });
  }

  expandable();
  import('../lib/data-tables').then(initTableFeatures => {
    initTableFeatures.default();
  });
  import('../lib/popover').then(popover => {
    popover.default();
  });
  import('../lib/autocomplete').then(autocomplete => {
    autocomplete.default();
  });
  import('../lib/slider').then(slider => {
    const onDOMContentLoaded = () => {
      slider.default();
    };

    if (document.readyState === 'loading') {
      document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
      document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    } else {
      // `DOMContentLoaded` already fired
      slider.default();
    }
  });
  import('../lib/global-minimal-header.js').then(MenuToggle => {
    const onDOMContentLoaded = () => {
      document.querySelectorAll('nav .if.change-language').forEach(languageButton => {
        new MenuToggle.default(languageButton);
      });
    };

    if (document.readyState === 'loading') {
      document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
      document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    } else {
      // `DOMContentLoaded` already fired
      onDOMContentLoaded();
    }
  });
};

export default articleEffects;
