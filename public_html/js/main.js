function init() {
    var car = new Car('1','2','3');
    car.say();
    
    var sadCar = new SadCar('4','5','6');
    sadCar.say();
    
    var vehicle = new Vehicle();
}
/*
 * OUTPUT
 * 
1                                                           Library.js (line 8)
2                                                           Library.js (line 9)
3                                                           Library.js (line 10)
say: hello                                                  Library.js (line 14)
4                                                           Library.js (line 8)
5                                                           Library.js (line 9)
6                                                           Library.js (line 10)
blue :(                                                     Library.js (line 23)
Error: Cannot construct abstract class.
    throw new Error('Cannot construct abstract class.');    oopi.js (line 72)
 */