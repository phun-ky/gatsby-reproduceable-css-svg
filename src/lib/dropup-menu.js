/*
prior art: https://github.com/kamens/jQuery-menu-aim
*/

class Menu {
  /**
   *
   * @param {Element} menuItemHolder
   * @param {Element} controllerNode
   * @param {MenuToggle} topMostParent
   */
  constructor(menuItemHolder, controllerNode, topMostParent) {
    this.bindMethods(this);
    /**
     * @type {String}
     */
    this.IS_OPEN_TOGGLE_CLASS = 'is-open';
    /**
     * @type {String}
     */
    this.IS_ACTIVE_TOGGLE_CLASS = 'is-active';
    /**
     * @type {Number}
     */
    this.SUB_MENU_MOUSEOVER_TOLERANCE = 75;
    /**
     * @type {Number}
     */
    this.MOUSE_LOCS_TRACKED = 3; // number of past mouse locations to track
    /**
     * @type {Number}
     */
    this.DELAY = 300;

    this.keyCode = Object.freeze({
      TAB: 'Tab',
      RETURN: 'Enter',
      ESC: 'Escape',
      SPACE: 'Space',
      PAGEUP: 'PageUp',
      PAGEDOWN: 'PageDown',
      END: 'End',
      HOME: 'Home',
      LEFT: 'ArrowLeft',
      UP: 'ArrowUp',
      RIGHT: 'ArrowRight',
      DOWN: 'ArrowDown'
    });
    this.topMostParent = topMostParent;
    /**
     * @type {Element}
     */
    this.menuItemHolder = menuItemHolder;
    /**
     * @type {Element}
     */
    this.menuItemList = menuItemHolder.querySelector('ul');
    this.timeoutId = null;
    this.lastDelayLoc = null;
    this.mouseLocs = [];
    this.activeMenuItem = null;
    this.activeSubMenu = null;
    this.currentMenuItem = null;
    /**
     * @type {Element}
     */
    this.controllerNode = controllerNode;
    /**
     * @type { Object.<string, number> }
     */
    this.indexOfMenuItemStartingWithChar = {};
    /**
     * @type { Object.<string, SubMenu> }
     */
    this.subMenuIndexItems = {};
    /**
     * @type {Element[]}
     */
    this.menuItems = this.initializeMenuItems(menuItemHolder.querySelector('ul').children);
    /**
     * @type {Boolean}
     */
    this.isOpen = false;
    this.firstMenuItemIndex = 0;
    this.lastMenuItemIndex = this.menuItems.length - 1;
    this.previouslyFocusedItemIndex = null;

    this.menuItemList.addEventListener('mouseleave', this.handleMouseLeave);
  }

  /**
   * @private
   * @param {this} self
   */
  bindMethods(self) {
    self.initializeMenuItems = self.initializeMenuItems.bind(self);
    self.registerMenuItemStartingCharacter = self.registerMenuItemStartingCharacter.bind(self);
    self.isTextualCharacter = self.isTextualCharacter.bind(self);
    self.getIndexOfMenuItemStartingWithChar = self.getIndexOfMenuItemStartingWithChar.bind(self);
    self.menuItemHasSubMenu = self.menuItemHasSubMenu.bind(self);
    self.menuItemHasParentMenu = self.menuItemHasParentMenu.bind(self);
    self.removeFocusFromCurrent = self.removeFocusFromCurrent.bind(self);
    self.focusMenuItem = self.focusMenuItem.bind(self);
    self.focusMenuItemStartingWithChar = self.focusMenuItemStartingWithChar.bind(self);
    self.closeAnyOpenSubMenu = self.closeAnyOpenSubMenu.bind(self);

    self.isMenuItemFocusable = self.isMenuItemFocusable.bind(self);
    self.focusFirstItem = self.focusFirstItem.bind(self);
    self.focusLastItem = self.focusLastItem.bind(self);
    self.focusNextItem = self.focusNextItem.bind(self);
    self.logMouseMovement = self.logMouseMovement.bind(self);
    self.focusPreviousItem = self.focusPreviousItem.bind(self);
    self.openMenu = self.openMenu.bind(self);
    self.closeMenu = self.closeMenu.bind(self);
    self.keyDownHandler = self.keyDownHandler.bind(self);
  }

