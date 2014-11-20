oopi.defineClass("User", {
    construct: function (str) {
        this.getId();
    },
    getId: function () {
        var url = "";
        $.ajax({
            url: url,
            dataType: "json",
            data: {
                
            },
            success: function (data) {
                console.log(data);
            }
        });
    }
});