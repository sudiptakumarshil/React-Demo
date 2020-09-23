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
    <title>Task Manage</title>
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

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.css">
    <link rel="stylesheet" href=" https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.6/css/responsive.bootstrap.min.css">

    <link rel="stylesheet" href=" https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.6/css/responsive.bootstrap4.min.css">








    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script src="{{ asset('public/assets/js/jquery-3.2.1.min.js') }}"></script>

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
    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
    crossorigin></script>

    <script
    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
    crossorigin></script>

    <script>var Alert = ReactBootstrap.Alert;</script>

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
</body>

</html>