  /**
   * @description Keep track of the last few locations of the mouse.
   *
   * @param {MouseEvent} e
   */
  logMouseMovement(e) {
    this.mouseLocs.push({ x: e.pageX, y: e.pageY });

    if (this.mouseLocs.length > this.MOUSE_LOCS_TRACKED) {
      this.mouseLocs.shift();
    }
  }

  /**
   * @description Activate a menu row.
   *
   * @param {Element} menuItem the menu item to activate the subMenu from
   * @param {Number} subMenuIndex The index of the subMenu to use
   */
  activate(menuItem, subMenuIndex) {
    if (menuItem == this.activeMenuItem) {
      return;
    }

    if (this.activeSubMenu) {
      this.activeSubMenu.closeSubMenu();
    }

    this.activeMenuItem = menuItem;

    this.activeSubMenu = this.subMenuIndexItems[`${subMenuIndex}`];

    if (this.activeSubMenu) {
      this.activeSubMenu.openSubMenu();
      this.activeSubMenu.focusFirstSubMenuItem();
    }
  }

  /**
   * @description Trigger a possible row activation whenever entering a new row.
   *
   * @param {MouseEvent} e
   * @param {number} index The index of the current subMenu
   */
  handleMouseEnterMenuItem(e, index) {
    const _menu_item = e.target;

    if (this.timeoutId) {
      // Cancel any previous activation delays
      clearTimeout(this.timeoutId);
    }

    this.possiblyActivate(_menu_item, index);
  }

