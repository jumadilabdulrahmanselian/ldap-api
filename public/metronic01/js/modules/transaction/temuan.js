$("#kt_datatable1 tbody").on("click", ".deleteTemuan", function() {
    const name = $(this).data("nama");
    const id = $(this).data("id");
    // console.log(name);
    // console.log(id);

    Swal.fire({
        title: "Hapus Data Temuan?",
        text: "Data yang sudah dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                url: BASE + "lai/deletetemuan",
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

$("#tipeElement").on("change", function() {
    var tipe = $("#tipeElement").val();
    console.log(tipe);

    $("#linkKlausul").attr("href", BASE + "assets/guide/" + tipe + ".pdf");

    $.ajax({
        url: BASE + "lai/get_element_by_tipe",
        data: { tipe: tipe },
        method: "post",
        success: function(data) {
            var element = JSON.parse(data);
            console.log(element);
            $("#idElement").html("");

            var select = "";
            $.each(element.data, function(i, val) {
                select +=
                    '<option value="' +
                    val.ID_ELEMENT +
                    '">' +
                    val.NM_ELEMENT +
                    " " +
                    val.TIPE_ELEMENT;
                if (val.DESKRIPSI_ELEMENT !== "" && val.DESKRIPSI_ELEMENT !== null) {
                    select += ": " + val.DESKRIPSI_ELEMENT;
                }
                select += "</option>";
            });
            $("#idElement").append(select);
            $(".selectpicker").selectpicker("refresh");
        },
    }).done(function() {
        $("#pilihKlausul").show();
    });
});

$("#tipeElementEdit").on("change", function() {
    var tipe = $("#tipeElementEdit").val();
    console.log(tipe);

    $("#linkKlausulEdit").attr("href", BASE + "assets/guide/" + tipe + ".pdf");

    $.ajax({
        url: BASE + "lai/get_element_by_tipe",
        data: { tipe: tipe },
        method: "post",
        success: function(data) {
            var element = JSON.parse(data);
            console.log(element);
            $("#idElementEdit").html("");

            var select = "";
            $.each(element.data, function(i, val) {
                select +=
                    '<option value="' +
                    val.ID_ELEMENT +
                    '">' +
                    val.NM_ELEMENT +
                    " " +
                    val.TIPE_ELEMENT;
                if (val.DESKRIPSI_ELEMENT !== "" && val.DESKRIPSI_ELEMENT !== null) {
                    select += ": " + val.DESKRIPSI_ELEMENT;
                }
                select += "</option>";
            });
            $("#idElementEdit").append(select);
            $(".selectpicker").selectpicker("refresh");
        },
    }).done(function() {
        $("#pilihKlausulEdit").show();
    });
});

$(".tombolUploadFileObs").on("click", function() {
    const id = $(this).data("id");
    // console.log(name);
    // console.log(id);

    $.ajax({
        url: BASE + "lai/getedit",
        data: { id: id },
        method: "post",
        success: function(data) {
            var lai = JSON.parse(data);
            console.log(lai);
            console.log(id);

            $("#idTLObs").val(id);
            $("#unggahanFileTLObservasi").attr("href", BASE + lai.data[0].FILE_TL);

            if (lai.data[0].FILE_TL !== "" && lai.data[0].FILE_TL !== null) {
                $("#igpFileTLObservasi").show();
                $("#checkFilesTLObservasi").show();
                $("#isFileTLObservasi").val("1");
            } else {
                $("#igpFileTLObservasi").hide();
                $("#checkFilesTLObservasi").hide();
                $("#isFileTLObservasi").val("0");
            }

            $(".selectpicker").selectpicker("refresh");
        },
    });
});

$("#kt_datatable1 tbody").on("click", ".updateStatus", function() {
    const name = $(this).data("nama");
    const id = $(this).data("id");
    // console.log(name);
    // console.log(id);

    Swal.fire({
        title: "Update status temuan menjadi 'closed'?",
        text: "Data yang sudah diupdate akan dianggap selesai!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, update!",
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                url: BASE + "lai/statustemuan",
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

let editor;
let editorEdit;
let editorProgress;

ClassicEditor.create(document.querySelector("#deskripsiTemuan"))
    .then((newEditor) => {
        editor = newEditor;
    })
    .catch((error) => {
        console.error(error);
    });

ClassicEditor.create(document.querySelector("#deskripsiTemuanEdit"))
    .then((newEditor) => {
        editorEdit = newEditor;
    })
    .catch((error) => {
        console.error(error);
    });

ClassicEditor.create(document.querySelector("#deskripsiTL"))
    .then((newEditor) => {
        editorProgress = newEditor;
    })
    .catch((error) => {
        console.error(error);
    });

$("#kt_datatable1 tbody").on("click", ".tambahProgress", function() {
    const id = $(this).data("id");

    button_action({
        label: "Tambah Progress / Tindak Lanjut",
        btnLabel: "Simpan",
        type: "edit",
        url: BASE + "lai/progress",
        modal: "modalProgress",
        form: "form_progress",
    });

    $.ajax({
        url: BASE + "lai/getedittemuan",
        data: { id: id },
        method: "post",
        success: function(data) {
            var temuan = JSON.parse(data);
            console.log(temuan);
            editorProgress.setData("");
            if (
                temuan.data[0].DESKRIPSI_TL !== "" &&
                temuan.data[0].DESKRIPSI_TL !== null
            ) {
                editorProgress.setData(temuan.data[0].DESKRIPSI_TL);
            }
            $("#idProgress").val(temuan.data[0].ID_LAI_DATA);
            $("#jenisTemuanProgress").val(temuan.data[0].JENIS_TEMUAN);

            if (temuan.data[0].JENIS_TEMUAN === "LTK") {
                $("#uploadLTKProgress").show();
            } else {
                $("#uploadLTKProgress").hide();
            }
            // $("#noFormEdit").val(temuan.data[0].NO_FORM);
            // $("#judulFormEdit").val(temuan.data[0].JUDUL_FORM);

            $("#unggahanLTKProgress").attr("href", BASE + temuan.data[0].FILE_TL_LTK);
            if (
                temuan.data[0].FILE_TL_LTK !== "" &&
                temuan.data[0].FILE_TL_LTK !== null
            ) {
                // console.log(temuan.data[0].FILE_TL_LTK);
                $("#igpLTKProgress").show();
                $("#checkFilesProgress").show();
                $("#isLTKProgress").val("1");
            } else {
                $("#igpLTKProgress").hide();
                $("#checkFilesProgress").hide();
                $("#isLTKProgress").val("0");
            }

            $(".selectpicker").selectpicker("refresh");
        },
    });
});

$("#kt_datatable1 tbody").on("click", ".tombolEdit", function() {
    const id = $(this).data("id");

    button_action({
        label: "Ubah Data Temuan",
        btnLabel: "Ubah Data",
        type: "edit",
        url: BASE + "lai/edittemuan",
        modal: "modalEdit",
        form: "form_edit",
    });

    $.ajax({
        url: BASE + "lai/getedittemuan",
        data: { id: id },
        method: "post",
        success: function(data) {
            var temuan = JSON.parse(data);
            console.log(temuan);
            var tipe = temuan.data[0].TIPE_ELEMENT;
            console.log(tipe);
            // updateModalEdit(temuan, tipe);

            $("#linkKlausulEdit").attr(
                "href",
                BASE + "assets/guide/" + tipe + ".pdf"
            );

            $.ajax({
                    url: BASE + "lai/get_element_by_tipe",
                    data: { tipe: tipe },
                    method: "post",
                    success: function(data) {
                        var element = JSON.parse(data);
                        console.log(element);
                        $("#idElementEdit").html("");

                        var select = "";
                        $.each(element.data, function(i, val) {
                            select +=
                                '<option value="' +
                                val.ID_ELEMENT +
                                '">' +
                                val.NM_ELEMENT +
                                " " +
                                val.TIPE_ELEMENT;
                            if (
                                val.DESKRIPSI_ELEMENT !== "" &&
                                val.DESKRIPSI_ELEMENT !== null
                            ) {
                                select += ": " + val.DESKRIPSI_ELEMENT;
                            }
                            select += "</option>";
                        });
                        $("#idElementEdit").append(select);
                        $(".selectpicker").selectpicker("refresh");
                    },
                })
                .done(function() {
                    $("#pilihKlausulEdit").show();
                })
                .done(function() {
                    $("#idElementEdit").val(temuan.data[0].ID_ELEMENT);
                    $(".selectpicker").selectpicker("refresh");
                });
            $("#idEdit").val(temuan.data[0].ID_LAI_DATA);
            $("#idLaiEdit").val(temuan.data[0].ID_LAI);
            $("#noTemuanEdit").val(temuan.data[0].NO_TEMUAN);
            $("#tglDeadlineEdit").val(temuan.data[0].FULL_TGL_DEADLINE);
            // $("#deskripsiTemuanEdit").val(temuan.data[0].DESKRIPSI_TEMUAN);
            editorEdit.setData(temuan.data[0].DESKRIPSI_TEMUAN);
            $("#jenisTemuanEdit").val(temuan.data[0].JENIS_TEMUAN);
            $("#tipeElementEdit").val(temuan.data[0].TIPE_ELEMENT);

            if (temuan.data[0].JENIS_TEMUAN === "LTK") {
                $("#uploadLTKEdit").show();
            } else {
                $("#uploadLTKEdit").hide();
            }

            $("#unggahanFileEdit").attr(
                "href",
                BASE + temuan.data[0].FILE_TEMUAN_LTK
            );
            if (
                temuan.data[0].FILE_TEMUAN_LTK !== "" &&
                temuan.data[0].FILE_TEMUAN_LTK !== null
            ) {
                $("#igpFileEdit").show();
                $("#checkFileEdit").show();
                $("#isFileEdit").val("1");
            } else {
                $("#igpFileEdit").hide();
                $("#checkFileEdit").hide();
                $("#isFileEdit").val("0");
            }

            $(".selectpicker").selectpicker("refresh");
        },
    });
});

$("#kt_datatable1 tbody").on("click", ".lihatTemuan", function() {
    const id = $(this).data("id");

    button_action({
        label: "Deskripsi Temuan",
        btnLabel: "Ubah Data",
        type: "edit",
        url: "lai/edittemuan",
        modal: "modalDeskripsi",
        form: "form_edit",
    });

    $.ajax({
        url: BASE + "lai/getedittemuan",
        data: { id: id },
        method: "post",
        success: function(data) {
            var temuan = JSON.parse(data);
            console.log(temuan);
            $("#viewDeskripsi").html(temuan.data[0].DESKRIPSI_TEMUAN);

            if (
                temuan.data[0].FILE_TEMUAN_LTK != "" &&
                temuan.data[0].FILE_TEMUAN_LTK != null
            ) {
                $("#ltkAwalLink").attr("href", BASE + temuan.data[0].FILE_TEMUAN_LTK);
                $("#ltkAwal").show();
            } else {
                $("#ltkAwal").hide();
            }

            if (
                temuan.data[0].FILE_TL_LTK != "" &&
                temuan.data[0].FILE_TL_LTK != null
            ) {
                $("#ltkProgressLink").attr("href", BASE + temuan.data[0].FILE_TL_LTK);
                $("#ltkProgress").show();
            } else {
                $("#ltkProgress").hide();
            }

            var tl = temuan.data[0].DESKRIPSI_TL;
            if (tl === "" || tl === null) {
                document.getElementById("viewTL").classList.add("text-danger");
                if (
                    temuan.data[0].FILE_TEMUAN_LTK != "" &&
                    temuan.data[0].FILE_TEMUAN_LTK != null &&
                    (temuan.data[0].FILE_TEMUAN_TL == "" ||
                        temuan.data[0].FILE_TL_LTK == null)
                ) {
                    $("#viewTL").html("<br />Belum Ada");
                } else {
                    $("#viewTL").html("Belum Ada");
                }
            } else {
                document.getElementById("viewTL").classList.remove("text-danger");
                $("#viewTL").html(temuan.data[0].DESKRIPSI_TL);
            }
        },
    });
});

$(".tombolTambahTemuan").on("click", function() {
    $("#uploadLTK").hide();
    var id = $(this).data("id");
    $("#idLai").val(id);
    $("#pilihKlausul").hide();
});

$("#jenisTemuan").on("change", function() {
    var selected = $(this).val();

    if (selected === "LTK") {
        $("#uploadLTK").show();
    } else {
        $("#uploadLTK").hide();
    }
});

$("#jenisTemuanEdit").on("change", function() {
    var selected = $(this).val();

    if (selected === "LTK") {
        $("#uploadLTKEdit").show();
    } else {
        $("#uploadLTKEdit").hide();
    }
});

// $('.tombolTambah').on('click', function () {
//     $('#passwordDiv').show();
// });

var KTCalendarBasic = (function() {
    return {
        //main function to initiate the module
        init: function() {
            var todayDate = moment().startOf("day");
            var YM = todayDate.format("YYYY-MM");
            var YESTERDAY = todayDate.clone().subtract(1, "day").format("YYYY-MM-DD");
            var TODAY = todayDate.format("YYYY-MM-DD");
            var TOMORROW = todayDate.clone().add(1, "day").format("YYYY-MM-DD");

            var IDLAI = window.location.href;
            // console.log(IDLAI.substring(IDLAI.lastIndexOf("/") + 1));
            IDLAI = IDLAI.substring(IDLAI.lastIndexOf("/") + 1);

            var calendarEl = document.getElementById("temuan_calendar");
            var calendar = new FullCalendar.Calendar(calendarEl, {
                themeSystem: "bootstrap",
                displayEventTime: false,
                headerToolbar: {
                    left: "today prev,next",
                    center: "title",
                    right: "dayGridMonth",
                },
                initialView: "dayGridMonth",

                height: 800,
                contentHeight: 1480,
                aspectRatio: 1.5,

                views: {
                    dayGridMonth: {
                        buttonText: "Calendar",
                    },
                },

                editable: false,

                // resourceAreaHeaderContent: "Nama Auditor",
                // resourceAreaWidth: "20%",
                // resources: BASE + "lai/load_resource",
                events: BASE + "lai/load_event/" + IDLAI,

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
                        noTemuan: {
                            validators: {
                                notEmpty: {
                                    message: "Nomor harus diisi",
                                },
                                numeric: {
                                    message: "Hanya bisa diisi dengan angka",
                                },
                            },
                        },

                        deskripsiTemuan: {
                            validators: {
                                required: {
                                    message: "Deskripsi harus diisi",
                                },
                            },
                        },

                        jenisTemuan: {
                            validators: {
                                notEmpty: {
                                    message: "Jenis harus dipilih",
                                },
                            },
                        },

                        tipeElement: {
                            validators: {
                                notEmpty: {
                                    message: "Tipe element harus dipilih",
                                },
                            },
                        },

                        idElement: {
                            validators: {
                                notEmpty: {
                                    message: "Klausul harus dipilih",
                                },
                            },
                        },

                        tglDeadline: {
                            validators: {
                                notEmpty: {
                                    message: "Batas waktu harus ditentukan",
                                },
                            },
                        },

                        fileLTK: {
                            validators: {
                                file: {
                                    extension: "pdf",
                                    type: "application/pdf",
                                    message: "Silahkan pilih file PDF",
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
                // const jenis = $(this).data("jenis");
                //   console.log("add");

                var _input = new FormData(document.getElementById("form_tambah"));
                _input.append("deskripsiTemuan", editor.getData());

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        // alert("Modal Sesuai");
                        $.ajax({
                            url: BASE + "lai/addtemuan",
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
                        noTemuan: {
                            validators: {
                                notEmpty: {
                                    message: "Nomor harus diisi",
                                },
                                numeric: {
                                    message: "Hanya bisa diisi dengan angka",
                                },
                            },
                        },

                        deskripsiTemuan: {
                            validators: {
                                required: {
                                    message: "Deskripsi harus diisi",
                                },
                            },
                        },

                        jenisTemuan: {
                            validators: {
                                notEmpty: {
                                    message: "Jenis harus dipilih",
                                },
                            },
                        },

                        tipeElement: {
                            validators: {
                                notEmpty: {
                                    message: "Tipe element harus dipilih",
                                },
                            },
                        },

                        idElement: {
                            validators: {
                                notEmpty: {
                                    message: "Klausul harus dipilih",
                                },
                            },
                        },

                        tglDeadline: {
                            validators: {
                                notEmpty: {
                                    message: "Batas waktu harus ditentukan",
                                },
                            },
                        },

                        fileLTKEdit: {
                            validators: {
                                file: {
                                    extension: "pdf",
                                    type: "application/pdf",
                                    message: "Silahkan pilih file PDF",
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
                const jenis = $(this).data("jenis");
                // $("#idLai").val("1");
                // console.log("edit");

                var _input = new FormData(document.getElementById("form_edit"));
                _input.append("deskripsiTemuan", editorEdit.getData());

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "lai/edittemuan",
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
    var _handleTLObs = function() {
        var validation;

        if (isSelectorExist("#form_obs")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_obs"), {
                    fields: {
                        fileTLObs: {
                            validators: {
                                file: {
                                    extension: "pdf",
                                    type: "application/pdf",
                                    message: "Silahkan pilih file PDF",
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

            $("#submitObs").on("click", function(e) {
                e.preventDefault();
                const jenis = $(this).data("jenis");
                // $("#idLai").val("1");
                // console.log("edit");

                var _input = new FormData(document.getElementById("form_obs"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "lai/addfileobs",
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submitObs").removeClass(
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
                                $("#submitObs").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                            },
                        });
                    } else {
                        $("#submitObs").removeClass("spinner spinner-white spinner-right");
                    }
                });
            });
        }
    };
    // Private functions
    var _handleProgress = function() {
        var validation;

        if (isSelectorExist("#form_progress")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_progress"), {
                    fields: {
                        deskripsiTL: {
                            validators: {
                                required: {
                                    message: "Deskripsi harus diisi",
                                },
                            },
                        },

                        fileLTKProgress: {
                            validators: {
                                file: {
                                    extension: "pdf",
                                    type: "application/pdf",
                                    message: "Silahkan pilih file PDF",
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

            $("#submitProgress").on("click", function(e) {
                e.preventDefault();
                const jenis = $(this).data("jenis");
                // console.log("edit");

                var _input = new FormData(document.getElementById("form_progress"));
                _input.append("deskripsiTL", editorProgress.getData());

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "lai/progress",
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submitProgress").removeClass(
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
                                $("#submitProgress").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                            },
                        });
                    } else {
                        $("#submitProgress").removeClass(
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
            _handleTLObs();
            _handleProgress();
        },
    };
})();

// Class definition

// var KTCkeditor = function () {
//   // Private functions
//   var demos = function () {
//     ClassicEditor
//       .create(document.querySelector('.kt-ckeditor-1'))
//       .then(editor => {
//         console.log(editor);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   return {
//     // public functions
//     init: function () {
//       demos();
//     }
//   };
// }();

jQuery(document).ready(function() {
    KTFormControls.init();
    KTCalendarBasic.init();
    // KTCkeditor.init();
});