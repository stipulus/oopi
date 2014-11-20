var Vehicle = oopi.abstract({
    color: 'blue'
});

var Car = Vehicle.prototype.extend({
    sayText: 'hi',
    construct: function (a,b,c) {
        console.log(a);
        console.log(b);
        console.log(c);
        this.setText('hello');
    },
    say: function () {
        console.log('say: '+this.sayText);
    },
    setText: function (v) {
        this.sayText = v;
    }
});

var SadCar = Car.prototype.extend({
    say: function () {
        console.log(this.color+' :(');
        this.super.say();
    }
});