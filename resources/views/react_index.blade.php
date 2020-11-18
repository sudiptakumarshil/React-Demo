<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="<?= asset('public/assets/images/favicon.png') ?>" type="image/gif" sizes="16x16">
    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="author" content="">
    <title>E Store</title>
    <link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link href="{{ asset('public/css/app.css') }}" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/dataTables.bootstrap.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/jquery.dataTables.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/bootstrap-datetimepicker.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/bootstrap-datepicker.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/bootstrap-select.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/select2.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/font-awesome.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/icofont.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/fullcalendar.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/style.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/datatables-select.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset('public/assets/css/bootstrap-timepicker.css') ?>">

    {{--    for tree view--}}
    <link rel=" stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.css">
    <link rel="stylesheet" href=" https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.6/css/responsive.bootstrap.min.css">

    <link rel="stylesheet" href=" https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.6/css/responsive.bootstrap4.min.css">

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script src="{{ asset('public/assets/js/jquery-3.2.1.min.js') }}"></script>

    {{--
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>

    <!-- (Optional) Latest compiled and minified JavaScript translation files -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js"></script>
    --}}



    <script type="text/javascript" src="<?= asset('public/assets/js/google-chart.js') ?>"></script>
    <script src="https://cdn.ckeditor.com/4.14.1/standard/ckeditor.js"></script>
    <script src="http://vitalets.github.io/bootstrap-datepicker/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="<?= asset('public/assets/js/moment.min.js') ?>"></script>
    <script type="text/javascript" src="<?= asset('public/assets/js/bootstrap-datepicker.min.js') ?>"></script>
    <script type="text/javascript" src="<?= asset('public/assets/js/bootstrap-timepicker.js') ?>"></script>
    <script type="text/javascript" src="<?= asset('public/assets/js/bootstrap-datetimepicker.min.js') ?>"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.js"></script>
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

     {{--    for react treeview--}}
    <script
    src=" https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>

    <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>

    <script>
        var Alert = ReactBootstrap.Alert;

    </script>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>
    <script>
        $(document).ready(function() {
            $('.selectpicker').selectpicker();
        });
    </script>
</head>

