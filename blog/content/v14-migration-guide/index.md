---
title: 'v14 Migration Guide'
hidden: false
studio: false
tags: ['migration', 'v14', 'guide', 'release']
author: 'Alexander Vassbotn Røyne-Helgesen'
authorEmail: 'alexander.royne-helgesen@if.no'
description: 'v14 released 10th of November, and here is the migration guide.'
image: ./F002859-IFS-03447.jpg
teaserImage: ./F002859-IFS-03447.jpg
---

<div class="if alert-banner warning">

This migration guide must be used with the [release notes](/blog/v14-release-notes).

</div>

## Overview

<div class="if text layout column left">

<p class="if text lead">
This guide includes everything you need to migrate from If Design System v13 to v14.
</p>

</div>

### Transitioning to v14

<div class="if text layout column left">

The transition to v14 should be straight forward, since it’s basically a search and replace, some re-installs and minor adjustments to markup.

</div>

<ul class="if cards navigational text two">
  <li class="if">
    <a href="/blog/v13-release-notes" class="if navigational-card text box">
      <span class="if title">Release notes for v13</span>
    </a>
  </li>
  <li class="if">
    <a href="/blog/v12-migration-guide" class="if navigational-card text box">
      <span class="if title">Migration guide for v12</span>
    </a>
  </li>
</ul>

### Feedback

<div class="if text layout column left">

