---
title: 'v12 Migration Guide'
hidden: false
studio: true
tags: ['migration', 'v12', 'guide', 'release']
author: 'Alexander Vassbotn Røyne-Helgesen'
authorEmail: 'alexander.royne-helgesen@if.no'
description: 'v12 released 5th of May, and here is the migration guide.'
image: ./migration-guide.png
teaserImage: ./migration-guide.png
---

<div class="if alert-banner warning">

This migration guide must be used with the [release notes](/blog/v12-release-notes).

</div>

### Components

In general:

- Reinstall the components individually if you have cherry picked them
- Update the classnames (and JavaScript) in the HTML.
- Update the import path if you import the components

For example:

```less
@import '@if-design-system/dropdown/src/dropdown.less';
```

```diff
-@import '@if-design-system/dropdown/src/dropdown.less';
+@import '@if-design-system/dropdown-select/src/dropdown-select.less';
```

This method works for most of the changed components. Although, there are some components that need specific attention.

#### Selection controls

The Selection Controls component has been removed and replaced with separate components for [Radio button](/components/radio-button), [Checkbox](/components/inputs/checkbox) and [Toggle](/components/inputs/toggle).

```less
@import '@if-design-system/selection-controls/src/selection-controls.less';
```

```diff
-@import '@if-design-system/selection-controls/src/selection-controls.less';
+@import '@if-design-system/radio-button/src/radio-buttons.less';
+@import '@if-design-system/checkbox/src/checkbox.less';
+@import '@if-design-system/toggle/src/toggle.less';
```

#### Studio Crosslinks and Teasers

These two has been merged into Navigational Card. The markup for these components has been updated. Please see [the implementation documentation](/components/cards/navigational-card).

##### Studio crosslinks

```html
<a class="if crosslink studio" href="/asd">
  <img
    class="if image"
    src="https://if-design-cdn.azureedge.net/images/documentation/studio/If-studio-documents-IFS-04772_PNG.PNG"
  />
  <p class="if text lead">
    <span class="if"
      >Asiakaspalvelu<span class="if inline-nowrap"><span class="if arrow"></span></span
    ></span>
  </p>
  <p class="if text meta">Asiakaspalvelu ja yhteystiedot</p>
</a>
```

With:

```less
// For studio crosslinks
@import '@if-design-system/crosslinks/src/crosslinks.less';
```

Is changed to:

```html
<a class="if navigational-card" href="/asd">
  <img
    class="if image"
    src="https://if-design-cdn.azureedge.net/images/documentation/studio/If-studio-documents-IFS-04772_PNG.PNG"
  />
  <span class="if title">
    Asiakaspalvelu<span class="if inline-nowrap">&#xfeff;<span class="if icon ui arrow-right"></span></span>
  </span>
  <span class="if text">Asiakaspalvelu ja yhteystiedot</span>
</a>
```

With:

```diff
// For studio crosslinks
-@import '@if-design-system/crosslinks/src/crosslinks.less';
+@import '@if-design-system/navigational-card/src/navigational-card.less';
```

##### Teasers

```html
<ul class="if teasers">
  <li class="if teaser">
    <img src="https://v.imgi.no/6bmln7xatt-MOODBOARD/2042" class="if image" />
    <span class="if heading smallest">Hemförsäkring</span>
    <p class="if">
      When it came near enough he perceived that it was not grass; there were no blades, but only purple roots. The
      roots were revolving, for each small plant in the whole patch, like the spokes of a rimless wheel.
    </p>
    <a href="/aasd" class="if standalone">Till hemsförsäkringar</a>
  </li>
</ul>
```

With:

```less
// For lifestyle teasers
@import '@if-design-system/teasers/src/teasers.less';
```

Is changed to:

```html
<ul class="if cards navigational lifestyle">
  <li class="if">
    <a href="/asdsadsa" class="if navigational-card lifestyle">
      <span class="if image"><img src="https://v.imgi.no/6bmln7xatt-MOODBOARD/2042" class="if"/></span>
      <span class="if title">
        Hemförsäkring<span class="if inline-nowrap"
          >&#xfeff;<span class="if icon ui arrow-right"></span
        ></span>
      </span>

      <span class="if text">
      When it came near enough he perceived that it was not grass; there were no blades, but only purple roots. The
      roots were revolving, for each small plant in the whole patch, like the spokes of a rimless wheel.
      </span>
    </a>
  </li>
</ol>
```

With:

```diff
// For lifestyle teasers
-@import '@if-design-system/teasers/src/teasers.less';
+@import '@if-design-system/navigational-card/src/navigational-card.less';
```

#### Menu to new Menu components

Before, it was sufficient to do this with menus, only denoting on the top level element which menu it was:

```html
<nav class="if menu accordion">
  <ul class="if">
    <li class="if">
      <a class="if">…</a>
      <div class="if menu">…</div>
    </li>
  </ul>
</nav>
```

With:

```less
@import '@if-design-system/menu/src/menu.less';
```

Now, for each new menu, you have to be very specific with which type of menu it is PER level:

```html
<nav class="if accordion-menu">
  <ul class="if">
    <li class="if">
      <a class="if">…</a>
      <div class="if accordion-menu">…</div>
    </li>
  </ul>
</nav>
```

```diff
- <nav class="if menu accordion">
+ <nav class="if accordion-menu">
    …
     …
      …
-      <div class="if menu">
+      <div class="if accordion-menu">

```

With:

```diff
-@import '@if-design-system/menu/src/menu.less';
+@import '@if-design-system/accordion-menu/src/accordion-menu.less';
+@import '@if-design-system/tooltip-menu/src/tooltip-menu.less';
+@import '@if-design-system/dropdown-menu/src/dropdown-menu.less';
+@import '@if-design-system/sidebar-menu/src/sidebar-menu.less';
+@import '@if-design-system/contextual-menu/src/contextual-menu.less';
```

