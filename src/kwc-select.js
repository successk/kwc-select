(() => {
  "use strict";

  class KwcSelect {
    beforeRegister() {
      this.is = "kwc-select";

      this.properties = {
        items: {
          type: Array,
          value: [],
          observer: "_itemsChanged"
        },
        multiple: {
          type: Boolean,
          value: false
        },
        onEmptyPlaceholder: {
          type: String,
          value: "Select"
        },
        minManySelectedItem: {
          type: Number,
          value: 4
        },
        manySelectedItemsPlaceholder: {
          type: String,
          value: "{n} selected items"
        },
        searchPlaceholder: {
          type: String,
          value: ""
        },
        value: {
          type: String,
          value: null,
          reflectToAttribute: true,
          notify: true
        },
        values: {
          type: Array,
          value: null,
          reflectToAttribute: true,
          notify: true
        },
        _search: {
          type: String,
          value: ""
        },
        _elements: {
          type: Array,
          value: []
        },
        _opened: {
          type: Boolean,
          value: false
        },
        _btnLabel: {
          type: String,
          computed: "_computeBtnLabel(onEmptyPlaceholder, minManySelectedItem, manySelectedItemsPlaceholder, multiple, value, values)"
        }
      };

      this.listeners = {
        "btn-select.tap": "_btnSelectTap"
      };
    }

    attached() {
      this.values = this.multiple ? [] : null;
      const that = this;
      this.addEventListener("change", (event) => that._selectionChanged(event.target.value, event.target.checked), true);
    }

    _itemsChanged(list) {
      const selectedItems = this._elements ? this._elements.filter((e) => e.checked).map((e) => e.value) : [];
      this._elements = list
        .map((item) => {
          return {
            value: item,
            checked: selectedItems.indexOf(item) >= 0
          };
        });
    }

    _getFilter(search) {
      if (search) {
        const lowerSearch = search.toLowerCase();
        return (elt) => elt.value && elt.value.toLowerCase().indexOf(lowerSearch) >= 0;
      } else {
        return null;
      }
    }

    _selectionChanged(value, added) {
      if (this.multiple) {
        if (added) {
          const values = [].concat(this.values || []);
          values.push(value);
          this.values = values;
        } else {
          this.values = this.values.filter((v) => v !== value);
        }
      } else {
        if (added) {
          Array.from(this.querySelectorAll("input[type=checkbox]"))
            .forEach((elt) => elt.checked = elt.value === value);
          this.value = value;
        } else {
          this.value = null;
        }
      }
    }

    _btnSelectTap() {
      this._opened = !this._opened;
    }

    _computeBtnLabel(onEmptyPlaceholder, minManySelectedItem, manySelectedItemsPlaceholder, multiple, value, values) {
      if (multiple) {
        if (values && values.length) {
          if (values.length > minManySelectedItem) {
            return manySelectedItemsPlaceholder.replace(/\{n}/gi, values.length);
          } else {
            return values.join(", ");
          }
        } else {
          return onEmptyPlaceholder;
        }
      } else {
        if (value !== null) {
          return value;
        } else {
          return onEmptyPlaceholder;
        }
      }
    }
  }

  Polymer(KwcSelect);
})();