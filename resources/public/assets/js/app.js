// Sidebar

! function($) {
    "use strict";
    var Sidemenu = function() {
        this.$menuItem = $("#sidebar-menu a");
    };

	Sidemenu.prototype.init = function() {
		var $this = this;
		$this.$menuItem.on('click', function(e) {
		if ($(this).parent().hasClass("submenu")) {
			e.preventDefault();
		}
		if (!$(this).hasClass("subdrop")) {
			$("ul", $(this).parents("ul:first")).slideUp(350);
			$("a", $(this).parents("ul:first")).removeClass("subdrop");
			$(this).next("ul").slideDown(350);
			$(this).addClass("subdrop");
		} else if ($(this).hasClass("subdrop")) {
			$(this).removeClass("subdrop");
			$(this).next("ul").slideUp(350);
		}
	});
		$("#sidebar-menu ul li.submenu a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
	},
	$.Sidemenu = new Sidemenu;

}(window.jQuery),


$(document).ready(function($) {
    $('.selectpicker').selectpicker();

    //$('.tcal').datetimepicker();

    // $("#toggle-menu").on('click',function(){
    //     $('#sidebar').toggleClass("opened");
    // });


	// Sidebar Initiate
	
	$.Sidemenu.init();

    // Sidebar overlay
	
    var $sidebarOverlay = $(".sidebar-overlay");
    $("#toggle-menu, #mobile_btn, .task-chat").on("click", function(e) {
        var $target = $($(this).attr("href"));
        if ($target.length) {
            $target.toggleClass("opened");
            $sidebarOverlay.toggleClass("opened");
            $("html").toggleClass("menu-opened");
            $sidebarOverlay.attr("data-reff", $(this).attr("href"));
        }
        e.preventDefault();
    });

    $sidebarOverlay.on("click", function(e) {
        var $target = $($(this).attr("data-reff"));
        if ($target.length) {
            $target.removeClass("opened");
            $("html").removeClass("menu-opened");
            $(this).removeClass("opened");
            $(".main-wrapper").removeClass("slide-nav");
        }
        e.preventDefault();
    });
	
    // Select 2

    if ($('.select').length > 0) {
        $('.select').select2({
            minimumResultsForSearch: -1,
            width: '100%'
        });
    }

    // Modal

    if ($('.modal').length > 0) {
        var modalUniqueClass = ".modal";
        $('.modal').on('show.bs.modal', function(e) {
            var $element = $(this);
            var $uniques = $(modalUniqueClass + ':visible').not($(this));
            if ($uniques.length) {
                $uniques.modal('hide');
                $uniques.one('hidden.bs.modal', function(e) {
                    $element.modal('show');
                });
                return false;
            }
        });
    }

    // Floating Label

    if ($('.floating').length > 0) {
        $('.floating').on('focus blur', function(e) {
            $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');
    }

    // Right Sidebar Scroll

    if ($('.msg-list-scroll').length > 0) {
        $('.msg-list-scroll').slimscroll({
            height: '100%',
            color: '#878787',
            disableFadeOut: true,
            borderRadius: 0,
            size: '4px',
            alwaysVisible: false,
            touchScrollStep: 100
        });
        var h = $(window).height() - 124;
        $('.msg-list-scroll').height(h);
        $('.msg-sidebar .slimScrollDiv').height(h);

        $(window).resize(function() {
            var h = $(window).height() - 124;
            $('.msg-list-scroll').height(h);
            $('.msg-sidebar .slimScrollDiv').height(h);
        });
    }

    // Left Sidebar Scroll

    if ($('.slimscroll').length > 0) {
        $('.slimscroll').slimScroll({
            height: 'auto',
            width: '100%',
            position: 'right',
            size: "7px",
            color: '#ccc',
            wheelStep: 10,
            touchScrollStep: 100
        });
        var hei = $(window).height() - 60;
        $('.slimscroll').height(hei);
        $('.sidebar .slimScrollDiv').height(hei);

        $(window).resize(function() {
            var hei = $(window).height() - 60;
            $('.slimscroll').height(hei);
            $('.sidebar .slimScrollDiv').height(hei);
        });
    }

    // Page wrapper height

    if ($('.page-wrapper').length > 0) {
        var height = $(window).height();
        $(".page-wrapper").css("min-height", height);
    }

    $(window).resize(function() {
        if ($('.page-wrapper').length > 0) {
            var height = $(window).height();
            $(".page-wrapper").css("min-height", height);
        }
    });

    // Datetimepicker

    if ($('.datetimepicker').length > 0) {
        $('.datetimepicker').datetimepicker({
            format: 'DD/MM/YYYY'
        });
    }

    // Datatable

    if ($('.datatable').length > 0) {
        $('.datatable').DataTable({
            "bFilter": false,
        });
    }

    // Bootstrap Tooltip

    if ($('[data-toggle="tooltip"]').length > 0) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Toggle Button

    if ($('.btn-toggle').length > 0) {
        $('.btn-toggle').click(function() {
            $(this).find('.btn').toggleClass('active');
            if ($(this).find('.btn-success').size() > 0) {
                $(this).find('.btn').toggleClass('btn-success');
            }
        });
    }

    // Mobile Menu

    if ($('.main-wrapper').length > 0) {
        var $wrapper = $(".main-wrapper");
        $('#mobile_btn, #toggle-menu').click(function() {
            $wrapper.toggleClass('slide-nav');
            $('#chat_sidebar').removeClass('opened');
            $(".dropdown.open > .dropdown-toggle").dropdown("toggle");
            return false;
        });
        $('#open_msg_box').click(function() {
            $wrapper.toggleClass('open-msg-box');
            $('.themes').removeClass('active');
            $('.dropdown').removeClass('open');
            return false;
        });
    }



    // Dropdown in Table responsive 

    $('.table-responsive').on('shown.bs.dropdown', function(e) {
        var $table = $(this),
            $dropmenu = $(e.target).find('.dropdown-menu'),
            tableOffsetHeight = $table.offset().top + $table.height(),
            menuOffsetHeight = $dropmenu.offset().top + $dropmenu.outerHeight(true);

        if (menuOffsetHeight > tableOffsetHeight)
            $table.css("padding-bottom", menuOffsetHeight - tableOffsetHeight);
    });
    $('.table-responsive').on('hide.bs.dropdown', function() {
        $(this).css("padding-bottom", 0);
    });

    // Custom Backdrop for modal popup

    $('a[data-toggle="modal"]').on('click', function() {
        setTimeout(function() {
            if ($(".modal.custom-modal").hasClass('in')) {
                $(".modal-backdrop").addClass('custom-backdrop');

            }
        }, 500);
    });

    // Dropfiles

    if ($("#drop-zone").length > 0) {
        var dropZone = document.getElementById('drop-zone');
        var uploadForm = document.getElementById('js-upload-form');
        var startUpload = function(files) {
            console.log(files)
        }

        uploadForm.addEventListener('submit', function(e) {
            var uploadFiles = document.getElementById('js-upload-files').files;
            e.preventDefault()

            startUpload(uploadFiles)
        })

        dropZone.ondrop = function(e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';

            startUpload(e.dataTransfer.files)
        }

        dropZone.ondragover = function() {
            this.className = 'upload-drop-zone drop';
            return false;
        }

        dropZone.ondragleave = function() {
            this.className = 'upload-drop-zone';
            return false;
        }

    }
});
$(document).ready(function() {
    $('.datepicker').datepicker({ format: "dd-mm-yyyy",autoclose: true});
    $('.tcal').datepicker({ format: "dd-mm-yyyy",autoclose: true });
});