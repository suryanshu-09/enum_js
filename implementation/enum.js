class Enum {
  constructor(definitions, { reverseMapping = false } = {}) {
    this._keys = Object.keys(definitions);
    this._values = Object.values(definitions);

    this._map = Object.freeze({ ...definitions });

    if (reverseMapping) {
      this._reverseMap = Object.freeze(
        Object.fromEntries(Object.entries(definitions).map(([k, v]) => [v, k]))
      );
    } else {
      this._reverseMap = {};
    }

    Object.assign(this, this._map, this._reverseMap);
    Object.freeze(this);
  }

  static define(definitions, options = {}) {
    return new Enum(definitions, options);
  }

  keys() {
    return [...this._keys];
  }

  values() {
    return [...this._values];
  }

  entries() {
    return this._keys.map((key) => [key, this._map[key]]);
  }

  hasKey(key) {
    return this._keys.includes(key);
  }

  hasValue(value) {
    return this._values.includes(value);
  }

  isValid(value) {
    return this.hasValue(value) || this._reverseMap[value] !== undefined;
  }

  toString() {
    return JSON.stringify(this._map, null, 2);
  }
}

module.exports = Enum;
