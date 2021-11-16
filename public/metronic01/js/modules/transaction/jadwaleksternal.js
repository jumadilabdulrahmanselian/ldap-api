$("#kt_datatable1 tbody").on("click", ".deleteData", function() {
    const name = $(this).data("nama");
    const id = $(this).data("id");
    const ElementMenu = $(this).data("ElementMenu");
    // console.log(name);
    // console.log(id);

    Swal.fire({
        title: "Hapus Data Jadwal Eksternal ?",
        text: "Data yang sudah dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                url: BASE + "/jadwaleksternal/delete/" + ElementMenu,
                data: { id: id },
                method: "post",
                success: function(response) {
                    var data = JSON.parse(response);

                    if (data.status) {
                        Swal.fire("Berhasil!", data.msg, "success").then(function() {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire("Gagal!", data.msg, "error");
                    }
                },
            });
        }
    });
});

$("#kt_datatable1 tbody").on("click", ".tombolEdit", function() {
    button_action({
        label: "Ubah Data Jadwal Audit Eksternal",
        btnLabel: "Ubah Data",
        type: "Edit",
        url: "jadwaleksternal/edit",
        modal: "modalEdit",
        form: "form_edit",
    });

    const id = $(this).data("id");
    const ElementMenu = $(this).data("ElementMenu");

    // GET DATA JADWAL HERE FOR EDIT
    $.ajax({
        url: BASE + "jadwaleksternal/getedit/" + ElementMenu,
        data: { id: id },
        method: "post",
        success: function(data) {
            var jadwal = JSON.parse(data);
            // console.log(span);
            $("#idJadwalEdit").val(jadwal.data[0].ID_JADWAL);
            // $("#auditorJadwalEdit").val(jadwal.data[0].AUDITOR);
            $("#auditorEdit").val(jadwal.data[0].AUDITOR);
            $("#idSeksiEdit").val(jadwal.data[0].ID_SEKSI);
            // console.log(span);
            $("#tglmulaiJadwalEdit").val(jadwal.data[0].DATETIME_TGL_MULAI);
            $("#tglselesaiJadwalEdit").val(jadwal.data[0].DATETIME_TGL_SELESAI);
            $("#tglopeningJadwalEdit").val(jadwal.data[0].TGL_OPENING);
            $("#tglclosingJadwalEdit").val(jadwal.data[0].TGL_CLOSING);
            $("#periodeJadwalEdit").val(jadwal.data[0].PERIODE);

            $(".selectpicker").selectpicker("refresh");
        },
    });
});

// var listidauditor = [];
var listnmauditee = [];

$("#kt_datatable1 tbody").on("click", ".tombolPilihAuditee", function() {
    button_action({
        label: "Pilih Auditee untuk Jadwal Audit",
        btnLabel: "Simpan",
        type: "save",
        url: "jadwaleksternal/addauditee",
        modal: "modalPilihauditee",
        form: "formModalPilihauditee",
    });

    const id = $(this).data("id");
    $("#idjadwalauditee").val(id);

    $("#listauditee").empty();

    // GET DATA JADWAL AUDITEE
    $.ajax({
        url: BASE + "jadwaleksternal/get_jadwal_auditee",
        data: { id: id },
        method: "post",
        success: function(data) {
            var jadwal_auditee = JSON.parse(data);
            console.log(jadwal_auditee);
            i = 0;
            var listidauditeeexist = [];

            var SplitArrAuditee = jadwal_auditee.data[0].AUDITEE.split(",");
            console.log(SplitArrAuditee);

            $.each(SplitArrAuditee, function() {
                if (SplitArrAuditee[i] != "") {
                    listidauditeeexist.push(SplitArrAuditee[i]);
                    var select = "";
                    select += "<div class='form-group inputfieldauditee'>";
                    select += '<div class="input-group">';
                    select +=
                        '<input type="hidden" name="listauditee[]" value="' +
                        SplitArrAuditee[i] +
                        '" class="form-control">';
                    select +=
                        '<input type="text" value="' +
                        SplitArrAuditee[i] +
                        '" class="form-control selectpicker" disabled>';
                    select += '<div class="input-group-append">';
                    //   select +=
                    //     '<button id="removeRow" type="button" class="btn btn-danger">Remove</button>';
                    select += "</div>";
                    select += "</div>";

                    $("#listauditee").append(select);
                    // i++;
                }
                i++;
            });

            // $("#listauditorexist").val(listidauditorexist);

            // console.log(listnmseksi);
        },
    });
});

