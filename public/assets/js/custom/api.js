function getUrl(){
    var comm="https://purevat.com/task_manage/";
    return comm;
}



$(document).on("focusin", ".dpdatetimepicker", function () {
    $(this).datetimepicker({
        //startDate: new Date(start_date),
        todayBtn: "linked",
        orientation: "bottom auto",
        daysOfWeekHighlighted: "5",
        todayHighlight: true,
        autoclose: true
    });
});

$(document).on("focusin", ".dpdatepicker", function () {
    $(this).datepicker({
       // startDate: new Date(start_date),
        todayBtn: "linked",
        orientation: "bottom auto",
        daysOfWeekHighlighted: "5",
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        autoclose: true
    });
});



function ajaxSetup(callback, method, url, data) 
{
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: method,
        dataType: 'json',
        url: url,
        data: data,
        success: function (data) {
            callback(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("Server Error");
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found.');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error.');
            } else if (errorThrown === 'parsererror') {
                alert('Requested JSON parse failed');
            } else if (errorThrown === 'timeout') {
                alert('Time out error');
            } else if (errorThrown === 'abort') {
                alert('Ajax request aborted ');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
    });

    

}