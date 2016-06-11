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
          if (typeof item === "object") {
            return {
              label: item.label,
              value: item.value,
              checked: selectedItems.indexOf(item) >= 0
            };
          } else {
            return {
              label: item,
              value: item,
              checked: selectedItems.indexOf(item) >= 0
            };
          }
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
      const getLabel = (v) => this.items
        .filter(item => (typeof item === "object" ? item.value : item) === v)
        .map(item => (typeof item === "object" ? item.label : item));
      if (multiple) {
        if (values && values.length) {
          if (values.length > minManySelectedItem) {
            return manySelectedItemsPlaceholder.replace(/\{n}/gi, values.length);
          } else {
            const labels = values.map(v => getLabel(v));
            return labels.join(", ");
          }
        } else {
          return onEmptyPlaceholder;
        }
      } else {
        if (value !== null) {
          return getLabel(value);
        } else {
          return onEmptyPlaceholder;
        }
      }
    }
  }

  Polymer(KwcSelect);
})();