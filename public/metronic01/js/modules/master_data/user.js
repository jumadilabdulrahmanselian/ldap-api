"use strict";

var InalumUser = (function() {
    var id_table = "#table_user";

    var _initDatatable = function() {
        var tb = $(id_table).DataTable({
            // dom: 'Bfrtip',
            // buttons: [
            //     'excelHtml5'
            // ],
            // "bInfo": false,
            columnDefs: [{
                    targets: [0, 1, 3, 4, 5, 6, 8],
                    orderable: false,
                    visible: false,
                },
                {
                    targets: [11],
                    orderable: false,
                },
            ],
        });

        $(
            "#custom_" +
            _subString(id_table) +
            "_filter, .custom_" +
            _subString(id_table) +
            "_filter"
        ).on("keyup change clear", function() {
            if (tb.search() !== this.value) {
                // console.log(this)
                tb.search(this.value, true, false).draw();
            }
        });

        $(
            "#custom_" +
            _subString(id_table) +
            "_length, .custom_" +
            _subString(id_table) +
            "_length"
        ).on("change", function() {
            tb.page.len($(this).val()).draw();
        });

        $("table tbody").on("click", ".tombolEdit, .nama", function() {
            var d = tb.row($(this).parents("tr")).data();
            // console.log(d[8])
            $("#idUser").val(d[1]);
            $("#userNamaEdit").val(d[3]);
            $("#userUsernameEdit").val(d[4]);
            $("#userEmailEdit").val(d[5]);
            $("#idRoleEdit").val(d[6]).trigger("change");
            $("#idSeksiEdit").val(d[8]).trigger("change");
        });

        $("table tbody").on("click", ".tombolDelete", function() {
            var d = tb.row($(this).parents("tr")).data();
            // console.log(d[6])
            _handleDelete(d[1], d[3]);
        });
    };

    $(".RoleFilter").on("change", function() {
        console.log($(this).val());
        var role = $(this).val();
        if (role == 1 || role == 2) {
            $('.SeksiFilter').removeAttr('hidden');
            $('.SeksiFilter').attr('disabled', 'disabled')
            $(".SeksiFilter").val(1).trigger("change")
            console.log($('.SeksiFilter').val())
            $('.SeksiFilterGroup').show()
        } else if (role == 4) {
            $(".SeksiFilter").val(1).trigger("change")
            $('.SeksiFilterGroup').hide()
        } else {
            $('.SeksiFilter').removeAttr('hidden');
            $('.SeksiFilter').removeAttr('disabled')
            $(".SeksiFilter").val("").trigger("change")
            $('.SeksiFilterGroup').show()
        }
    });

    var _initSelect2 = function() {
        $("#idRole").select2({
            placeholder: "Pilih Role",
            allowClear: true,
        });

        $("#idSeksi").select2({
            placeholder: "Pilih Seksi",
            allowClear: true,
        });

        $("#idRoleEdit").select2({
            placeholder: "Pilih Role",
            allowClear: true,
        });

        $("#idSeksiEdit").select2({
            placeholder: "Pilih Seksi",
            allowClear: true,
        });
    };

    var _subString = function(string) {
        return string.replace("#", "");
    };

    var _hideDefaultFilter = function() {
        $(id_table + "_filter").hide();
        $(id_table + "_length").hide();
    };

    var _showCustomFilter = function(isSearch = false, isFilter = false) {
        var template = "";
        template +=
            "<div class='d-flex align-items-center position-relative my-1'>" +
            "<span class='svg-icon svg-icon-1 position-absolute ms-6' style='left:8px'>" +
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>" +
            "<rect opacity='0.5' x='17.0365' y='15.1223' width='8.15546' height='2' rx='1' transform='rotate(45 17.0365 15.1223)' fill='black'></rect>" +
            "<path d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z' fill='black'></path>" +
            "</svg>" +
            "</span>" +
            "<input type='text' data-kt-user-table-filter='search' style='padding-left:32px' class='form-control form-control-solid w-250px ps-14 custom_" +
            _subString(id_table) +
            "_filter' placeholder='Search user'>" +
            "</div>";
        if (isSearch) {
            $(id_table + "_length")
                .parent()
                .html(template);
        }
    };

    var _handleTambah = function() {
        var validation;

        if (isSelectorExist("#form_tambah")) {
            const form = KTUtil.getById("form_tambah");

            // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
            validation = FormValidation.formValidation(form, {
                fields: {
                    nama: {
                        validators: {
                            notEmpty: {
                                message: "Nama Harus Diisi",
                            },
                        },
                    },
                    username: {
                        validators: {
                            notEmpty: {
                                message: "Username Harus Diisi",
                            },
                        },
                    },
                    email: {
                        validators: {
                            notEmpty: {
                                message: "Email Harus Diisi",
                            },
                            emailAddress: {
                                message: "Email tidak valid",
                            },
                        },
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "Password Harus Diisi",
                            },
                        },
                    },
                    id_role: {
                        validators: {
                            notEmpty: {
                                message: "Silahkan Pilih Role Terlebih Dahulu",
                            },
                        },
                    },
                    id_seksi: {
                        validators: {
                            notEmpty: {
                                message: "Silahkan Pilih Seksi Terlebih Dahulu",
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                },
            });

            $("#submit").on("click", function(e) {
                e.preventDefault();

                var _input = $("#form_tambah").serialize();

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    // console.log(_input)
                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "user/add",
                            method: "POST",
                            data: _input,
                            success: function(response) {
                                // console.log(response)
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

    var _handleUpdate = function() {
        var validation;

        if (isSelectorExist("#form_edit")) {
            const form = KTUtil.getById("form_edit");

            // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
            validation = FormValidation.formValidation(form, {
                fields: {
                    namaEdit: {
                        validators: {
                            notEmpty: {
                                message: "Nama Harus Diisi",
                            },
                        },
                    },
                    usernameEdit: {
                        validators: {
                            notEmpty: {
                                message: "Username Harus Diisi",
                            },
                        },
                    },
                    emailEdit: {
                        validators: {
                            notEmpty: {
                                message: "Email Harus Diisi",
                            },
                        },
                    },
                    id_roleEdit: {
                        validators: {
                            notEmpty: {
                                message: "Silahkan Pilih Role Terlebih Dahulu",
                            },
                        },
                    },
                    id_seksiEdit: {
                        validators: {
                            notEmpty: {
                                message: "Silahkan Pilih Seksi Terlebih Dahulu",
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                },
            });

            $("#submitEdit").on("click", function(e) {
                e.preventDefault();

                var _input = $("#form_edit").serialize();

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    // console.log(_input)
                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "user/edit",
                            method: "POST",
                            data: _input,
                            success: function(response) {
                                // console.log(response)
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

    var _handleDelete = function(id_user, nm_user) {
        swal
            .fire({
                text: "Apakah anda ingin menghapus user " + nm_user + "?",
                icon: "warning",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Batal",
            })
            .then(function(result) {
                if (result.isConfirmed) {
                    $.ajax({
                        url: BASE + "user/delete",
                        method: "POST",
                        data: { id: id_user },
                        success: function(response) {
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
                        error: function(e) {},
                    });
                }
            });
    };

    var _handleClose = function() {
        // Handle forgot button
        $(".tutup").on("click", function(e) {
            e.preventDefault();
            swal
                .fire({
                    text: "Data yang sudah diisi akan hilang, Apakah Anda yakin ingin menutup modal?",
                    icon: "warning",
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonText: "Tutup",
                    cancelButtonText: "Batal",
                    customClass: {
                        // confirmButton: "btn font-weight-bold btn-light-primary"
                    },
                })
                .then(function(result) {
                    // console.log(result)
                    if (result.isConfirmed) {
                        $(".modal").modal("hide");
                    }
                });
        });
    };

    return {
        // public functions
        init: function() {
            _initDatatable();
            _hideDefaultFilter();
            _showCustomFilter();
            _handleTambah();
            _handleUpdate();
            _initSelect2();
            _handleClose();
        },
    };
})();

jQuery(document).ready(function() {
    InalumUser.init();
});