To improve this guide, please contact us on our [MS Teams channel](https://teams.microsoft.com/l/team/19%3a5653139ad54d4f06b340907b42f35aeb%40thread.skype/conversations?groupId=5f5dd61d-c19e-437a-9f65-721db7ef30b7&tenantId=de7e7a67-ae61-49d2-97a7-526c910ad675) or [create an issue](https://dev.azure.com/if-it/If%20Design%20Hub/_boards/board/t/If%20Design%20Hub%20Team/Stories).

</div>

## Design

<div class="if text layout column left">

<p class="if text lead">

The changes from v13 to v14 is mostly internal, but we've added some new spacing guidelines.

</p>

</div>

### Elements

#### Spacing

<div class="if text layout columns left">
<div class="if text body">

We added new spacing guidelines and created a new separate set of spacing tokens. These tokens are only used for spacing (paddings and margins).

Most of the changes are done internally, but if you are using the tokens, here is the token convert table:

</div>
</div>

<div class="if alert-banner">

This conversion table is not ment to be mandatory, but as a helpful guide. <abbr title="Your mileage may vary, as in: things may work differently for each use case">YMMV</abbr> between the contexts

</div>

<table class="if table condensed">
  <thead class="if filled">
          <tr class="if">
            <th class="if" tabindex="0">Previous spacing token</th>
            <th class="if" tabindex="0">New Token</th>
          </tr>
        </thead>
        <tbody class="if">
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="0.125rem">$size-2</code></td>
  <td class="if"><code class="if design-token size" data-value="0.125rem">$size-spacing-2</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="0.25rem">$size-4</code></td>
  <td class="if"><code class="if design-token size" data-value="0.25rem">$size-spacing-4</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="0.5rem">$size-8</code></td>
  <td class="if"><code class="if design-token size" data-value="0.5rem">$size-spacing-8</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="0.75rem">$size-12</code></td>
  <td class="if"><code class="if design-token size" data-value="0.75rem">$size-spacing-12</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="1rem">$size-16</code></td>
  <td class="if"><code class="if design-token size" data-value="1rem">$size-spacing-16</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="1.25rem">$size-20</code></td>
  <td class="if"><code class="if design-token size" data-value="1.5rem">$size-spacing-24</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="1.5rem">$size-24</code></td>
  <td class="if"><code class="if design-token size" data-value="1.5rem">$size-spacing-24</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="1.75rem">$size-28</code></td>
  <td class="if"><code class="if design-token size" data-value="2rem">$size-spacing-32</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="2rem">$size-32</code></td>
  <td class="if"><code class="if design-token size" data-value="2rem">$size-spacing-32</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="2.25rem">$size-36</code></td>
  <td class="if"><code class="if design-token size" data-value="2.5rem">$size-spacing-40</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="2.5rem">$size-40</code></td>
  <td class="if"><code class="if design-token size" data-value="2.5rem">$size-spacing-40</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="2.75rem">$size-44</code></td>
  <td class="if"><code class="if design-token size" data-value="3rem">$size-spacing-48</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="3rem">$size-48</code></td>
  <td class="if"><code class="if design-token size" data-value="3rem">$size-spacing-48</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="3.25rem">$size-52</code></td>
  <td class="if"><code class="if design-token size" data-value="3.5rem">$size-spacing-56</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="3.5rem">$size-56</code></td>
  <td class="if"><code class="if design-token size" data-value="3.5rem">$size-spacing-56</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="3.75rem">$size-60</code></td>
  <td class="if"><code class="if design-token size" data-value="4rem">$size-spacing-64</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="4rem">$size-64</code></td>
  <td class="if"><code class="if design-token size" data-value="4rem">$size-spacing-64</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="4.25rem">$size-68</code></td>
  <td class="if"><code class="if design-token size" data-value="4rem">$size-spacing-64</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="4.5rem">$size-72</code></td>
  <td class="if"><code class="if design-token size" data-value="4rem">$size-spacing-64</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="4.75rem">$size-76</code></td>
  <td class="if"><code class="if design-token size" data-value="4rem">$size-spacing-64</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="5rem">$size-80</code></td>
  <td class="if"><code class="if design-token size" data-value="5.5rem">$size-spacing-88</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="5.25rem">$size-84</code></td>
  <td class="if"><code class="if design-token size" data-value="5.5rem">$size-spacing-88</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="5.5rem">$size-88</code></td>
  <td class="if"><code class="if design-token size" data-value="5.5rem">$size-spacing-88</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="5.75rem">$size-92</code></td>
  <td class="if"><code class="if design-token size" data-value="5.5rem">$size-spacing-88</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="6rem">$size-96</code></td>
  <td class="if"><code class="if design-token size" data-value="5.5rem">$size-spacing-88</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="6.25rem">$size-100</code></td>
  <td class="if"><code class="if design-token size" data-value="7.5rem">$size-spacing-120</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="6.5rem">$size-104</code></td>
  <td class="if"><code class="if design-token size" data-value="7.5rem">$size-spacing-120</code></td>
</tr>
<tr class="if">
  <td class="if"><code class="if design-token size" data-value="7.5rem">$size-120</code></td>
  <td class="if"><code class="if design-token size" data-value="7.5rem">$size-spacing-120</code></td>
</tr>
  </tbody>
</table>

### Design migration strategy

<div class="if text layout column left">

The fastest approach to v14 migration starts with the front-end developer. Developers should update the front end code to v14 and conduct a visual review with team designers. The transition should not cause any major breaks in the UI but there might be some small layout issues. Product teams using v13 components in their code should see a mostly seamless code transition.

Throughout visual review and iteration process, ask:

- Is the spacing between components correct?
- Does the general layout still work, and does it express the If Visual Identity accurately and effectively?

Following this review, work any development and design issues into your team’s planning workflow.

</div>

## Develop

<div class="if text layout column left">

<p class="if text lead">

For v14, we extracted out and separated JavaScript libraries and Web Components into separate repositories and scopes.

</p>

</div>

### Repository architecture

We now have 4 repositories, and 4 scopes:

- ids-core / @ids-core
- ids-js / @ids-js
- ids-wc / @ids-wc
- ids-react / @ids-react

#### Update remotes

<div class="if text layout columns left">
<div class="if text body">

If you've cloned the repositories, please update the remotes:

</div>
</div>

**For Core:**

```bash
git remote set-url origin git@ssh.dev.azure.com:v3/if-it/If%20Design%20Hub/ids-core
```

**For JavaScript libraries:**

```bash
git remote set-url origin git@ssh.dev.azure.com:v3/if-it/If%20Design%20Hub/ids-js
```

**For Web Components:**

```bash
git remote set-url origin git@ssh.dev.azure.com:v3/if-it/If%20Design%20Hub/ids-wc
```

**For React:**

```bash
git remote set-url origin git@ssh.dev.azure.com:v3/if-it/If%20Design%20Hub/ids-react
```

#### Update `.npmrc`

To be able to use the new packages, you need to update your projects `.npmrc`-file:

```ini
; For external packages, i.e. from npmjs.com
registry=https://pkgs.dev.azure.com/if-it/_packaging/common-external-packages/npm/registry/
; For our css components, to be deprecated
@if-design-system:registry=https://pkgs.dev.azure.com/if-it/40e35854-e791-490e-bec8-da33c65c3187/_packaging/if-design-system/npm/registry/
; For our React components, to be deprecated
@if-design-components-react:registry=https://pkgs.dev.azure.com/if-it/40e35854-e791-490e-bec8-da33c65c3187/_packaging/if-design-system/npm/registry/
@ids-js:registry=https://pkgs.dev.azure.com/if-it/40e35854-e791-490e-bec8-da33c65c3187/_packaging/if-design-system/npm/registry/
; For our web components
@ids-wc:registry=https://pkgs.dev.azure.com/if-it/40e35854-e791-490e-bec8-da33c65c3187/_packaging/if-design-system/npm/registry/
; For our css components
@ids-core:registry=https://pkgs.dev.azure.com/if-it/40e35854-e791-490e-bec8-da33c65c3187/_packaging/if-design-system/npm/registry/
; For our react components
@ids-react:registry=https://pkgs.dev.azure.com/if-it/40e35854-e791-490e-bec8-da33c65c3187/_packaging/if-design-system/npm/registry/
; Use this if you still use older versions of the packages
@guybrush:registry=https://waypoint.myget.org/F/relax/auth/f9d9d4a0-b43f-4925-9d6c-424360fbc698/npm/
always-auth=true
```

#### Update dependencies

<div class="if text layout columns left">
<div class="if text body">

And you need to search and replace `@if-design-system/` with `@ids-core/`, in most likely your `package.json`, as example:

</div>
</div>

**From:**

```json
{
  …
  "dependencies": {
    "@if-design-system/button": "…",
  }
  …
}
```

**To:**

```json
{
  …
  "dependencies": {
    "@ids-core/button": "…",
  }
  …
}
```

And then do a reinstall:

```bash
npm i
```

### Components

#### Extracted packages

<div class="if text layout column left">
<div class="if text body">

We've separated out the already existing js and webcomponent packages from `@if-design-system`, now known as `@ids-core`:

</div>
</div>

| From                                          | To                     |
| --------------------------------------------- | ---------------------- |
| `@if-design-system/autocomplete-js`           | `@ids-js/autocomplete` |
| `@if-design-system/tag-js`                    | `@ids-js/tag`          |
| `@if-design-system/util-js`                   | `@ids-js/utils`        |
| `@if-design-system/datepicker-js`             | `@ids-js/datepicker`   |
| `@if-design-system/datepicker-webcomponent`   | `@ids-wc/datepicker`   |
| `@if-design-system/faq-webcomponent`          | `@ids-wc/faq`          |
| `@if-design-system/modal-webcomponent`        | `@ids-wc/modal`        |
| `@if-design-system/phonenumber-webcomponent`  | `@ids-wc/phonenumber`  |
| `@if-design-system/toast-webcomponent`        | `@ids-wc/toast`        |
| `@if-design-system/help-tooltip-webcomponent` | `@ids-wc/help-tooltip` |

#### Info Card markup change

<div class="if text layout columns left">
<div class="if text body">

To be able to let the arrow animation effect on hover for Info Card as links and to let the arrows be a part of the content flow so we could align the content better, we altered the markup accordingly:

</div>
</div>

##### From

```html
<ul class="if cards info three">
  <li class="if">
    <a href="#" target="_blank" class="if info-card">
      <span class="if title number"> 20% </span>
      <span class="if text">When you buy insurance online</span>
      <span class="if link">Calculate your price<span className="if axe sr-only">, Opens in new window</span></span>
    </a>
  </li>
  …
</ul>
```

##### To

```diff-html
<ul class="if cards info three">
  <li class="if">
    <a href="#" target="_blank" class="if info-card">
      <span class="if title number"> 20% </span>
      <span class="if text">When you buy insurance online</span>
      <span class="if link">Calculate your price<span className="if axe sr-only">, Opens in new window</span></span>
+      <span class="if arrow-animation"></span>
    </a>
  </li>
  …
</ul>
```

#### Token renaming

<div class="if text layout columns left">
<div class="if text body">

We renamed some internal design tokens that might be used externally:

</div>
</div>

##### Core

| From                  | To                              |
| --------------------- | ------------------------------- |
| `$baseline-grid`      | `$layout-grid-baseline-low`     |
| `$baseline-grid-px`   | `$layout-grid-baseline-high`    |
| `$baseline-grid-8`    | `$layout-grid-baseline-low-px`  |
| `$baseline-grid-8-px` | `$layout-grid-baseline-high-px` |

##### Grid

| From                               | To                                      |
| ---------------------------------- | --------------------------------------- |
| `$grid-gutter-width`               | `$size-grid-gutter-width`               |
| `$grid-gutter-half-width`          | `$size-grid-gutter-half-width`          |
| `$grid-gutter-half-width-negative` | `$size-grid-gutter-half-width-negative` |
| `$grid-number-of-columns`          | `$size-grid-columns`                    |

#### Spacing

<div class="if text layout columns left">
<div class="if text body">

We added new spacing guidelines and created a new separate set of spacing tokens. These tokens are only used for spacing (paddings and margins).

Most of the changes are done internally, but if you are using the tokens, see the token conversion table above.

</div>
</div>
