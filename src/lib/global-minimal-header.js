class SubMenu {
  SUB_MENU_HOLDER = '.dropdown-menu';

  /**
   * @param {Element} subMenuHolder
   * @param {MenuToggle} topMostParent
   */
  constructor(subMenuHolder, topMostParent) {
    this.bindMethods(this);
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

class Menu {
  IS_OPEN_TOGGLE_CLASS = 'is-open';
  IS_ACTIVE_TOGGLE_CLASS = 'is-active';

  keyCode = Object.freeze({
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  });

  /**
   *
   * @param {Element} menuItemHolder
   * @param {Element} controllerNode
   * @param {MenuToggle} topMostParent
   */
  constructor(menuItemHolder, controllerNode, topMostParent) {
    if (!menuItemHolder || !controllerNode) return;
    this.bindMethods(this);
    this.topMostParent = topMostParent;
    /**
     * @type {Element}
     */
    this.menuItemHolder = menuItemHolder;
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
    this.isOpen = false;
    this.firstMenuItemIndex = 0;
    this.lastMenuItemIndex = this.menuItems.length - 1;
    this.previouslyFocusedItemIndex = null;
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
    self.removeFocusFromCurrent = self.removeFocusFromCurrent.bind(self);
    self.focusMenuItem = self.focusMenuItem.bind(self);
    self.focusMenuItemStartingWithChar = self.focusMenuItemStartingWithChar.bind(self);
    self.closeAnyOpenSubMenu = self.closeAnyOpenSubMenu.bind(self);

    self.focusFirstItem = self.focusFirstItem.bind(self);
    self.focusLastItem = self.focusLastItem.bind(self);
    self.focusNextItem = self.focusNextItem.bind(self);
    self.focusPreviousItem = self.focusPreviousItem.bind(self);
    self.openMenu = self.openMenu.bind(self);
    self.closeMenu = self.closeMenu.bind(self);
    self.keyDownHandler = self.keyDownHandler.bind(self);
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
    return Array.from(menuItemElementList).map((menuItem, index) => {
      menuItem.addEventListener('keydown', this.keyDownHandler);
      this.registerMenuItemStartingCharacter(menuItem, index);
      if (this.menuItemHasSubMenu(menuItem)) {
        this.registerSubMenuItemAtIndex(menuItem, index);
      }
      return menuItem;
    });
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
      console.warn('Impossible to evaluate given value, ', e);
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
  menuItemHasSubMenu(menuItem) {
    return !!Array.from(menuItem.children).find(c => c.classList.contains('menu'));
  }

  /**
   * @private
   * @description Set tabindex attribute to -1 on currently focused item
   */
  removeFocusFromCurrent() {
    if (this.previouslyFocusedItemIndex && this.previouslyFocusedItemIndex !== null) {
      this.menuItems[this.previouslyFocusedItemIndex].setAttribute('tabindex', '-1');
    }
  }

  /**
   * @private
   * @description Put focus on menu item at index
   *
   * @param atIndex
   */
  focusMenuItem(atIndex = 0) {
    if (typeof atIndex === 'number' && atIndex >= 0 && atIndex <= this.menuItems.length) {
      this.removeFocusFromCurrent();
      this.menuItems[atIndex].setAttribute('tabindex', '0');
      this.menuItems[atIndex].focus();
      this.previouslyFocusedItemIndex = atIndex;
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
    if (!this.menuItemHolder) return;
    this.isOpen = false;
    this.removeFocusFromCurrent();
    if (this.controllerNode) {
      this.controllerNode.setAttribute('aria-expanded', 'false');
    }
    this.menuItemHolder.classList.remove(this.IS_ACTIVE_TOGGLE_CLASS);
    this.menuItemHolder.classList.remove(this.IS_OPEN_TOGGLE_CLASS);
    this.closeAnyOpenSubMenu();
  }

  /**
   * @param {KeyboardEvent} event
   */
  keyDownHandler(event) {
    let shouldPreventDefault = false;
    let currentMenuItem = this.menuItems[this.previouslyFocusedItemIndex];

    if (event.shiftKey && this.isTextualCharacter(event.key)) {
      shouldPreventDefault = true;
      this.focusMenuItemStartingWithChar(event.key);
    } else {
      switch (event.keyCode) {
        case this.keyCode.TAB:
          this.closeMenu();
          break;

        case this.keyCode.RETURN:
        case this.keyCode.SPACE:
          if (this.menuItemHasSubMenu(currentMenuItem)) {
            const subMenu = this.subMenuIndexItems[`${this.previouslyFocusedItemIndex}`];
            subMenu?.openSubMenu();
            subMenu?.focusFirstSubMenuItem();
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
          if (this.menuItemHasSubMenu(currentMenuItem)) {
            const subMenu = this.subMenuIndexItems[`${this.previouslyFocusedItemIndex}`];
            subMenu?.openSubMenu();
            subMenu?.focusLastSubMenuItem();
          }
          shouldPreventDefault = true;
          break;

        case this.keyCode.UP:
          this.focusPreviousItem();
          shouldPreventDefault = true;
          break;

        case this.keyCode.RIGHT:
          if (this.menuItemHasSubMenu(currentMenuItem)) {
            const subMenu = this.subMenuIndexItems[`${this.previouslyFocusedItemIndex}`];
            subMenu?.openSubMenu();
            subMenu?.focusFirstSubMenuItem();
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

export default class MenuToggle {
  keyCode = Object.freeze({
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  });

  /**
   * @param {Element} menuButton - an item (usually) in Header, which toggles the appearance of Menu
   */
  constructor(menuButton) {
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);

    this.menuButton = menuButton;
    this.menuItems = new Menu(this.menuButton.nextElementSibling, this.menuButton, this);

    this.menuButton.addEventListener('keydown', this.handleKeydown);
    this.menuButton.addEventListener('click', this.handleClick);

    // menu clicked outside -> close
    document.addEventListener('click', event => {
      if (event.target instanceof Node && !this.menuButton.parentElement.contains(event.target)) {
        this.menuItems.closeMenu();
      }
    });
  }

  close() {
    this.menuItems.closeMenu();
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    let shouldPreventDefault = false;

    switch (event.keyCode) {
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
