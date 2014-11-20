/*
Copyright (c) 2014, Tyler W. Chase-Nason
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies, 
either expressed or implied, of the FreeBSD Project.
*/
var oopi = {};
(function () {
    var pub = oopi;
    var rand = {
        len: 6,
        chars: 'abacdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        gen: function () {
            var str = '';
            var charlen = this.chars.length;
            for(var i = this.len;i > 0;i--)
                str += this.chars.charAt(Math.floor(Math.random()*charlen));
            return str;
        }
    };
    var base = {
        extend: function (child,abstract) {
            function newobj(obj) {
                if(obj === 'object') {
                    var newobj = {};
                    for(var i in obj)
                        newobj[i] = newobj(obj[i]);
                    return newobj;
                } else {
                    return obj;
                }
            }
            for(var i in this)
                if(typeof child[i] === 'undefined' && i !== 'super') {
                    child[i] = newobj(this[i]);
                } else {
                    if(typeof child.super === 'undefined') {
                        child.super = {};
                    }
                    if(typeof this[i] === 'function') {
                        child.super[i] = this[i].bind(child);
                    } else {
                        child.super[i] = newobj(this[i]);
                    }
                }
                
            function F(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z) {
                if(abstract)
                    throw new Error('Cannot construct abstract class.');
                if(typeof this.construct === 'function') {
                    //this.apply(this.construct,arguments);
                    //IN SOVIET RUSSIA WE CALL THIS A HACK
                    var arr = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z];
                    var charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                    for(var ii = 0;ii < arr.length;ii++)
                        if(typeof arr[ii] === 'undefined') {
                            eval('this.construct('+charArr.splice(0,ii).join(',')+');');
                            break;
                        }
                }
            };
            F.prototype = child;
            return F;
        }
    };
    pub.abstract = function (child) {
        return base.extend(child,true);
    };
    pub.class = function (child) {
        return base.extend(child);
    };
})();