### Design Tokens

The Design Tokens have changed to new naming. This is "just a search and replace" change, but the new generated files is located in different folders, so you need to update your references.

#### Renaming

Example:

```scss
$color-lightestBeige-text
$font-size-18
```

Is renamed to:

```scss
$color-text-lightest-beige
$size-font-18
```

#### References

In this Button component example, you will see what needs to be updated:

##### Stylus

```stylus
@require '@if-design-system/core/src/scaffolding.styl'
@require '@if-design-system/color/src/variables/stylus/variables.styl'
@require '@if-design-system/utils/src/variables/stylus/variables.styl'
@require '@if-design-system/utils/src/mixins/utils.styl'
@require '@if-design-system/breakpoint/src/variables/stylus/variables.styl'
@require '@if-design-system/breakpoint/src/mixins/breakpoint.styl'
@require '@if-design-system/typography/src/variables/stylus/variables.styl'
@require '@if-design-system/typography/src/font-face.styl'
@require '@if-design-system/typography/src/mixins/typography.styl'
```

```diff
@require '@if-design-system/core/src/scaffolding.styl'
-@require '@if-design-system/color/src/color-variables.styl'
+@require '@if-design-system/color/src/variables/stylus/variables.styl'
-@require '@if-design-system/utils/src/variables.styl'
+@require '@if-design-system/utils/src/variables/stylus/variables.styl'
@require '@if-design-system/utils/src/mixins/utils.styl'
-@require '@if-design-system/breakpoint/src/breakpoint-variables.styl'
+@require '@if-design-system/breakpoint/src/variables/stylus/variables.styl'
-@require '@if-design-system/breakpoint/src/variables.styl'
@require '@if-design-system/breakpoint/src/mixins/breakpoint.styl'
-@require '@if-design-system/typography/src/typography-variables.styl'
+@require '@if-design-system/typography/src/variables/stylus/variables.styl'
@require '@if-design-system/typography/src/font-face.styl'
@require '@if-design-system/typography/src/mixins/typography.styl'
```

##### SCSS

```scss
@import '@if-design-system/core/src/scaffolding.scss';
@import '@if-design-system/color/src/variables/scss/variables.scss';
@import '@if-design-system/utils/src/variables/scss/variables.scss';
@import '@if-design-system/utils/src/mixins/utils.scss';
@import '@if-design-system/breakpoint/src/variables/scss/variables.scss';
@import '@if-design-system/breakpoint/src/mixins/breakpoint.scss';
@import '@if-design-system/typography/src/variables/scss/variables.scss';
@import '@if-design-system/typography/src/font-face.scss';
@import '@if-design-system/typography/src/mixins/typography.scss';
```

```diff
@import '@if-design-system/core/src/scaffolding.scss';
-@import '@if-design-system/color/src/color-variables.scss';
+@import '@if-design-system/color/src/variables/scss/variables.scss';
-@import '@if-design-system/utils/src/variables.scss';
+@import '@if-design-system/utils/src/variables/scss/variables.scss';
@import '@if-design-system/utils/src/mixins/utils.scss';
-@import '@if-design-system/breakpoint/src/breakpoint-variables.scss';
+@import '@if-design-system/breakpoint/src/variables/scss/variables.scss';
-@import '@if-design-system/breakpoint/src/variables.scss';
@import '@if-design-system/breakpoint/src/mixins/breakpoint.scss';
-@import '@if-design-system/typography/src/typography-variables.scss';
+@import '@if-design-system/typography/src/variables/scss/variables.scss';
@import '@if-design-system/typography/src/font-face.scss';
@import '@if-design-system/typography/src/mixins/typography.scss';
```

##### LESS

```less
@import '@if-design-system/core/src/scaffolding.less';
@import '@if-design-system/color/src/variables/less/variables.less';
@import '@if-design-system/utils/src/variables/less/variables.less';
@import '@if-design-system/utils/src/mixins/utils.less';
@import '@if-design-system/breakpoint/src/variables/less/variables.less';
@import '@if-design-system/breakpoint/src/mixins/breakpoint.less';
@import '@if-design-system/typography/src/variables/less/variables.less';
@import '@if-design-system/typography/src/font-face.less';
@import '@if-design-system/typography/src/mixins/typography.less';
```

```diff
@import '@if-design-system/core/src/scaffolding.less';
-@import '@if-design-system/color/src/color-variables.less';
+@import '@if-design-system/color/src/variables/less/variables.less';
-@import '@if-design-system/utils/src/variables.less';
+@import '@if-design-system/utils/src/variables/less/variables.less';
@import '@if-design-system/utils/src/mixins/utils.less';
-@import '@if-design-system/breakpoint/src/breakpoint-variables.less';
+@import '@if-design-system/breakpoint/src/variables/less/variables.less';
-@import '@if-design-system/breakpoint/src/variables.less';
@import '@if-design-system/breakpoint/src/mixins/breakpoint.less';
-@import '@if-design-system/typography/src/typography-variables.less';
+@import '@if-design-system/typography/src/variables/less/variables.less';
@import '@if-design-system/typography/src/font-face.less';
@import '@if-design-system/typography/src/mixins/typography.less';
```

### Mixins

To migrate to the new mixins, you "just need to search and replace":

Example:

```diff
-ifPaddingHorizontal
+IDS_UTIL_Padding_Horizontal
```

#### Icons

We have removed the need of the prefixed `-` for Stylus mixins:

```stylus
-if-icon-ui-close()
```

```stylus
IDS_ICONS_Icon_Ui_Close()
```
