(function (plugin) {
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = plugin;
}
else {
    if (typeof define === "function" && define.amd) {
      // AMD
      define(function () {
        return plugin;
    });
  }
  else {
      // Other environment (usually <script> tag): plug in to global chai instance directly.
      chai.use(plugin);
  }
}
}(function (chai, utils) {

    const numbers = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }

    Object.keys(numbers).forEach((key, index) => {
        chai.Assertion.addProperty(key, function () {
            const n = numbers[key];
            this.assert(n === utils.flag(this, 'object'), `expected #{this} to be ${n}`, `expected #{this} not to be ${n}`, this.negate ? false : true);
        });
    });

}));