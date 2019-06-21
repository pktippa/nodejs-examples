var Foo = function(text) {this.text=text; };
var text;
Foo.prototype.bar = function() { console.log(this.text); };
var f = new Foo("bar")
f.bar();
module.exports = Foo;