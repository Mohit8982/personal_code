$(document).ready(function() {
    $('div[contenteditable]').on('click', function() {
        var getClass = $(this).attr('class');
        if ($(this).hasClass('text-editable-area')) {
            $('.text-editor-remove-style').addClass('text-editor-2-active');
            $('.text-editor-remove-style').children('.text-editable-area').removeClass('text-editable-area-focused');
            $(this).addClass(getClass + '-focused')
            $(this).parent().removeClass('text-editor-2-active');
        }
    });

    $('.active-deactive-clss').on('click', function() {
        $(this).addClass('ib-search-field-focused');
        $(this).parent().next('div').addClass('show');
    });

    $(".ib-menu-filter-dd-option").on('click', function() {
        $(this).parent().addClass('ib-menu-option-active');
        $(this).closest('.ib-drop-down').removeClass('active');
    });

    $('.ib-filter-due-date').hide();
    $(".select-quick-filter-option").on('change', function() {
        if ($(this).val() == 2) {
            $(this).parent().addClass('mb-3');
            $('.ib-filter-due-date').show();
        } else {
            $(this).parent().removeClass('mb-3');
            $('.ib-filter-due-date').hide();
        }
    });
    
    $('.filter-trigger-btn').on('click', function() {
        var btnValue = $(this).attr('data-ralated-value');
        if ($(this).hasClass('isActive')) {
            $('.ib-slide-side-filter').removeClass('ib-side-filter-active');
            $(this).removeClass('isActive');
        } else {
            $('.ib-slide-side-filter').addClass('ib-side-filter-active');
            $(this).addClass('isActive');
        }
    });

    toastr.options.progressBar = true;
    toastr.options.closeMethod = "fadeOut";
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = "swing";

});

$(document).mouseup(function(e) {
    var container = $("div[contenteditable]");
    var targetContainer = $('.text-editor-remove-style');
    var ibDdContainer = $(".ib-drop-down");
    var ibSideFilterPanel = $(".ib-slide-side-filter");
    var ibFilterTriggerBtn = $(".filter-trigger-btn");
    var ibSearchField = $('.active-deactive-clss');
    var ibDdListClose = $('.ib-search-suggetions-list');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        targetContainer.addClass('text-editor-2-active');
        targetContainer.children('.text-editable-area').removeClass('text-editable-area-focused');
    }
    if (!ibDdContainer.is(e.target) && ibDdContainer.has(e.target).length === 0) {
        ibDdContainer.parent('.ib-menu-dd-option').removeClass('ib-menu-option-active');
    }
    if (!ibSideFilterPanel.is(e.target) && ibSideFilterPanel.has(e.target).length === 0) {
        ibSideFilterPanel.removeClass('ib-side-filter-active');
        ibFilterTriggerBtn.removeClass('isActive');
    }
    if (!ibSearchField.is(e.target) && ibSearchField.has(e.target).length === 0) {
        ibSearchField.removeClass('ib-search-field-focused');
    }
    if (!ibDdListClose.is(e.target) && ibDdListClose.has(e.target).length === 0) {
        ibDdListClose.removeClass('show');
    }
});

$(document).on("click", ".ib-task-card-option", function() {
    $(this).addClass("active");
    $(this).children(".ib-task-option-dropdown").addClass("show");
});

$(document).on("click", ".profile-dd-option", function() {
    $(this).next(".prof-dropdown-hide").addClass("show");
});

function bseSetHeight() {
    var ibTopHeaderEleHeight = $("#ibTopHeader").height();
    var ibBoardToolbarEleHeight = $("#ibBoardToolbar").height();
    var totalHeaderHeight = ibTopHeaderEleHeight + ibBoardToolbarEleHeight + 1;
    $("#ibBoardBody").css("height", "calc(100vh - " + totalHeaderHeight + "px)");
}

window.setInterval(function() {
    bseSetHeight();
}, 10);

$("#username").keyup(async function() {
    const name = $("#username").val();
    if (name == '') {
        $("#check_invalid").val(0)
        return $("#username_err").html('');
    }
    const method = "POST";
    const data = { username: name };
    const url = "/auth/check-name";
    const call = await ajaxCall(url, data, method);
    if (call.status == 2) {
        $("#check_invalid").val(1)
        $("#username_err").html(call.message);
    } else {
        $("#check_invalid").val(0)
        $("#username_err").html('');
    }
});

$(document).ready(function() {
    $(document).on("click", ".profile-dd-option", function() {
        $(this).next(".prof-dropdown-hide").addClass("show");
    });

    $(document).on("click", ".upload-pic-event", function() {
        $(this).next("#uploadPicEvent").click();
    });
});

$(document).on("click", ".ib-nb-item", function() {
    let dataId = $(this).attr("data-id");
    $(".ib-nb-item").removeClass("active");
    $(this).addClass("active");
    if ($(this).attr("data-id") == dataId) {
        $(".info-update-form").removeClass("show");
        $("." + dataId + "-update").addClass("show");
    }
});

$(document).on('click', '.ib-expand-trigger', function() {
    if ($(this).hasClass('active')) {
        $(this).children('.ib-arrow-icon').removeClass('ib-arrow-down');
        $(this).children('.ib-arrow-icon').addClass('ib-arrow-right');
        $(this).removeClass('active');
    } else {
        $(this).children('.ib-arrow-icon').removeClass('ib-arrow-right');
        $(this).children('.ib-arrow-icon').addClass('ib-arrow-down');
        $(this).addClass('active');
    }
});