  /**
   * @private
   */
  handleMouseLeaveMenuItem() {
    //    console.log('handleMouseLeaveMenuItem');
  }
  /**
   * @description Cancel possible menu activations when leaving the menu entirely
   */
  handleMouseLeave() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.activeMenuItem = null;
    this.activeSubMenu = null;
  }

  /**
   * @private
   * @description Initialize each menu item:
   *
   * - assign event handlers,
   * - initialize SubMenu if menu item has one.
   *
   * @param {HTMLCollection} menuItemElementList
   * @returns {Element[]}
   */
  initializeMenuItems(menuItemElementList) {
    return Array.from(menuItemElementList)
      .filter(menuItem => this.isMenuItemFocusable(menuItem))
      .map((menuItem, index) => {
        menuItem.addEventListener('keydown', this.keyDownHandler);
        menuItem.addEventListener('mouseenter', event => {
          this.handleMouseEnterMenuItem(event, index);
        });
        this.registerMenuItemStartingCharacter(menuItem, index);

        if (this.menuItemHasSubMenu(menuItem)) {
          this.registerSubMenuItemAtIndex(menuItem, index);
        }

        return menuItem;
      });
  }

  /**
   * @description Possibly activate a submenu. If mouse movement indicates that we
   * shouldn't activate yet because user may be trying to enter
   * a submenu's content, then delay and check again later.
   *
   * @param {Element} menuItem the menu item to activate the subMenu from
   * @param {Number} subMenuIndex The index of the subMenu to use
   */
  possiblyActivate(menuItem, subMenuIndex) {
    const _delay = this.activationDelay(menuItem);

    if (_delay) {
      this.timeoutId = setTimeout(
        function () {
          this.possiblyActivate(menuItem);
        }.bind(this),
        _delay
      );
    } else {
      this.activate(menuItem, subMenuIndex);
    }
  }

  /**
   * @private
   * @param {Element} menuItem
   * @param {number} index
   */
  registerSubMenuItemAtIndex(menuItem, index) {
    this.subMenuIndexItems[`${index}`] = new SubMenu(menuItem, this.topMostParent);
  }

  /**
   * @private
   * @description Register starting character of each menu item
   * for easier referencing later on
   *
   * @param {Element} menuItem
   * @param {number} index
   */
  registerMenuItemStartingCharacter(menuItem, index) {
    try {
      const str = menuItem.textContent.trim().substring(0, 1).toLowerCase();

      this.indexOfMenuItemStartingWithChar[str] = index;
    } catch (e) {
      // console.warn('Impossible to evaluate given value, ', e);
    }
  }

  /**
   * @private
   * @description Check whether provided string is a single, printable character
   *
   * @param {string} str
   * @returns {boolean}
   */
  isTextualCharacter(str) {
    return typeof str === 'string' && str.length === 1 && str.match(/\S/);
  }

  /**
   * @private
   * @description Get index of menu item, which starts with a given string
   *
   * @param {string} character
   * @returns {number | null}
   */
  getIndexOfMenuItemStartingWithChar(character) {
    const found = this.indexOfMenuItemStartingWithChar[character.toLowerCase()];

    return found >= 0 ? found : null;
  }

  /**
   * @private
   * @description Check whether currently focused menu item has submenu
   *
   * @param {Element} menuItem
   * @returns {boolean}
   */
  menuItemHasSubMenu(menuItem, keyCode) {
    const _sub_menu_el = Array.from(menuItem.children).find(c => c.classList.contains('dropdown-menu'));
    const _has_sub_menu = !!_sub_menu_el;

    if (!_has_sub_menu) return false;

    if (keyCode === this.keyCode.LEFT) {
      if (_sub_menu_el.classList.contains('left') || menuItem.classList.contains('left')) {
        return true;
      } else {
        return false;
      }
    }

    if (keyCode === this.keyCode.RIGHT) {
      if (
        _sub_menu_el.classList.contains('right') ||
        (menuItem.classList.contains('right') &&
          (!_sub_menu_el.classList.contains('left') || !menuItem.classList.contains('left')))
      ) {
        return true;
      } else {
        return false;
      }
    }

    return _has_sub_menu;
  }
  /**
   * @private
   * @description Check whether currently focused menu item has a parent menu. We also check which direction the menu is.
   *
   * @param {Element} menuItem
   * @param {String} keyCode
   * @returns {boolean}
   */
  menuItemHasParentMenu(menuItem, keyCode) {
    const _current_menu_holder_el = menuItem.closest('.dropdown-menu');

    if (!_current_menu_holder_el) return false;

    const _parent_menu_holder_el = _current_menu_holder_el.closest('li');

    if (!_parent_menu_holder_el) return false;

    if (keyCode === this.keyCode.RIGHT) {
      if (_parent_menu_holder_el.classList.contains('left') || _current_menu_holder_el.classList.contains('left')) {
        return true;
      } else {
        return false;
      }
    }

    if (keyCode === this.keyCode.LEFT) {
      if (
        _parent_menu_holder_el.classList.contains('right') ||
        (_current_menu_holder_el.classList.contains('right') &&
          (!_parent_menu_holder_el.classList.contains('left') || !_current_menu_holder_el.classList.contains('left')))
      ) {
        return true;
      } else {
        return false;
      }
    }

    if (_parent_menu_holder_el) return true;

    return false;
  }

  /**
   * @private
   * @description Set tabindex attribute to -1 on currently focused item
   */
  removeFocusFromCurrent() {
    if (this.previouslyFocusedItemIndex !== null) {
      this.menuItems[this.previouslyFocusedItemIndex].setAttribute('tabindex', '-1');
    }
  }

  /**
   * @private
   * @description Checks if a menu item is focusable
   *
   * @param menuItem
   */
  isMenuItemFocusable(menuItem) {
    if (!menuItem) return false;

    const _menu_action = Array.from(menuItem.children).filter(el => el.nodeName == 'A' || el.nodeName == 'BUTTON')[0];

    if (!_menu_action) return false;

    if (_menu_action.disabled || _menu_action.getAttribute('disabled') == '') return false;

    if (menuItem.getAttribute('tabindex') == -1 || menuItem.disabled || menuItem.classList.contains('separator'))
      return false;

    return true;
  }

  /**
   * @private
   * @description Put focus on menu item at index
   *
   * @param atIndex
   */
  focusMenuItem(atIndex = 0) {
    // console.trace(atIndex);

    if (typeof atIndex === 'number' && atIndex >= 0 && atIndex <= this.menuItems.length) {
      const menuItem = this.menuItems[atIndex];

      if (menuItem) {
        this.removeFocusFromCurrent();
        menuItem.setAttribute('tabindex', '0');
        menuItem.focus();
        this.previouslyFocusedItemIndex = atIndex;
      }
    }
  }

  /**
   * @private
   * @description Focus menu item, which start with typed character,
   * do nothing if current menu doesn't contains menu item starting with given character
   *
   * @param {string} character
   */
  focusMenuItemStartingWithChar(character) {
    //  TODO: decide how to apply focus-menu-item-on-char-press logic
    //   if multiple items start with the same char
    //   -- 'previouslyTypedChar ref' or something
    const charIndex = this.getIndexOfMenuItemStartingWithChar(character);

    if (charIndex >= 0) {
      this.focusMenuItem(charIndex);
    }
  }

  /**
   * @private
   * @description Order all submenus to close
   */
  closeAnyOpenSubMenu() {
    Object.values(this.subMenuIndexItems).forEach(subMenu => subMenu.closeSubMenu());
  }

  /**
   * @description Put focus on the first item in current menu
   *
   */
  focusFirstItem() {
    this.focusMenuItem(this.firstMenuItemIndex);
  }

  /**
   * @description Put focus on the last item in current menu
   */
  focusLastItem() {
    this.focusMenuItem(this.lastMenuItemIndex);
  }

  /**
   * @description Put focus on the next item of currently focused menu item
   * if at the end of list, cycle back to first item
   */
  focusNextItem() {
    let indexToFocus = this.firstMenuItemIndex;

    if (this.previouslyFocusedItemIndex !== null && this.previouslyFocusedItemIndex < this.lastMenuItemIndex) {
      indexToFocus = this.previouslyFocusedItemIndex + 1;
    }

    this.focusMenuItem(indexToFocus);
  }

  /**
   * @description Put focus on the previous item of currently focused menu item
   * if at the start of list, cycle back to last item
   */
  focusPreviousItem() {
    let indexToFocus = this.lastMenuItemIndex;

    if (this.previouslyFocusedItemIndex !== null && this.previouslyFocusedItemIndex > this.firstMenuItemIndex) {
      indexToFocus = this.previouslyFocusedItemIndex - 1;
    }

    this.focusMenuItem(indexToFocus);
  }

  /**
   * @description Return the amount of time that should be used as a delay before the
   * currently hovered item is activated.
   *
   * Returns 0 if the activation should happen immediately. Otherwise,
   * returns the number of milliseconds that should be delayed before
   * checking again to see if the item should be activated.
   *
   * @param {Element} menuItem the menu item to activate the subMenu from
   */
  activationDelay(menuItem) {
    if (!this.activeSubMenu) {
      // If there is no other submenu already active, then
      // go ahead and activate immediately.
      return 0;
    }

    if (!menuItem) return 0;

    let _sub_menu_direction = 'right';

    if (menuItem.classList.contains('left')) {
      _sub_menu_direction = 'left';
    }

    const _menu_list_el_rect = this.menuItemHolder.querySelector('ul').getBoundingClientRect();
    const _menu_list_el_offset = {
      top: _menu_list_el_rect.top + window.scrollY,
      left: _menu_list_el_rect.left + window.scrollX
    };
    const upperLeft = {
      x: _menu_list_el_offset.left,
      y: _menu_list_el_offset.top - this.SUB_MENU_MOUSEOVER_TOLERANCE
    };
    const upperRight = {
      x: _menu_list_el_offset.left + _menu_list_el_rect.width,
      y: upperLeft.y
    };
    const lowerLeft = {
      x: _menu_list_el_offset.left,
      y: _menu_list_el_offset.top + _menu_list_el_rect.height + this.SUB_MENU_MOUSEOVER_TOLERANCE
    };
    const lowerRight = {
      x: _menu_list_el_offset.left + _menu_list_el_rect.width,
      y: lowerLeft.y
    };
    const loc = this.mouseLocs[this.mouseLocs.length - 1];

    let prevLoc = this.mouseLocs[0];

    if (!loc) {
      return 0;
    }

    if (!prevLoc) {
      prevLoc = loc;
    }

    if (
      prevLoc.x < _menu_list_el_offset.left ||
      prevLoc.x > lowerRight.x ||
      prevLoc.y < _menu_list_el_offset.top ||
      prevLoc.y > lowerRight.y
    ) {
      // If the previous mouse location was outside of the entire
      // menu's bounds, immediately activate.
      return 0;
    }

    if (this.lastDelayLoc && loc.x == this.lastDelayLoc.x && loc.y == this.lastDelayLoc.y) {
      // If the mouse hasn't moved since the last time we checked
      // for activation status, immediately activate.
      return 0;
    }

    // Detect if the user is moving towards the currently activated
    // submenu.
    //
    // If the mouse is heading relatively clearly towards
    // the submenu's content, we should wait and give the user more
    // time before activating a new submenu. If the mouse is heading
    // elsewhere, we can immediately activate a new submenu.
    //
    // We detect this by calculating the slope formed between the
    // current mouse location and the upper/lower right points of
    // the menu. We do the same for the previous mouse location.
    // If the current mouse location's slopes are
    // increasing/decreasing appropriately compared to the
    // previous's, we know the user is moving toward the submenu.
    //
    // Note that since the y-axis increases as the cursor moves
    // down the screen, we are looking for the slope between the
    // cursor and the upper right corner to decrease over time, not
    // increase (somewhat counterintuitively).
    const slope = (a, b) => (b.y - a.y) / (b.x - a.x);

    let decreasingCorner = upperRight;
    let increasingCorner = lowerRight;

    // Our expectations for decreasing or increasing slope values
    // depends on which direction the submenu opens relative to the
    // main menu. By default, if the menu opens on the right, we
    // expect the slope between the cursor and the upper right
    // corner to decrease over time, as explained above. If the
    // submenu opens in a different direction, we change our slope
    // expectations.
    if (_sub_menu_direction == 'left') {
      decreasingCorner = lowerLeft;
      increasingCorner = upperLeft;
    }

    const decreasingSlope = slope(loc, decreasingCorner);
    const increasingSlope = slope(loc, increasingCorner);
    const prevDecreasingSlope = slope(prevLoc, decreasingCorner);
    const prevIncreasingSlope = slope(prevLoc, increasingCorner);

    if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
      // Mouse is moving from previous location towards the
      // currently activated submenu. Delay before activating a
      // new menu submenu, because user may be moving into submenu.
      this.lastDelayLoc = loc;

      return this.DELAY;
    }

    this.lastDelayLoc = null;

    return 0;
  }

  /**
   * @description Open menu
   */
  openMenu() {
    this.isOpen = true;
    this.menuItemHolder.classList.add(this.IS_OPEN_TOGGLE_CLASS);
    this.menuItemHolder.classList.add(this.IS_ACTIVE_TOGGLE_CLASS);
    this.controllerNode.setAttribute('aria-expanded', 'true');
  }

  /**
   * @description Close menu
   */
  closeMenu() {
    this.isOpen = false;
    this.removeFocusFromCurrent();
    this.controllerNode.setAttribute('aria-expanded', 'false');
    this.menuItemHolder.classList.remove(this.IS_ACTIVE_TOGGLE_CLASS);
    this.menuItemHolder.classList.remove(this.IS_OPEN_TOGGLE_CLASS);
    this.closeAnyOpenSubMenu();
  }

  /**
   * @param {KeyboardEvent} event
   */
  keyDownHandler(event) {
    let shouldPreventDefault = false;

    this.currentMenuItem = this.menuItems[this.previouslyFocusedItemIndex];

    if (event.shiftKey && this.isTextualCharacter(event.key)) {
      shouldPreventDefault = true;
      this.focusMenuItemStartingWithChar(event.key);
    } else {
      switch (event.code) {
        case this.keyCode.TAB:
          this.closeMenu();
          break;

        case this.keyCode.RETURN:
        case this.keyCode.SPACE:
          if (this.menuItemHasSubMenu(this.currentMenuItem)) {
            const subMenu = this.subMenuIndexItems[`${this.previouslyFocusedItemIndex}`];

            if (subMenu) {
              subMenu.openSubMenu();
              subMenu.focusFirstSubMenuItem();
            }
          } else {
            // default - select current; allow event to bubble; close menu
            this.topMostParent.close();
          }

          shouldPreventDefault = true;
          break;

        case this.keyCode.ESC:
          this.closeMenu();
          this.controllerNode.focus();
          shouldPreventDefault = true;
          break;

        case this.keyCode.END:
          this.focusLastItem();
          shouldPreventDefault = true;
          break;

        case this.keyCode.HOME:
          this.focusFirstItem();
          shouldPreventDefault = true;
          break;

        case this.keyCode.LEFT:
          if (this.menuItemHasSubMenu(this.currentMenuItem, this.keyCode.LEFT)) {
            const subMenu = this.subMenuIndexItems[`${this.previouslyFocusedItemIndex}`];

            if (subMenu) {
              subMenu.openSubMenu();
              subMenu.focusFirstSubMenuItem();
            }
          } else if (this.menuItemHasParentMenu(this.currentMenuItem, this.keyCode.LEFT)) {
            this.closeMenu();
            this.controllerNode.focus();
          }

          shouldPreventDefault = true;
          break;

        case this.keyCode.UP:
          this.focusPreviousItem();
          shouldPreventDefault = true;
          break;

        case this.keyCode.RIGHT:
          if (this.menuItemHasSubMenu(this.currentMenuItem, this.keyCode.RIGHT)) {
            const subMenu = this.subMenuIndexItems[`${this.previouslyFocusedItemIndex}`];

            if (subMenu) {
              subMenu.openSubMenu();
              subMenu.focusFirstSubMenuItem();
            }
          } else if (this.menuItemHasParentMenu(this.currentMenuItem, this.keyCode.RIGHT)) {
            this.closeMenu();
            this.controllerNode.focus();
          }

          shouldPreventDefault = true;
          break;

        case this.keyCode.DOWN:
          this.focusNextItem();
          shouldPreventDefault = true;
          break;

        default:
          break;
      }
    }

    if (shouldPreventDefault) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}