<body>
    <div id="root"></div>
    <!--<div class="main-wrapper slide-nav">
        <div class="header">
            <div class="container-fluid">
                <div class="header-left">
                    <a id="toggle-menu" href="#sidebar" class="logo">
                        <i class="icofont-navigation-menu"></i>
                    </a>
                </div>
                <div class="header-right">
                    <div class="page-title-box pull-left">
                        <h3>

                        </h3>
                    </div>

                    <div style="text-align: center;">
                    <ul class="nav navbar-nav navbar-right user-menu pull-right">
                        <div class="dropdown">
                            <a class="dropdown-toggle" href="#" role="button" id="profileLinkDropdown"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span><i class="far fa-user"></i></span> Admin
                            </a>

                            <div class="dropdown-menu" aria-labelledby="profileLinkDropdown">
                                <a class="dropdown-item" href="#">Profile</a>
                                <a class="dropdown-item" href="#">Setting</a>
                                <a class="dropdown-item" href="">Password Change</a>
                                <a class="dropdown-item" href="">Logout</a>
                            </div>
                        </div>

                    </ul>
                    </div>


                    <div class="dropdown mobile-user-menu pull-right">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                        aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                        <ul class="dropdown-menu pull-right">
                            <li><a href="">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
    </div>
        <div class="sidebar opened" id="sidebar">
            <div class="sidebar-inner slimscroll">
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li>
                            <a href=""><i class="icofont-speed-meter"></i> Dashboard</a>
                        </li>
                            <li class="submenu">
                            <a href="#">
                                <i class="icofont-list"></i>
                                <span>Project</span>
                                <span class="menu-arrow">
                                    <i class="icofont-simple-right"></i>
                                </span>
                            </a>
                            <ul class="list-unstyled" style="display: none;">
                                <li class="">
                                    <a data-id="0"
                                       href="{{ url('/newProject') }}">New
                                    </a>
                                </li>
                                <li class="">
                                    <a data-id="0"
                                       href="{{ url('/projectList') }}">All
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="submenu">
                            <a href="#">
                                <i class="icofont-list"></i>
                                <span>Task</span>
                                <span class="menu-arrow">
                                    <i class="icofont-simple-right"></i>
                                </span>
                            </a>
                            <ul class="list-unstyled" style="display: none;">
                                <li class="">
                                    <a data-id="0"
                                    href="{{ url('/create_new_task') }}">New
                                    </a>
                                </li>
                                <li class="">
                                    <a data-id="0"
                                    href="{{ url('/task_all') }}">All
                                    </a>
                                </li>
                                <li class="">
                                    <a data-id="0"
                                       href="{{ url('/req_task_list') }}"> Request List
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="submenu">
                            <a href="#">
                                <i class="icofont-list"></i>
                                <span>Report</span>
                                <span class="menu-arrow">
                                    <i class="icofont-simple-right"></i>
                                </span>
                            </a>
                            <ul class="list-unstyled" style="display: none;">
                                <li class="">
                                    <a data-id="0"
                                       href="{{ url('/report_all') }}">All
                                    </a>
                                </li>
                                <li class="">
                                    <a data-id="0"
                                       href="{{ url('/getTaskSituation') }}"> Task Status
                                    </a>
                                </li>
                                <li class="">
                                    <a data-id="0"
                                       href="{{ url('/taskDetailsReport') }}">Activites
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="page-wrapper">
            @yield('content')
        </div>
    </div>-->
    <div class="sidebar-overlay" data-reff=""></div>
    <script src="{{ asset('public/js/app.js') }}"></script>
    <script type="text/javascript" src="<?= asset('public/assets/js/moment.min.js') ?>"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/dataTables.bootstrap.min.js') ?>"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/jquery.dataTables.min.js') ?>"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/bootstrap-datetimepicker.min.js') ?>"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/bootstrap-datepicker.min.js') ?>"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.18/js/bootstrap-select.min.js"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/Chart.bundle.min.js') ?>"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/Chart.min.js') ?>"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/jquery.slimscroll.js') ?>"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/app.js') ?>"></script>
        <script type="text/javascript" src="<?= asset('public/assets/js/datatables-select.min.js') ?>"></script>
        <script>

            $(document).ready( function () {
                $('.datatable').DataTable();
            } );

            @yield('script')
        </script>

        <script>
            $(document).ready(function() {
    $('#example').DataTable();
} );
        </script>
        <script>
            !function(e){"use strict";function t(e,t){return e.toUpperCase().indexOf(t.toUpperCase())>-1}function i(t){return e.each([{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}],function(){t=t.replace(this.re,this.ch)}),t}function n(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},i="(?:"+Object.keys(t).join("|")+")",n=new RegExp(i),s=new RegExp(i,"g"),o=null==e?"":""+e;return n.test(o)?o.replace(s,function(e){return t[e]}):o}e.expr[":"].icontains=function(i,n,s){return t(e(i).text(),s[3])},e.expr[":"].aicontains=function(i,n,s){return t(e(i).data("normalizedText")||e(i).text(),s[3])};var s=function(t,i,n){n&&(n.stopPropagation(),n.preventDefault()),this.$element=e(t),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=i,null===this.options.title&&(this.options.title=this.$element.attr("title")),this.val=s.prototype.val,this.render=s.prototype.render,this.refresh=s.prototype.refresh,this.setStyle=s.prototype.setStyle,this.selectAll=s.prototype.selectAll,this.deselectAll=s.prototype.deselectAll,this.destroy=s.prototype.remove,this.remove=s.prototype.remove,this.show=s.prototype.show,this.hide=s.prototype.hide,this.init()};function o(t,i){var n,o=arguments,a=t;t=o[0],i=o[1];[].shift.apply(o),void 0===t&&(t=a);var l=this.each(function(){var a=e(this);if(a.is("select")){var l=a.data("selectpicker"),d="object"==typeof t&&t;if(l){if(d)for(var r in d)d.hasOwnProperty(r)&&(l.options[r]=d[r])}else{var c=e.extend({},s.DEFAULTS,e.fn.selectpicker.defaults||{},a.data(),d);a.data("selectpicker",l=new s(this,c,i))}"string"==typeof t&&(n=l[t]instanceof Function?l[t].apply(l,o):l.options[t])}});return void 0!==n?n:l}s.VERSION="1.6.2",s.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"No results match",countSelectedText:function(e,t){return 1==e?"{0} item selected":"{0} items selected"},maxOptionsText:function(e,t){var i=[];return i[0]=1==e?"Limit reached ({n} item max)":"Limit reached ({n} items max)",i[1]=1==t?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)",i},selectAllText:"Select All",deselectAllText:"Deselect All",multipleSeparator:", ",style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,actionsBox:!1,iconBase:"glyphicon",tickIcon:"glyphicon-ok",maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1,searchAccentInsensitive:!1},s.prototype={constructor:s,init:function(){var t=this,i=this.$element.attr("id");this.$element.hide(),this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.$element.after(this.$newElement),this.$menu=this.$newElement.find("> .dropdown-menu"),this.$button=this.$newElement.find("> button"),this.$searchbox=this.$newElement.find("input"),this.options.dropdownAlignRight&&this.$menu.addClass("dropdown-menu-right"),void 0!==i&&(this.$button.attr("data-id",i),e('label[for="'+i+'"]').click(function(e){e.preventDefault(),t.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.liHeight(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this),this.options.mobile&&this.mobile()},createDropdown:function(){var t=this.multiple?" show-tick":"",i=this.$element.parent().hasClass("input-group")?" input-group-btn":"",n=this.autofocus?" autofocus":"",s=this.$element.parents().hasClass("form-group-lg")?" btn-lg":this.$element.parents().hasClass("form-group-sm")?" btn-sm":"",o=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"",a=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>':"",l=this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn-group btn-block"><button class="actions-btn bs-select-all btn btn-sm btn-default">'+this.options.selectAllText+'</button><button class="actions-btn bs-deselect-all btn btn-sm btn-default">'+this.options.deselectAllText+"</button></div></div>":"";return e('<div class="btn-group bootstrap-select'+t+i+'"><button type="button" class="btn dropdown-toggle selectpicker'+s+'" data-toggle="dropdown"'+n+'><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">'+o+a+l+'<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>')},createView:function(){var e=this.createDropdown(),t=this.createLi();return e.find("ul").append(t),e},reloadLi:function(){this.destroyLi();var e=this.createLi();this.$menu.find("ul").append(e)},destroyLi:function(){this.$menu.find("li").remove()},createLi:function(){var t=this,s=[],o=0,a=function(e,t,i){return"<li"+(void 0!==i?' class="'+i+'"':"")+(void 0!==t|null===t?' data-original-index="'+t+'"':"")+">"+e+"</li>"},l=function(e,s,o,a){var l=i(n(e));return'<a tabindex="0"'+(void 0!==s?' class="'+s+'"':"")+(void 0!==o?' style="'+o+'"':"")+(void 0!==a?'data-optgroup="'+a+'"':"")+' data-normalized-text="'+l+'">'+e+'<span class="'+t.options.iconBase+" "+t.options.tickIcon+' check-mark"></span></a>'};return this.$element.find("option").each(function(){var i=e(this),n=i.attr("class")||"",d=i.attr("style"),r=i.data("content")?i.data("content"):i.html(),c=void 0!==i.data("subtext")?'<small class="muted text-muted">'+i.data("subtext")+"</small>":"",h=void 0!==i.data("icon")?'<span class="'+t.options.iconBase+" "+i.data("icon")+'"></span> ':"",p=i.is(":disabled")||i.parent().is(":disabled"),u=i[0].index;if(""!==h&&p&&(h="<span>"+h+"</span>"),i.data("content")||(r=h+'<span class="text">'+r+c+"</span>"),!t.options.hideDisabled||!p)if(i.parent().is("optgroup")&&!0!==i.data("divider")){if(0===i.index()){o+=1;var f=i.parent().attr("label"),m=void 0!==i.parent().data("subtext")?'<small class="muted text-muted">'+i.parent().data("subtext")+"</small>":"";f=(i.parent().data("icon")?'<span class="'+t.options.iconBase+" "+i.parent().data("icon")+'"></span> ':"")+'<span class="text">'+f+m+"</span>",0!==u&&s.length>0&&s.push(a("",null,"divider")),s.push(a(f,null,"dropdown-header"))}s.push(a(l(r,"opt "+n,d,o),u))}else!0===i.data("divider")?s.push(a("",u,"divider")):!0===i.data("hidden")?s.push(a(l(r,n,d),u,"hide is-hidden")):s.push(a(l(r,n,d),u))}),this.multiple||0!==this.$element.find("option:selected").length||this.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),e(s.join(""))},findLis:function(){return null==this.$lis&&(this.$lis=this.$menu.find("li")),this.$lis},render:function(t){var i=this;!1!==t&&this.$element.find("option").each(function(t){i.setDisabled(t,e(this).is(":disabled")||e(this).parent().is(":disabled")),i.setSelected(t,e(this).is(":selected"))}),this.tabIndex();var s=this.options.hideDisabled?":not([disabled])":"",o=this.$element.find("option:selected"+s).map(function(){var t,n=e(this),s=n.data("icon")&&i.options.showIcon?'<i class="'+i.options.iconBase+" "+n.data("icon")+'"></i> ':"";return t=i.options.showSubtext&&n.attr("data-subtext")&&!i.multiple?' <small class="muted text-muted">'+n.data("subtext")+"</small>":"",n.data("content")&&i.options.showContent?n.data("content"):void 0!==n.attr("title")?n.attr("title"):s+n.html()+t}).toArray(),a=this.multiple?o.join(this.options.multipleSeparator):o[0];if(this.multiple&&this.options.selectedTextFormat.indexOf("count")>-1){var l=this.options.selectedTextFormat.split(">");if(l.length>1&&o.length>l[1]||1==l.length&&o.length>=2){s=this.options.hideDisabled?", [disabled]":"";var d=this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]'+s).length;a=("function"==typeof this.options.countSelectedText?this.options.countSelectedText(o.length,d):this.options.countSelectedText).replace("{0}",o.length.toString()).replace("{1}",d.toString())}}this.options.title=this.$element.attr("title"),"static"==this.options.selectedTextFormat&&(a=this.options.title),a||(a=void 0!==this.options.title?this.options.title:this.options.noneSelectedText),this.$button.attr("title",n(a)),this.$newElement.find(".filter-option").html(a)},setStyle:function(e,t){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi,""));var i=e||this.options.style;"add"==t?this.$button.addClass(i):"remove"==t?this.$button.removeClass(i):(this.$button.removeClass(this.options.style),this.$button.addClass(i))},liHeight:function(){if(!1!==this.options.size){var e=this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus",!1).end().appendTo("body"),t=e.addClass("open").find("> .dropdown-menu"),i=t.find("li").not(".divider").not(".dropdown-header").filter(":visible").children("a").outerHeight(),n=this.options.header?t.find(".popover-title").outerHeight():0,s=this.options.liveSearch?t.find(".bs-searchbox").outerHeight():0,o=this.options.actionsBox?t.find(".bs-actionsbox").outerHeight():0;e.remove(),this.$newElement.data("liHeight",i).data("headerHeight",n).data("searchHeight",s).data("actionsHeight",o)}},setSize:function(){this.findLis();var t,i,n,s=this,o=this.$menu,a=o.find(".inner"),l=this.$newElement.outerHeight(),d=this.$newElement.data("liHeight"),r=this.$newElement.data("headerHeight"),c=this.$newElement.data("searchHeight"),h=this.$newElement.data("actionsHeight"),p=this.$lis.filter(".divider").outerHeight(!0),u=parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom"))+parseInt(o.css("border-top-width"))+parseInt(o.css("border-bottom-width")),f=this.options.hideDisabled?", .disabled":"",m=e(window),v=u+parseInt(o.css("margin-top"))+parseInt(o.css("margin-bottom"))+2,b=function(){i=s.$newElement.offset().top-m.scrollTop(),n=m.height()-i-l};if(b(),this.options.header&&o.css("padding-top",0),"auto"==this.options.size){var $=function(){var e,l=s.$lis.not(".hide");b(),t=n-v,s.options.dropupAuto&&s.$newElement.toggleClass("dropup",i>n&&t-v<o.height()),s.$newElement.hasClass("dropup")&&(t=i-v),e=l.length+l.filter(".dropdown-header").length>3?3*d+v-2:0,o.css({"max-height":t+"px",overflow:"hidden","min-height":e+r+c+h+"px"}),a.css({"max-height":t-r-c-h-u+"px","overflow-y":"auto","min-height":Math.max(e-u,0)+"px"})};$(),this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize",$),e(window).off("resize.getSize").on("resize.getSize",$),e(window).off("scroll.getSize").on("scroll.getSize",$)}else if(this.options.size&&"auto"!=this.options.size&&o.find("li"+f).length>this.options.size){var g=this.$lis.not(".divider"+f).find(" > *").slice(0,this.options.size).last().parent().index(),x=this.$lis.slice(0,g+1).filter(".divider").length;t=d*this.options.size+x*p+u,s.options.dropupAuto&&this.$newElement.toggleClass("dropup",i>n&&t<o.height()),o.css({"max-height":t+r+c+h+"px",overflow:"hidden"}),a.css({"max-height":t-u+"px","overflow-y":"auto"})}},setWidth:function(){if("auto"==this.options.width){this.$menu.css("min-width","0");var e=this.$newElement.clone().appendTo("body"),t=e.find("> .dropdown-menu").css("width"),i=e.css("width","auto").find("> button").css("width");e.remove(),this.$newElement.css("width",Math.max(parseInt(t),parseInt(i))+"px")}else"fit"==this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){var t,i,n=this,s=e("<div />"),o=function(e){s.addClass(e.attr("class").replace(/form-control/gi,"")).toggleClass("dropup",e.hasClass("dropup")),t=e.offset(),i=e.hasClass("dropup")?0:e[0].offsetHeight,s.css({top:t.top+i,left:t.left,width:e[0].offsetWidth,position:"absolute"})};this.$newElement.on("click",function(){n.isDisabled()||(o(e(this)),s.appendTo(n.options.container),s.toggleClass("open",!e(this).hasClass("open")),s.append(n.$menu))}),e(window).resize(function(){o(n.$newElement)}),e(window).on("scroll",function(){o(n.$newElement)}),e("html").on("click",function(t){e(t.target).closest(n.$newElement).length<1&&s.removeClass("open")})},setSelected:function(e,t){this.findLis(),this.$lis.filter('[data-original-index="'+e+'"]').toggleClass("selected",t)},setDisabled:function(e,t){this.findLis(),t?this.$lis.filter('[data-original-index="'+e+'"]').addClass("disabled").find("a").attr("href","#").attr("tabindex",-1):this.$lis.filter('[data-original-index="'+e+'"]').removeClass("disabled").find("a").removeAttr("href").attr("tabindex",0)},isDisabled:function(){return this.$element.is(":disabled")},checkDisabled:function(){var e=this;this.isDisabled()?this.$button.addClass("disabled").attr("tabindex",-1):(this.$button.hasClass("disabled")&&this.$button.removeClass("disabled"),-1==this.$button.attr("tabindex")&&(this.$element.data("tabindex")||this.$button.removeAttr("tabindex"))),this.$button.click(function(){return!e.isDisabled()})},tabIndex:function(){this.$element.is("[tabindex]")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex")))},clickListener:function(){var t=this;this.$newElement.on("touchstart.dropdown",".dropdown-menu",function(e){e.stopPropagation()}),this.$newElement.on("click",function(){t.setSize(),t.options.liveSearch||t.multiple||setTimeout(function(){t.$menu.find(".selected a").focus()},10)}),this.$menu.on("click","li a",function(i){var n=e(this),s=n.parent().data("originalIndex"),o=t.$element.val(),a=t.$element.prop("selectedIndex");if(t.multiple&&i.stopPropagation(),i.preventDefault(),!t.isDisabled()&&!n.parent().hasClass("disabled")){var l=t.$element.find("option"),d=l.eq(s),r=d.prop("selected"),c=d.parent("optgroup"),h=t.options.maxOptions,p=c.data("maxOptions")||!1;if(t.multiple){if(d.prop("selected",!r),t.setSelected(s,!r),n.blur(),!1!==h||!1!==p){var u=h<l.filter(":selected").length,f=p<c.find("option:selected").length;if(h&&u||p&&f)if(h&&1==h)l.prop("selected",!1),d.prop("selected",!0),t.$menu.find(".selected").removeClass("selected"),t.setSelected(s,!0);else if(p&&1==p){c.find("option:selected").prop("selected",!1),d.prop("selected",!0);var m=n.data("optgroup");t.$menu.find(".selected").has('a[data-optgroup="'+m+'"]').removeClass("selected"),t.setSelected(s,!0)}else{var v="function"==typeof t.options.maxOptionsText?t.options.maxOptionsText(h,p):t.options.maxOptionsText,b=v[0].replace("{n}",h),$=v[1].replace("{n}",p),g=e('<div class="notify"></div>');v[2]&&(b=b.replace("{var}",v[2][h>1?0:1]),$=$.replace("{var}",v[2][p>1?0:1])),d.prop("selected",!1),t.$menu.append(g),h&&u&&(g.append(e("<div>"+b+"</div>")),t.$element.trigger("maxReached.bs.select")),p&&f&&(g.append(e("<div>"+$+"</div>")),t.$element.trigger("maxReachedGrp.bs.select")),setTimeout(function(){t.setSelected(s,!1)},10),g.delay(750).fadeOut(300,function(){e(this).remove()})}}}else l.prop("selected",!1),d.prop("selected",!0),t.$menu.find(".selected").removeClass("selected"),t.setSelected(s,!0);t.multiple?t.options.liveSearch&&t.$searchbox.focus():t.$button.focus(),(o!=t.$element.val()&&t.multiple||a!=t.$element.prop("selectedIndex")&&!t.multiple)&&t.$element.change()}}),this.$menu.on("click","li.disabled a, .popover-title, .popover-title :not(.close)",function(e){e.target==this&&(e.preventDefault(),e.stopPropagation(),t.options.liveSearch?t.$searchbox.focus():t.$button.focus())}),this.$menu.on("click","li.divider, li.dropdown-header",function(e){e.preventDefault(),e.stopPropagation(),t.options.liveSearch?t.$searchbox.focus():t.$button.focus()}),this.$menu.on("click",".popover-title .close",function(){t.$button.focus()}),this.$searchbox.on("click",function(e){e.stopPropagation()}),this.$menu.on("click",".actions-btn",function(i){t.options.liveSearch?t.$searchbox.focus():t.$button.focus(),i.preventDefault(),i.stopPropagation(),e(this).is(".bs-select-all")?t.selectAll():t.deselectAll(),t.$element.change()}),this.$element.change(function(){t.render(!1)})},liveSearchListener:function(){var t=this,s=e('<li class="no-results"></li>');this.$newElement.on("click.dropdown.data-api",function(){t.$menu.find(".active").removeClass("active"),t.$searchbox.val()&&(t.$searchbox.val(""),t.$lis.not(".is-hidden").removeClass("hide"),s.parent().length&&s.remove()),t.multiple||t.$menu.find(".selected").addClass("active"),setTimeout(function(){t.$searchbox.focus()},10)}),this.$searchbox.on("input propertychange",function(){var o;t.$searchbox.val()?(t.options.searchAccentInsensitive?t.$lis.not(".is-hidden").removeClass("hide").find("a").not(":aicontains("+i(t.$searchbox.val())+")").parent().addClass("hide"):t.$lis.not(".is-hidden").removeClass("hide").find("a").not(":icontains("+t.$searchbox.val()+")").parent().addClass("hide"),t.$menu.find("li").filter(":visible:not(.no-results)").length?s.parent().length&&s.remove():(s.parent().length&&s.remove(),s.html(t.options.noneResultsText+' "'+n(t.$searchbox.val())+'"').show(),t.$menu.find("li").last().after(s))):(t.$lis.not(".is-hidden").removeClass("hide"),s.parent().length&&s.remove()),t.$menu.find("li.active").removeClass("active"),t.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus(),e(this).focus(),t.$lis.find("a").each(function(){e(this).data("normalized-text").indexOf("other")>-1&&(o=e(this))}),o.parent().removeClass("hide").show()})},val:function(e){return void 0!==e?(this.$element.val(e),this.render(),this.$element):this.$element.val()},selectAll:function(){this.findLis(),this.$lis.not(".divider").not(".disabled").not(".selected").filter(":visible").find("a").click()},deselectAll:function(){this.findLis(),this.$lis.not(".divider").not(".disabled").filter(".selected").filter(":visible").find("a").click()},keydown:function(t){var n,s,o,a,l,d,r,c,h,p=e(this),u=p.is("input")?p.parent().parent():p.parent(),f=u.data("this"),m={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};if(f.options.liveSearch&&(u=p.parent().parent()),f.options.container&&(u=f.$menu),n=e("[role=menu] li a",u),!(h=f.$menu.parent().hasClass("open"))&&/([0-9]|[A-z])/.test(String.fromCharCode(t.keyCode))&&(f.options.container?f.$newElement.trigger("click"):(f.setSize(),f.$menu.parent().addClass("open"),h=!0),f.$searchbox.focus()),f.options.liveSearch&&(/(^9$|27)/.test(t.keyCode.toString(10))&&h&&0===f.$menu.find(".active").length&&(t.preventDefault(),f.$menu.parent().removeClass("open"),f.$button.focus()),n=e("[role=menu] li:not(.divider):not(.dropdown-header):visible",u),p.val()||/(38|40)/.test(t.keyCode.toString(10))||0===n.filter(".active").length&&(n=f.options.searchAccentInsensitive?f.$newElement.find("li").filter(":aicontains("+i(m[t.keyCode])+")"):f.$newElement.find("li").filter(":icontains("+m[t.keyCode]+")"))),n.length){if(/(38|40)/.test(t.keyCode.toString(10)))s=n.index(n.filter(":focus")),a=n.parent(":not(.disabled):visible").first().index(),l=n.parent(":not(.disabled):visible").last().index(),o=n.eq(s).parent().nextAll(":not(.disabled):visible").eq(0).index(),d=n.eq(s).parent().prevAll(":not(.disabled):visible").eq(0).index(),r=n.eq(o).parent().prevAll(":not(.disabled):visible").eq(0).index(),f.options.liveSearch&&(n.each(function(t){e(this).is(":not(.disabled)")&&e(this).data("index",t)}),s=n.index(n.filter(".active")),a=n.filter(":not(.disabled):visible").first().data("index"),l=n.filter(":not(.disabled):visible").last().data("index"),o=n.eq(s).nextAll(":not(.disabled):visible").eq(0).data("index"),d=n.eq(s).prevAll(":not(.disabled):visible").eq(0).data("index"),r=n.eq(o).prevAll(":not(.disabled):visible").eq(0).data("index")),c=p.data("prevIndex"),38==t.keyCode&&(f.options.liveSearch&&(s-=1),s!=r&&s>d&&(s=d),s<a&&(s=a),s==c&&(s=l)),40==t.keyCode&&(f.options.liveSearch&&(s+=1),-1==s&&(s=0),s!=r&&s<o&&(s=o),s>l&&(s=l),s==c&&(s=a)),p.data("prevIndex",s),f.options.liveSearch?(t.preventDefault(),p.is(".dropdown-toggle")||(n.removeClass("active"),n.eq(s).addClass("active").find("a").focus(),p.focus())):n.eq(s).focus();else if(!p.is("input")){var v,b=[];n.each(function(){e(this).parent().is(":not(.disabled)")&&e.trim(e(this).text().toLowerCase()).substring(0,1)==m[t.keyCode]&&b.push(e(this).parent().index())}),v=e(document).data("keycount"),v++,e(document).data("keycount",v),e.trim(e(":focus").text().toLowerCase()).substring(0,1)!=m[t.keyCode]?(v=1,e(document).data("keycount",v)):v>=b.length&&(e(document).data("keycount",0),v>b.length&&(v=1)),n.eq(b[v-1]).focus()}(/(13|32)/.test(t.keyCode.toString(10))||/(^9$)/.test(t.keyCode.toString(10))&&f.options.selectOnTab)&&h&&(/(32)/.test(t.keyCode.toString(10))||t.preventDefault(),f.options.liveSearch?/(32)/.test(t.keyCode.toString(10))||(f.$menu.find(".active a").click(),p.focus()):e(":focus").click(),e(document).data("keycount",0)),(/(^9$|27)/.test(t.keyCode.toString(10))&&h&&(f.multiple||f.options.liveSearch)||/(27)/.test(t.keyCode.toString(10))&&!h)&&(f.$menu.parent().removeClass("open"),f.$button.focus())}},mobile:function(){this.$element.addClass("mobile-device").appendTo(this.$newElement),this.options.container&&this.$menu.hide()},refresh:function(){this.$lis=null,this.reloadLi(),this.render(),this.setWidth(),this.setStyle(),this.checkDisabled(),this.liHeight()},update:function(){this.reloadLi(),this.setWidth(),this.setStyle(),this.checkDisabled(),this.liHeight()},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()}};var a=e.fn.selectpicker;e.fn.selectpicker=o,e.fn.selectpicker.Constructor=s,e.fn.selectpicker.noConflict=function(){return e.fn.selectpicker=a,this},e(document).data("keycount",0).on("keydown",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input",s.prototype.keydown).on("focusin.modal",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input",function(e){e.stopPropagation()}),e(window).on("load.bs.select.data-api",function(){e(".selectpicker").each(function(){var t=e(this);o.call(t,t.data())})})}(jQuery);

$('.selectpicker').selectpicker({
     noneResultsText: 'I found no results'
});

$(document).ready(function() {
    $('#example').DataTable();
} );
        </script>



</body>

</html>
