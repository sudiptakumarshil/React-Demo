$("#ajax_form_submit").submit(function(e) 
{
    var btn_text=$("#btnSave").text();
    $("#btnSave").text("Uploading....");
    $("#btnSave").attr("disabled",true);
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
           type: "POST",
           url: url,
           dataType: 'json',
           contentType: false,
           cache: false,
           processData: false,
           data: new FormData(this), // serializes the form's elements.
           success: function(data)
           {
               $("#btnSave").text("Save");
               $("#btnSave").attr("disabled",false);
               //toastr.success(data.msg);
               //$('.toast').toast('show');
               showJsSnackbar(data.msg);
               //if(data.status == '1')
                    //window.location.reload();
                
                    
           }
   });

});
function showJsSnackbar(msg){
    $(".toast_text").text(msg);
    var x = document.getElementById("snackbar");
    setTimeout(function () {
        x.className = "show";
    }, 1);
    setTimeout(function () 
    {
        x.className = x.className.replace("show", "hide");
    }, 15000);
    $("#snackbar .close").click(function () 
    {
        x.className = x.className.replace("show", "hide");
    });
}
function readURL(input) {
    var data_id=$(input).attr("data-id");
    var row=$(input).attr("data-row");
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $(data_id).attr('src', e.target.result);
            $("#mh"+row).attr("disabled",false);
        }
        reader.readAsDataURL(input.files[0]);
    }
    $(data_id).show();
}
$(".image_upload").change(function() 
{
    readURL(this);
});
$(document).ready(function () 
  {
      
      
      //$(".default_image_hide").hide();

     ClassicEditor
    .create( document.querySelector( '#specifications' ) )
    .catch( error => {
        console.error( error );
    } );
    
    ClassicEditor
    .create( document.querySelector( '#terms_condition' ) )
    .catch( error => {
        console.error( error );
    } );
    /*var li=getUrl();
    var url=li + "vendor/getProductCategory";
    var method="GET";
    var data={
        id:0,
    };
    ajaxSetup(function (data) 
    {
        loadTreeData(data.list);
    },method,url,data);*/
});
function setStoreInfo(data)
{
    //alert("ok="+data.store_type_info.is_custom_category);
    var options="<option value='"+data.store_type_info.id+"'>"+data.store_type_info.name+"</option>";
    $("#store_type").html(options);
}
function getCategoryList(v)
{
    var value=$(v).val();
    if(value > 0){
        getCategoryId(value);
    }
    
}
function openCategoryModal(){
    $("#modalCategoryCreate").show();
}
function getCategoryId(value){

    $("#btnCateCreate").hide();
    var li=getUrl();
    var url=li + "vendor/getProductCategory";
    var method="GET";
    var data={
        id:value,
    };
    ajaxSetup(function (data) 
    {
        if(data.store_type_info.is_c_category == '2')
        {
            $("#btnCateCreate").show();
        }
        setStoreInfo(data);
        loadTreeData(data.list);
    },method,url,data);
}
function loadTreeData(data,node_id=1){
    $('#tree').treeview({
        selectable: true,
        multiSelect: true,
        highlightSelected: false,
        showBorder: false,
        showCheckbox: true,
        levels: 3,
        backColor: 'white',
        expandIcon: 'fa fa-plus',
        collapseIcon: 'fa fa-minus',
        data: data,
        }).on('nodeSelected', function(event, data) {
            var ans = Array.isArray(data.nodes);
            if(!ans)
            {
                
            }
            else{
                 $(".category_name").val(data.acc_name);
                 $(".category_id").val(data.id);
            }
        });

}