class SubMenu {
  /**
   * @param {Element} subMenuHolder
   * @param {MenuToggle} topMostParent
   */
  constructor(subMenuHolder, topMostParent) {
    this.bindMethods(this);
    this.SUB_MENU_HOLDER = '.dropdown-menu';
    /**
     * @type {Menu}
     */
    this.menuItems = this.initializeMenuItems(subMenuHolder, topMostParent);
    this.addEventListeners(subMenuHolder);
  }

  /**
   * @param {this} self
   * @private
   */
  bindMethods(self) {
    self.initializeMenuItems = self.initializeMenuItems.bind(self);
    self.openSubMenu = self.openSubMenu.bind(self);
    self.closeSubMenu = self.closeSubMenu.bind(self);
    self.focusFirstSubMenuItem = self.focusFirstSubMenuItem.bind(self);
    self.focusLastSubMenuItem = self.focusLastSubMenuItem.bind(self);
  }

  /**
   * @private
   * @param {Element} subMenuHolder
   * @param {MenuToggle} topMostParent
   * @returns {Menu}
   */
  initializeMenuItems(subMenuHolder, topMostParent) {
    const menuItemHolder = subMenuHolder.querySelector(this.SUB_MENU_HOLDER);
    const menuController = subMenuHolder.children[0];

    return new Menu(menuItemHolder, menuController, topMostParent);
  }

