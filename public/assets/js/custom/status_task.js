
var li=getUrl();
$(function () {
    $("#rating_coding").rateYo({
        onSet: function (rating, rateYoInstance)
        {
            rating = Math.ceil(rating);
            $('#rating_input_coding').val(rating);//setting up rating value to hidden field
            //alert("Rating is set to: " + rating);
        }
    });
    $("#rating_deadline").rateYo({
        onSet: function (rating, rateYoInstance)
        {
            rating = Math.ceil(rating);
            $('#rating_input_deadline').val(rating);//setting up rating value to hidden field
            //alert("Rating is set to: " + rating);
        }
    });
});
function getUserTaskListById(v) {
    var user_id=$(v).val();
    var method="POST";
    var url=li+"getUserTaskListById";
    var data={
        user_id:user_id,
    }
    ajaxSetup(function (data)
    {
        var options="<option value='0'></option>";$("#schedule_id").empty();
        $.each(data.list,function (key,val) {
            options=options+"<option value='"+val.id+"'>"+val.title+"</option>";
        });
        $("#schedule_id").html(options);
    },method,url,data);
}
function saveTaskFinishPerformance(v)
{

    var rating_deadline=$("#rating_input_deadline").val();
    var rating_coding=$("#rating_input_coding").val();
    var remakrs=$("#remakrs").val();


    var list=[];var i=0;
     $(".chq_approve_id").each(function () {
         if($(this).is(":checked")){
             i++;
             var id=$(this).val();
             var data={
                 id:id,
             }
             list.push(data);
         }
     });

     var combineData=JSON.stringify(list);
     if(i == '0')
         alert("Data is empty...");
     else{
         var c=confirm("Are you sure ?");
         if(c == true){

             $(v).text("Loading...");
             $(v).attr("disabled",true);

             var method="POST";
             var url=li+"reqApproveByAdminApi";
             var data={
                 list:combineData,
                 rating_coding:rating_coding,
                 rating_deadline:rating_deadline,
                 remakrs:remakrs,
             }
             ajaxSetup(function (data)
             {
                 if(data.status == '1')
                     window.location.reload();
             },method,url,data);
         }
     }
}
$(".chq_all").on("click",function ()
{
    if($(this).is(":checked"))
        $(".chq_approve_id").prop("checked",true);
    else
        $(".chq_approve_id").prop("checked",false);
});
function ReqTaskCancel(v,id)
{
    var btn_text=$(v).text();
    var c=confirm("Are you sure ?");
    if(c == true){
        $(v).text("Loading...");
        $(v).attr("disabled",true);

        var method="POST";
        var url=li+"saveReqCancel";
        var data={
            id:id,
        }
        ajaxSetup(function (data)
        {

            alert(data.msg);
            if(data.status == '1')
            {
                window.location.reload();
            }
            $(v).text(btn_text);
            $(v).attr("disabled",false);

        },method,url,data);
    }
}
function btnSaveRecheckAck(v) {
    var list=[];var i=0;
    $(".chq_task_recheck").each(function () {
        if($(this).is(":checked"))
        {
            i++;
            var id=$(this).val();
            var remarks=$(".tarea-"+id).val();
            var data={
                id:id,
                remarks:remarks,
            }
            list.push(data);
        }
    });
    if(i == '0')
        alert("Data is empty...");
    else{

        $(v).text("Loading...");
        $(v).attr("disabled",true);
        var combineList=JSON.stringify(list);
        var method = "POST";
        var url = li + "saveRecheckInfoAck";
        var data = {
            list:combineList,
        }
        ajaxSetup(function (data) {
            if (data.status == '1')
            {
                window.location.reload();
            }
            else
                alert(data.msg);

        }, method, url, data);

    }
}
function showRecheckList(data) {
    $("#tbody_task_recheck").empty();
    var list="";var i=1;
    $.each(data.list,function (key,val)
    {
            var txt="<textarea class='tarea-"+val.id+"'>"+val.feedback_msg+"</textarea>";
            if(val.is_editable == '')
                txt=val.feedback_msg;
            list=list+"<tr>"
                            +"<td>"+i+"</td>"
                            +"<td>"+val.notes+"</td>"
                            +"<td>"+txt+"</td>"
                            +"<td style='color: "+val.color+"'>"+val.status+"</td>"
                            +"<td>"+val.pb+"</td>"
                            +"<td><input class='chq_task_recheck' type='checkbox' value='"+val.id+"' /></td>"
                        +"</tr>";
            i++;
    });
    $("#tbody_task_recheck").html(list);
}
function btnModalTaskRecheck(v,id)
{
    $("#openModalRecheck").modal("show");
    $("#btnTaskId").val(id);

    var method="GET";
    var url=li+"getRecheckTaskNotesApi";
    var data={
        task_id:id,
    }
    ajaxSetup(function (data)
    {
        showRecheckList(data);
    },method,url,data);
}
function btnRecheckNotes(v) {

    var task_id=$("#btnTaskId").val();
    //var notes=$("#notes").val();
    var notes = CKEDITOR.instances.notes.getData();
    //console.log(ck_ed);


    if(typeof task_id == 'undefined')
        alert("Task id is required");
    else if(notes == '' || typeof notes == 'undefined' || notes === null)
        alert("Notes is required");
    else{

        $(v).text("Loading...");
        $(v).attr("disabled",true);
        var c=confirm("Are you sure ?");
        if (c == true) {
            var method = "POST";
            var url = li + "saveRecheckNotesApi";
            var data = {
                notes: notes,
                task_id: task_id,
            }
            ajaxSetup(function (data) {
                if (data.status == '1') {
                    $("#openModalRecheck").modal("hide");
                    $("#btnTaskId").val(0);
                    window.location.reload();
                }
            }, method, url, data);
        }
    }
}
function btntaskApprove(v) {
    $("#openModalPerformance").modal("show");
}
function openStatusModal(v,id) {
    resetStatusInfo();
    $("#openModalStatusTask").modal("show");
    $("#btnTaskId").val(id);

    var method="POST";
    var url=li+"getTaskInfoByApi";
    var data={
        id:id,
    }
    ajaxSetup(function (data)
    {
        $("#div_status_active").show();
        $("#div_status_request").hide();

        $.each(data.info,function (key,val)
        {
            if(val.status == '60'){
                $("#is_report_only").val(1);
                $("#div_status_active").hide();
                $("#div_status_request").show();
                $("#status_text").text("Requested For Finish");
            }
            else{
                setModalStatusList(data);
            }

        });
    },method,url,data);
}
function setModalStatusList(data) {
    var option="";
    $.each(data.sList,function (key,val) {
        option=option+"<option value='"+val.status_id+"'>"+val.name+"</option>";
    });
    $("#status_list").html(option);
    $('#status_list').selectpicker('refresh');
}
function resetStatusInfo(){
    $("#is_report_only").val(0);
    var status_id=$("#status_list").val();
    $("#remakrs").val("");
    $("#report_title").val("");
    $("#report_remarks").val("");
    $("#btnTaskId").val(0);

    var option="<option value='0'></option>";
    $("#status_list").html(option);
    $('#status_list').selectpicker('refresh');
}
function saveNewTaskInfo(v) {

    var status_id=$("#status_list").val();
    var remakrs=$("#remakrs").val();
    var report_title=$("#report_title").val();
    var report_remarks=$("#report_remarks").val();
    var task_id=$("#btnTaskId").val();
    var is_report_only=$("#is_report_only").val();

    if(typeof task_id == 'undefined' || task_id == '')
        alert("Task id is required")
    else if((typeof status_id == 'undefined' || status_id == '0') && is_report_only == '0' )
        alert("Status is required")
    else if(is_report_only == '1' && report_title == '')
        alert("Report title is required");
    else{
        var btn_text=$(v).text();
        var c=confirm("Are you sure ?");
        if(c == true){
            $(v).text("Loading...");
            $(v).attr("disabled",true);

            var method="POST";
            var url=li+"saveNewTaskInfoApi";
            var data={
                status_id:status_id,
                remakrs:remakrs,
                report_title:report_title,
                report_remarks:report_remarks,
                task_id:task_id,
            }
            ajaxSetup(function (data)
            {

                alert(data.msg);
                if(data.status == '1')
                {
                    resetStatusInfo();
                    window.location.reload();
                }
                $(v).text(btn_text);
                $(v).attr("disabled",false);
                $("#openModalStatusTask").modal("hide");
            },method,url,data);
        }
    }


}