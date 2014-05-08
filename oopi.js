var oopi = {
    classMap: {},
    map: {},
    defineClass: function (name,methods) {
        if(typeof name === "undefiend" || name.length < 1)
            throw new Exception("Class must have a name");
        if(typeof methods === "undefiend")
            throw new Exception("Class "+name+" cannot be null");
        if(typeof methods.extend !== "undefined")
            throw new Exception("Illegal attempt to overide extend method in "+name);
        if(typeof methods.create !== "undefined")
            throw new Exception("Illegal attempt to overide create method in "+name);
        function F() {}
        F.prototype = this.parseMethods(methods);//assumes all methods are static
        this.classMap[name] = new F();
        this.map[name] = new Array();
        this.assignDefaultMethods(name);
        window[name] = this.classMap[name];
    },
    parseMethods: function (methods) {
        for(var j in methods) {
            if(typeof methods[j] === "function") {
                var str = methods[j].toString();
                var start = str.search('{');
                var i = start+1;
                var state = 1;
                for(;state > 0;i++) {
                    if(str.charAt(i) == "'")
                        for(i = i+1;str.charAt(i) != "'";i++);
                    if(str.charAt(i) == '"')
                        for(i = i+1;str.charAt(i) != '"';i++);
                    if(str.charAt(i) == "{") state++;
                    else if(str.charAt(i) == "}") state--;
                    else if(str.charAt(i) == 's' && str.charAt(i-1) == 'i' && str.charAt(i-2) == 'h' && str.charAt(i-3) == 't') {
                        str = str.substr(0,i-3)+'oopi.map[this.oopi_className][this.oopi_id]'+str.substr(i+1);
                        i+=41;
                    }
                }
                methods[j] = new Function(str.substr(start+1,str.lastIndexOf('}')-start-1));
            }
        }
        return methods;
    },
    assignDefaultMethods: function (className) {
        this.classMap[className].oopi_id = "";
        this.classMap[className].oopi_className = className;
        this.classMap[className].create = function () {
            var oopi_name = oopi.classMap[className].oopi_className;
            var id = oopi.newobj(oopi_name);
            for(var oopi_i in oopi.classMap[oopi_name]) {
                if(oopi_i === "create" || oopi_i === "extend" || oopi_i === "free");
                else if(typeof oopi.classMap[oopi_name][oopi_i] === "function") {
                    oopi.assignMethod(oopi_name,oopi_i,id);
                } else {
                    var param = oopi.classMap[className][oopi_i];
                    oopi.map[oopi_name][id][oopi_i] = param;
                }
            }
            if(typeof oopi.map[oopi_name][id].construct === "function") {
                oopi.map[oopi_name][id].construct();
            }
            return oopi.map[oopi_name][id];
        }
        this.classMap[className].extend = function (newClassName,methods) {
            oopi.extend(newClassName, className, methods);
        }
        this.classMap[className].free = function () {
            this.free = true;
        }
    },
    assignMethod: function (className,methodName,id) {
        this.map[className][id][methodName] = function() {
            var oopi_previd = oopi.classMap[className].oopi_id;
            oopi.classMap[className].oopi_id = id;
            var r = oopi.classMap[className][methodName](arguments);
            oopi.classMap[className].oopi_id = oopi_previd;
            return r;
        }
    },
    extend: function (newClass,parentClass,methods) {
        this.defineClass(newClass, methods);
        var exist;
        this.classMap[newClass].superClass = {};
        for(var i in this.classMap[parentClass]) {
            if(i != 'construct') {
                exist = false;
                for(var j in this.classMap[newClass])
                    if(i == j) {
                        exist = true;
                        break;
                    }
                var f = this.classMap[parentClass][i];
                if(!exist)
                    this.classMap[newClass][i] = f;
                else
                    this.classMap[newClass].superClass[i] = f;
            }
        }
    },
    defineAbstract: function () {
        
    },
    defineInterface: function () {
        //throw new UserException("InvalidMonthNo");
    },
    free: function (obj) {
        obj.oopi_free = true;
    },
    newobj: function (className) {
        var i = 0;
        for(;i < oopi.map[className].length;i++)
            if(oopi.map[className][i].oopi_free)
                break;
        if(i === oopi.map[className].length) {
            function F() {}
            oopi.map[className][i] = new F();
            oopi.map[className][i].oopi_id = i;
        }
        return i;
    }
    
};
window.oopi = oopi;