  /**
   * @private
   * @param subMenuHolder
   */
  addEventListeners(subMenuHolder) {
    subMenuHolder.addEventListener('click', event => {
      if (event.target instanceof Node && !subMenuHolder.contains(event.target)) {
        this.closeSubMenu();
      }
    });

    subMenuHolder.addEventListener('click', () => {
      if (subMenuHolder.children[0].getAttribute('aria-expanded') === 'true') {
        this.closeSubMenu();
      } else {
        this.openSubMenu();
      }
    });
  }

  /**
   * @description Allows to control opening of submenu from outside
   */
  openSubMenu() {
    this.menuItems.openMenu();
  }

  /**
   * @description Allows to control closing of submenu from outside
   */
  closeSubMenu() {
    if (this.menuItems.isOpen) {
      this.menuItems.closeMenu();
    }
  }

  /**
   * @description Sets focus on the first item of submenu
   */
  focusFirstSubMenuItem() {
    this.menuItems.focusFirstItem();
  }

  /**
   * @description Sets focus on last item of submenu
   */
  focusLastSubMenuItem() {
    this.menuItems.focusLastItem();
  }
}

class MenuToggle {
  /**
   * @param {Element} menuButton - an item (usually) in Header, which toggles the appearance of Menu
   */
  constructor(menuButton) {
    this.keyCode = Object.freeze({
      TAB: 'Tab',
      RETURN: 'Enter',
      ESC: 'Escape',
      SPACE: 'Space',
      PAGEUP: 'PageUp',
      PAGEDOWN: 'PageDown',
      END: 'End',
      HOME: 'Home',
      LEFT: 'ArrowLeft',
      UP: 'ArrowUp',
      RIGHT: 'ArrowRight',
      DOWN: 'ArrowDown'
    });
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);

