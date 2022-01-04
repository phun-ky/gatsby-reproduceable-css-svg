---
title: 'v14 Release Notes'
hidden: false
studio: true
tags: ['release', 'v14', 'documentation', 'navigation', 'refactoring']
author: 'Alexander Vassbotn Røyne-Helgesen'
authorEmail: 'alexander.royne-helgesen@if.no'
description: 'v14 released 10th of November, and here are the release notes, and any notable changes are described.'
pullRequest: https://dev.azure.com/if-it/If%20Design%20Hub/_git/ids-core/pullrequest/58960
image: ./v14-release.png
teaserImage: ./v14-release.png
---

<div class="if text layout column left">
<p class="if text lead">
The If Design System v14 release includes new navigational structure for the documentation site, quality of life updates for designers and developers, and with low impact design changes, no redesigns are required.
</p>
</div>

### Overview

<div class="if text layout columns">

If Design System v14 focuses on new navigational structure for the documentation site, documentation separation, package separation and quality of life updates for designers and developers. We’ve also updated the spacing guidelines, to keep spacing more predictable.

</div>

#### What’s new

- **Design**:
  - We added new spacing guidelines and removed old spacing tokens
- **Develop**:
  - We removed the usage of `babel`. It is no longer required with [the removal of IE11 support](/blog/v13-release-notes). YMMV, you can bundle source files your self if you want support for outdated browsers
  - Markup change in the [Info Card](/components/cards/info-card) Component, to be able to let the arrow animation on hover to be part of the content flow
  - We eased up on the external link rules, to make it easier to manage
  - Added CDN for [CSS (core)](/develop/frameworks/html-css#cdn), [JS (JavaScript libraries)](/develop/frameworks/javascript#cdn) and [WC (Web Components)](http://localhost:8000/develop/frameworks/webcomponents#cdn) packages
- **Documentation site**:
  - We did some layout adjustments for the documentation site, for a more clean look
  - Improved the search for the documentation
  - Separated out the CSS/JS/WC documentation in a separate page per component. The first page of a component is the design guidelines page
  - New navigational structure for the documentation site. [https://design.if.eu](https://design.if.eu). This makes it easier to navigate to exactly what you want
  - Improved the [Component Status](/resources/status) page on documentation site
- **Components**:
  - [Navigational Cards](/components/cards/navigational-card) of type `text` now has a visual icon instead of arrow for download links and external links
  - Adjusted the [Consent Banner](/components/feedback/consent-banner) component, we made it less obtrusive
  - We renamed the `util`-package to `utils` for all frameworks. See [Utils CSS documentation](/components/utils/css) and [Utils JavaScript documentation](/components/utils/js)
- **Internal**
  - Renamed the `if-design-system`-repository to `ids-core`, to better reflect what it is
  - Changed the `@if-design-system`-scope to `@ids-core`
  - Renamed `if-design-components-javascript`-repository to `ids-js`
  - Changed the `@if-design-components-javascript`-scope to `@ids-js`
    - Moved the JavaScript libraries under the `@if-design-system`-scope to the `@ids-js`-scope
    - Extracted the JavaScript implementation examples to separated, _supported_ packages under the `@ids-js`-scope
  - Added `ids-wc`-repository for our Web Components
    - Moved the Web Components under the `@if-design-system`-scope to the `@ids-wc`-scope
  * Removed old icon category `Social` from the Nucleo JSON file, it has been replaced by `SoMe`
  * Converted and renamed remaining design tokens that used Theo to build them. We are now using Style Dictionary everywhere
  * Upgraded to GatsbyJS v4.0.1

#### What’s not changing

- All components are as is, except from [Info Card](/components/cards/info-card) and [Navigational Card](/components/cards/navigational-card)

### Release FAQs

#### What are the benefits of If Design System v14 for me as a designer?

- Better control over spacing, with the new spacing guidelines

#### What are the benefits of If Design System v14 for me as a developer?

- Quality of life updates such as:
  - JavaScript library packages in separate scope, and is now fully supported
  - Web Component packages in separate scope, and is now fully supported

#### What are the benefits to my external facing users?

- The [Consent Banner](/components/feedback/consent-banner) is less obtrusive

#### Do I need to update right away? If not, when will we need to update?

- If Design System v14 includes functionality that may be a motivator for migration, but teams can migrate to v14 when they have the bandwidth
- Teams that are using v13 today can continue to stay on v13 and everything that is implemented will continue to work

#### What will the If Design System team be supporting for v13?

- No new functionality will be introduced in v13 after the v14 release
- We will continue to address high impact bugs that come up for the v13 release after the v14 release
- We will continue to accept any contributions that look to address issues in the v13 release if we are unable to get to them in time for your sprint

#### What is the rule for supporting deprecated assets?

- Assets that were deprecated from v12 to v13 will be removed in v14
- Assets that are deprecated in v13 will remain in v14 and will be removed in v15. While the timeline of v15 has not been set, the team’s intent is for major versions to be at minimum 3 months apart

#### Will I need to redesign something?

- No, we added new spacing guidelines, and they can be adapted into your designs for your upcoming work

#### How big is the expected effort to migrate code to v14?

- The If Design System team is providing an guide to help with the migration process
- A lot of the changes made will be name-based
- The separation of JavaScript and Web Components requires the install of new packages
