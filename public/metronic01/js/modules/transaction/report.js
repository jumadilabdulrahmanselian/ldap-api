$("#kt_datatable1 tbody").on("click", ".deleteData", function() {
    const name = $(this).data("nama");
    const id = $(this).data("id");
    const ElementMenu = $(this).data("ElementMenu");
    // console.log(name);
    // console.log(id);

    Swal.fire({
        title: "Hapus Data Laporan Hasil Audit ?",
        text: "Data yang sudah dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                url: BASE + "/report/delete/" + ElementMenu,
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
    const id = $(this).data("id");
    const ElementMenu = $(this).data("ElementMenu");

    button_action({
        label: "Ubah Data Laporan Hasil Audit",
        btnLabel: "Ubah Data",
        type: "Edit",
        url: "report/edit",
        modal: "modalEdit",
        form: "form_edit",
    });

    $.ajax({
        url: BASE + "report/getedit/" + ElementMenu,
        data: { id: id },
        method: "post",
        success: function(data) {
            var files = JSON.parse(data);
            console.log(files);
            $("#idReportEdit").val(files.data[0].ID_REPORT);
            $("#judulEdit").val(files.data[0].NM_REPORT);

            $("#unggahanFileEdit").attr("href", BASE + files.data[0].FILE);
            if (files.data[0].FILE !== "" && files.data[0].FILE !== null) {
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

// $('.tombolTambah').on('click', function () {
//     $('#passwordDiv').show();
// });

// Class definition
var KTFormControls = (function() {
    // Private functions
    var _handleTambah = function() {
        var validation;

        if (isSelectorExist("#form_tambah")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_tambah"), {
                    fields: {
                        judul: {
                            validators: {
                                notEmpty: {
                                    message: "Judul harus diisi",
                                },
                            },
                        },

                        file: {
                            validators: {
                                file: {
                                    extension: "docx,doc,xlsx,xls,pdf",
                                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/pdf",
                                    message: "Silahkan pilih file DOCX, DOX, XLSX, XLS, PDF",
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
                const id = $(this).data("id");
                //   console.log("add");

                var _input = new FormData(document.getElementById("form_tambah"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "/report/add/" + id,
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
                        judul: {
                            validators: {
                                notEmpty: {
                                    message: "Judul harus diisi",
                                },
                            },
                        },

                        file: {
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
                const id = $(this).data("id");
                // console.log("edit");

                var _input = new FormData(document.getElementById("form_edit"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "/report/edit/" + id,
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

    return {
        // public functions
        init: function() {
            _handleTambah();
            _handleEdit();
        },
    };
})();

jQuery(document).ready(function() {
    KTFormControls.init();
});