    this.menuButton = menuButton;

    this.menuButton.nextElementSibling.style.inset = 'auto 0 100% auto';
    this.menuButton.nextElementSibling.style.minWidth = '10rem';
    this.menuItems = new Menu(this.menuButton.nextElementSibling, this.menuButton, this);

    this.menuButton.addEventListener('keydown', this.handleKeydown);
    this.menuButton.addEventListener('click', this.handleClick);

    // menu clicked outside -> close
    document.addEventListener('click', event => {
      if (event.target instanceof Node && !this.menuButton.parentElement.contains(event.target)) {
        this.menuItems.closeMenu();
      }
    });
    document.addEventListener('mousemove', this.menuItems.logMouseMovement);
  }

  close() {
    this.menuItems.closeMenu();
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    let shouldPreventDefault = false;

    switch (event.code) {
      case this.keyCode.SPACE:
      case this.keyCode.RETURN:
      case this.keyCode.DOWN:
        this.menuItems.openMenu();
        this.menuItems.focusFirstItem();
        shouldPreventDefault = true;
        break;

      case this.keyCode.UP:
        this.menuItems.openMenu();
        this.menuItems.focusLastItem();
        shouldPreventDefault = true;
        break;

      default:
        break;
    }

    if (shouldPreventDefault) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick() {
    if (this.menuButton.getAttribute('aria-expanded') === 'true') {
      this.menuItems.closeMenu(true);
    } else {
      this.menuItems.openMenu();
      this.menuItems.focusFirstItem();
    }
  }
}

export const IDSMenu = Menu;

export const IDSSubMenu = SubMenu;

export const IDSMenuToggle = MenuToggle;