$("#kt_datatable1 tbody").on("click", ".sendMail", function() {
    const name = $(this).data("nama");
    const id = $(this).data("id");
    // console.log(name);
    // console.log(id);

    Swal.fire({
        title: "Kirim Email Remainder Data Jadwal?",
        text: "Email akan langsung terkirim setelah kamu konfirmasi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Kirim!",
    }).then(function(result) {
        if (result.value) {
            $("#loading-overlay").fadeIn(300);
            $.ajax({
                url: BASE + name + "/send_mail",
                data: { id: id },
                method: "post",
                success: function(response) {
                    var data = JSON.parse(response);
                    $("#loading-overlay").fadeOut(300);
                    if (data.status) {
                        Swal.fire("Berhasil!", data.msg, "success").then(function() {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire("Gagal!", data.msg, "error");
                    }
                },
            });
        }
    });
});

$("#kt_datatable1 tbody").on("click", ".sendMailCustom", function() {
    const id = $(this).data("id");
    $("#idJadwalSendMail").val(id);

    button_action({
        label: "Kirim Email Reminder Data Jadwal",
        btnLabel: "Kirim Reminder",
        type: "Edit",
        url: "jadwaleksternal/send_mail_custom",
        modal: "modalSendMail",
        form: "form_sendmail",
    });
});

$("#kt_datatable1 tbody").on("click", ".sendMailNew", function() {
    const name = $(this).data("nama");
    const id = $(this).data("id");
    // console.log(name);
    // console.log(id);

    Swal.fire({
        title: "Kirim Email Remainder Data Jadwal?",
        text: "Email akan langsung terkirim setelah kamu konfirmasi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Kirim!",
    }).then(function(result) {
        $("#loading-overlay").fadeIn(300);
        if (result.value) {
            $.ajax({
                url: BASE + name + "/send_mail_new",
                data: { id: id },
                method: "post",
                success: function(response) {
                    var data = JSON.parse(response);
                    $("#loading-overlay").fadeOut(300);
                    if (data.status) {
                        Swal.fire("Berhasil!", data.msg, "success").then(function() {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire("Gagal!", data.msg, "error");
                    }
                },
            });
        }
    });
});

function addfieldAuditee() {
    //   var number = document.getElementById("member").value;

    console.log(listnmauditee.length);

    var select = "";
    select += '<div class="form-group inputfieldauditee">';
    select += '<div class="input-group">';
    select +=
        '<input type="text" class="form-control" placeholder="Masukkan Nama Lengkap Auditee" name="listauditee[]">';
    select += "</input>";
    select += '<div class="input-group-append">';
    //   select +=
    //     '<button id="removeRow" type="button" class="btn btn-danger">Remove</button>';
    select += "</div>";
    select += "</div>";

    //   console.log(select);
    $("#listauditee").append(select);
}

// remove row
$(document).on("click", "#removeRowAuditee", function() {
    // if (i <= index) {
    //   i = index;
    // } else {
    //   i--;
    // }
    $(this).closest("#inputfieldauditee").remove();
    $("div .inputfieldauditee").last().remove();
});

// ("use strict");
// let editor;

// ClassicEditor.create(document.querySelector("#editor"))
//   .then((newEditor) => {
//     editor = newEditor;
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Assuming there is a <button id="submit">Submit</button> in your application.
//const editorData = editor.getData();

var KTCalendarBasic = (function() {
    return {
        //main function to initiate the module
        init: function() {
            var todayDate = moment().startOf("day");
            var YM = todayDate.format("YYYY-MM");
            var YESTERDAY = todayDate.clone().subtract(1, "day").format("YYYY-MM-DD");
            var TODAY = todayDate.format("YYYY-MM-DD");
            var TOMORROW = todayDate.clone().add(1, "day").format("YYYY-MM-DD");

            var ELEMENTMENU = window.location.href;
            // console.log(IDLAI.substring(IDLAI.lastIndexOf("/") + 1));
            ELEMENTMENU = ELEMENTMENU.substring(ELEMENTMENU.lastIndexOf("/") + 1);

            var calendarEl = document.getElementById("jadwal_calendar");
            var calendar = new FullCalendar.Calendar(calendarEl, {
                themeSystem: "bootstrap",
                displayEventTime: false,
                headerToolbar: {
                    left: "today prev,next",
                    center: "title",
                    right: "dayGridMonth,resourceTimelineMonth",
                },
                initialView: "dayGridMonth",

                height: 800,
                contentHeight: 1480,
                aspectRatio: 1.5,

                views: {
                    dayGridMonth: {
                        buttonText: "Calendar",
                    },
                    resourceTimelineMonth: {
                        type: "resourceTimeline",
                        duration: { days: 30 },
                        buttonText: "Auditor",
                    },
                },

                editable: false,

                resourceAreaHeaderContent: "Nama Auditor",
                resourceAreaWidth: "20%",
                resources: BASE + "jadwaleksternal/load_resource/" + ELEMENTMENU,
                events: BASE + "jadwaleksternal/load_event/" + ELEMENTMENU,

                eventDidMount: function(info) {
                    var element = $(info.el);

                    element.popover({
                        html: true,
                        animation: true,
                        placement: "top",
                        delay: 300,
                        content: info.event.id.replace(/, /g, "<br/>"),
                        trigger: "hover",
                    });
                },
            });

            calendar.render();
        },
    };
})();

// Class definition
var KTFormControls = (function() {
    // Private functions
    var _handleTambah = function() {
        var validation;

        if (isSelectorExist("#form_tambah")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_tambah"), {
                    fields: {
                        auditor: {
                            validators: {
                                notEmpty: {
                                    message: "Lembaga auditor harus diisi",
                                },
                            },
                        },

                        idSeksi: {
                            validators: {
                                notEmpty: {
                                    message: "Auditee harus diisi",
                                },
                            },
                        },

                        tglmulai: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal mulai harus diisi",
                                },
                            },
                        },

                        tglselesai: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal selesai harus dipilih",
                                },
                            },
                        },

                        tglopening: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal opening harus dipilih",
                                },
                            },
                        },

                        tglclosing: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal closing harus dipilih",
                                },
                            },
                        },

                        periode: {
                            validators: {
                                notEmpty: {
                                    message: "Periode harus diisi",
                                },
                            },
                        },
                    },

                    plugins: {
                        //Learn more: https://formvalidation.io/guide/plugins
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap(),
                        // Validate fields when clicking the Submit button
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        // Submit the form when all fields are valid
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                    },
                }
            );

            $("#submit").on("click", function(e) {
                e.preventDefault();
                //   console.log("add");
                const id = $(this).data("id");

                var _input = new FormData(document.getElementById("form_tambah"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: "jadwaleksternal/add/" + id,
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submit").removeClass("spinner spinner-white spinner-right");
                                var res = JSON.parse(response);
                                if (res.status) {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "success",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function(result) {
                                            if (result.isDismissed) {
                                                window.location.reload();
                                            }
                                        });
                                } else {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "error",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function() {});
                                }
                            },
                            error: function(e) {
                                // console.log(e);
                                $("#submit").removeClass("spinner spinner-white spinner-right");
                            },
                        });
                    } else {
                        $("#submit").removeClass("spinner spinner-white spinner-right");
                    }
                });
            });
        }
    };
    // Private functions
    var _handleEdit = function() {
        var validation;

        if (isSelectorExist("#form_edit")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_edit"), {
                    fields: {
                        auditor: {
                            validators: {
                                notEmpty: {
                                    message: "Lembaga auditor harus diisi",
                                },
                            },
                        },
                        idSeksi: {
                            validators: {
                                notEmpty: {
                                    message: "Auditee harus diisi",
                                },
                            },
                        },

                        tglmulai: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal mulai harus diisi",
                                },
                            },
                        },

                        tglselesai: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal selesai harus dipilih",
                                },
                            },
                        },

                        tglopening: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal opening harus dipilih",
                                },
                            },
                        },

                        tglclosing: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal closing harus dipilih",
                                },
                            },
                        },

                        periode: {
                            validators: {
                                notEmpty: {
                                    message: "Periode harus diisi",
                                },
                            },
                        },
                    },

                    plugins: {
                        //Learn more: https://formvalidation.io/guide/plugins
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap(),
                        // Validate fields when clicking the Submit button
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        // Submit the form when all fields are valid
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                    },
                }
            );

            $("#submitEdit").on("click", function(e) {
                e.preventDefault();
                // console.log("edit");
                const id = $(this).data("id");

                var _input = new FormData(document.getElementById("form_edit"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: "jadwaleksternal/edit/" + id,
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submitEdit").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                                var res = JSON.parse(response);
                                if (res.status) {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "success",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function(result) {
                                            if (result.isDismissed) {
                                                window.location.reload();
                                            }
                                        });
                                } else {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "error",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function() {});
                                }
                            },
                            error: function(e) {
                                // console.log(e);
                                $("#submitEdit").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                            },
                        });
                    } else {
                        $("#submitEdit").removeClass("spinner spinner-white spinner-right");
                    }
                });
            });
        }
    };
    // Private functions
    var _handleSendMail = function() {
        var validation;

        if (isSelectorExist("#form_sendmail")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_sendmail"), {
                    fields: {
                        // pesan: {
                        //   required: function () {
                        //     CKEDITOR.instances.cktext.updateElement();
                        //   },
                        //   minlength: 10,
                        // },
                    },

                    plugins: {
                        //Learn more: https://formvalidation.io/guide/plugins
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap(),
                        // Validate fields when clicking the Submit button
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        // Submit the form when all fields are valid
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                    },
                }
            );

            let editor;

            ClassicEditor.create(document.querySelector("#editor"))
                .then((newEditor) => {
                    editor = newEditor;
                })
                .catch((error) => {
                    console.error(error);
                });

            $("#submitSendMail").on("click", function(e) {
                e.preventDefault();
                //   console.log("add");

                var _input = new FormData(document.getElementById("form_sendmail"));
                _input.append("pesan", editor.getData());

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: "jadwaleksternal/send_mail_custom",
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submitSendMail").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                                var res = JSON.parse(response);
                                if (res.status) {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "success",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function(result) {
                                            if (result.isDismissed) {
                                                window.location.reload();
                                            }
                                        });
                                } else {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "error",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function() {});
                                }
                            },
                            error: function(e) {
                                // console.log(e);
                                $("#submitSendMail").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                            },
                        });
                    } else {
                        $("#submitSendMail").removeClass(
                            "spinner spinner-white spinner-right"
                        );
                    }
                });
            });
        }
    };

    return {
        // public functions
        init: function() {
            _handleTambah();
            _handleEdit();
            _handleSendMail();
        },
    };
})();

jQuery(document).ready(function() {
    KTFormControls.init();
    KTCalendarBasic.init();
});