$().ready(function () {
    $("#btn-upload").prop('disabled', true);

    $("#wrapper").on("change", "#uploadFile", function() {
        // alert("selected");
        // parseExcel();
        getExcel();
    });

    $("#load1").on('click', function() {
        var $this = $(this);
        $this.button('loading');
        setTimeout(function() {
            $this.button('reset');
        }, 8000);
    });
})