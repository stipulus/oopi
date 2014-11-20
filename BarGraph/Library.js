oopi.defineClass("Graph", {
    max: 10,
    bars: [],
    div: null,
    maxHeight: 200,
    construct: function () {
        this.div = $('#graph');
        for(var i = 0;i < this.max;i++)
            this.bars[i] = Bar.create();
    },
    setValue: function (arg) {
        var height = (this.maxHeight/100)*arg.value;
        this.bars[arg.bar].setHeight(height);
    },
    setMaxHeight: function (num) {
        this.maxHeight = num;
    }
});
oopi.defineClass("Bar", {
    div: null,
    graph: null,
    construct: function () {
        this.graph = $('#graph');
        this.div = this.getDiv();
        this.graph.append(this.div);
    },
    getDiv: function () {
        var i;
        for(i = 1;$('#bar-'+i).length != 0;i++);
        return $('<div id="bar-'+i+'" class="bar"></div>');
    },
    setHeight: function (height) {
        //console.log(height)
        this.div.css('height',height);
    }
});