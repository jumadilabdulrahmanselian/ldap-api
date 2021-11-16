$("#kt_datatable1 tbody").on("click", ".tombolEdit", function() {
    button_action({
        label: "Ubah Data Prosedur Manual",
        btnLabel: "Ubah Data",
        type: "Edit",
        url: "pmanual/edit",
        modal: "modalEdit",
        form: "form_edit",
    });

    const id = $(this).data("id");

    // GET DATA JADWAL HERE FOR EDIT
    $.ajax({
        url: BASE + "pmanual/getedit",
        data: { id: id },
        method: "post",
        success: function(data) {
            var pmanual = JSON.parse(data);
            // console.log(span);
            $("#idPmanualEdit").val(pmanual.data[0].ID_FILES);
            $("#nomorPmanualEdit").val(pmanual.data[0].NO_FILES);
            $("#judulPmanualEdit").val(pmanual.data[0].NM_FILES);
            $("#revisiPmanualEdit").val(pmanual.data[0].REVISI);
            $("#amandemenPmanualEdit").val(pmanual.data[0].AMANDEMEN);
            $("#linkfilePmanualEdit").val(pmanual.data[0].FILE);
            $("#tglberlakuPmanualEdit").val(pmanual.data[0].FULL_TGL_BERLAKU);
            if (pmanual.data[0].FILE) {
                document.getElementById("lihatfilePmanualEdit").style.display = "block";
                document.getElementById("checkfilePmanualEdit").hidden = false;
                document.getElementById("linkfilePmanualEdit").href =
                    BASE + pmanual.data[0].FILE;
                $("#isfilePmanualEdit").val("1");
            } else {
                document.getElementById("lihatfilePmanualEdit").style.display = "none";
                document.getElementById("checkfilePmanualEdit").hidden = true;
                $("#isfilePmanualEdit").val("0");
            }
            $("#jenissalinanPmanualEdit").val(pmanual.data[0].JENIS_SALINAN);

            $(".selectpicker").selectpicker("refresh");
        },
    });
});

$("#kt_datatable1 tbody").on("click", ".download", function() {
    button_action({
        label: "Download File Prosedur Manual",
        btnLabel: "Download",
        type: "save",
        url: "pmanual/download",
        modal: "modalDownload",
        form: "form_download",
    });

    const id = $(this).data("id");
    const idjenis = $(this).data("idjenis");
    const iduser = $(this).data("iduser");
    const idrole = $(this).data("idrole");
    const idseksi = $(this).data("idseksi");
    const jenissalinan = $(this).data("jenissalinan");

    if (jenissalinan == 1 && (idrole != 1 && idrole != 4)) {
        // GET DATA FILE & SALINAN HERE TO DOWNLOAD
        $.ajax({
            url: BASE + "pmanual/get_file_salinan",
            data: { idfiles: id, idjenis: idjenis, idseksi: idseksi },
            method: "post",
            success: function(data) {
                var file = JSON.parse(data);
                console.log(file);

                $("#iddownloadfilePmanual").val(file.data[0].ID_FILES);
                $("#downloadfilePmanual").val(file.data[0].FILE);
                $("#downloadsalinanPmanual").val(file.data[0].NO_SALINAN);
                $("#iduserdownloadfilePmanual").val(iduser);
                $("#idsalinandownloadfilePmanual").val(file.data[0].ID_SALINAN);
            },
        });
    } else {
        // GET DATA FILE & SALINAN HERE TO DOWNLOAD
        $.ajax({
            url: BASE + "pmanual/getedit",
            data: { id: id },
            method: "post",
            success: function(data) {
                var file = JSON.parse(data);
                console.log(file);

                $("#iddownloadfilePmanual").val(file.data[0].ID_FILES);
                $("#downloadfilePmanual").val(file.data[0].FILE);
                $("#downloadsalinanPmanual").val(idseksi);
                $("#iduserdownloadfilePmanual").val(iduser);
                $("#idsalinandownloadfileImanual").val(0);
            },
        });
    }
});

var i = 0;
var index = 0;
var listidseksi = [];
var listnmseksi = [];
var listaliasseksi = [];

$("#kt_datatable1 tbody").on("click", ".tombolPilih", function() {
    button_action({
        label: "Pilih Unit Untuk File Prosedur Manual",
        btnLabel: "Simpan",
        type: "save",
        url: "pmanual/salinanseksi",
        modal: "modalPilihseksi",
        form: "formModalPilihseksi",
    });

    const id = $(this).data("id");
    const idjenis = $(this).data("idjenis");

    $("#listsalinan").empty();
    $("#listsalinanexist").val("i");

    // GET DATA SEKSI
    $.ajax({
        url: BASE + "pmanual/get_all_seksi",
        method: "post",
        success: function(data) {
            var seksi = JSON.parse(data);
            console.log(seksi);
            var i = 0;

            $("#idsalinanfilePmanual").val(id);
            $("#idsalinanjenisfilePmanual").val(idjenis);

            $.each(seksi.data, function() {
                listidseksi.push(seksi.data[i].ID_SEKSI);
                listnmseksi.push(seksi.data[i].NM_SEKSI);
                listaliasseksi.push(seksi.data[i].ALIAS_SEKSI);
                i++;
            });
            // console.log(listnmseksi);
        },
    }).done(function() {
        // GET DATA SALINAN
        $.ajax({
            url: BASE + "pmanual/get_salinan",
            data: { id: id },
            method: "post",
            success: function(data) {
                var salinan = JSON.parse(data);
                console.log(salinan);
                i = 0;
                var listidseksiexist = [];

                $.each(salinan.data, function() {
                    console.log(salinan.data[i].ID_SEKSI);
                    listidseksiexist.push(salinan.data[i].ID_SEKSI);
                    var select = "";
                    select += "<div class='form-group'>";
                    select += '<div class="input-group">';
                    select +=
                        '<label class="form-control col-2">' +
                        salinan.data[i].NO_SALINAN +
                        "</label>";
                    select +=
                        '<input type="text" value="' +
                        salinan.data[i].NM_SEKSI +
                        '" class="form-control selectpicker" disabled>';
                    select += '<div class="input-group-append">';
                    //   select +=
                    //     '<button id="removeRow" type="button" class="btn btn-danger">Remove</button>';
                    select += "</div>";
                    select += "</div>";

                    $("#listsalinan").append(select);
                    i++;
                });

                $("#listsalinanexist").val(listidseksiexist);

                index = i;
                $("#indexsalinanPmanual").val(index);

                // console.log(listnmseksi);
            },
        });
    });
});

function addfield() {
    i++;
    //   var number = document.getElementById("member").value;

    console.log(listnmseksi.length);

    var select = "";
    select += '<div class="form-group inputfield">';
    select += '<div class="input-group">';
    select += '<label class="form-control col-2">' + i + "</label>";
    select +=
        '<select class="form-control selectpicker" name="listsalinan[]" data-live-search="true">';
    select += '<option value="">Pilih Unit</option>';
    for (var j = 0; j < listidseksi.length; j++) {
        select +=
            '<option value="' +
            listidseksi[j] +
            '">' +
            listaliasseksi[j] +
            " - " +
            listnmseksi[j] +
            "</option>";
    }
    select += "</select>";
    select += '<div class="input-group-append">';
    //   select +=
    //     '<button id="removeRow" type="button" class="btn btn-danger">Remove</button>';
    select += "</div>";
    select += "</div>";

    //   console.log(select);
    $("#listsalinan").append(select);
    $(".selectpicker").selectpicker("refresh");
}

// remove row
$(document).on("click", "#removeRow", function() {
    if (i <= index) {
        i = index;
    } else {
        i--;
    }
    $(this).closest("#inputfield").remove();
    $("div .inputfield").last().remove();
});

$("#kt_datatable1 tbody").on("click", ".preview", function() {
    button_action({
        label: "Preview Data Prosedur Manual",
        btnLabel: "Preview Data",
        modal: "modalPreview",
    });

    const id = $(this).data("id");
    const file = $(this).data("file");

    console.log(BASE + "/" + file);

    // Google Doc Viewer tidak dapat mengkases local file
    //   url = "//docs.google.com/viewer?embedded=true&url=" + BASE + file;
    //docs.google.com/viewer?embedded=true&url=http://www.pdf995.com/samples/pdf.pdf

    url = file + "#toolbar=0";
    url.replace(" ", "");

    console.log(url);

    $("#previewfile").attr("src", url);
});

// Class definition
var KTFormControls = (function() {
    // Private functions
    var _handleTambah = function() {
        var validation;

        if (isSelectorExist("#form_tambah")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_tambah"), {
                    fields: {
                        nomorPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Nomor harus diisi",
                                },
                            },
                        },

                        judulPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Judul harus diisi",
                                },
                            },
                        },

                        revisiPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Revisi harus diisi",
                                },
                            },
                        },

                        amandemenPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Amandemen harus diisi",
                                },
                            },
                        },

                        tglberlakuPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal Berlaku harus diisi",
                                },
                            },
                        },

                        isfilePmanual: {
                            validators: {
                                file: {
                                    extension: "pdf",
                                    type: "application/pdf",
                                    message: "Please choose a PDF file",
                                },
                            },
                        },

                        jenissalinanPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Jenis Salinan harus diisi",
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
                console.log("add");

                var _input = new FormData(document.getElementById("form_tambah"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    console.log(status);
                    console.log(_input);
                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "pmanual/add",
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
                        nomorPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Nomor harus diisi",
                                },
                            },
                        },

                        judulPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Judul harus diisi",
                                },
                            },
                        },

                        revisiPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Revisi harus diisi",
                                },
                            },
                        },

                        amandemenPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Amandemen harus diisi",
                                },
                            },
                        },

                        tglberlakuPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Tanggal Berlaku harus diisi",
                                },
                            },
                        },

                        isfilePmanual: {
                            validators: {
                                file: {
                                    extension: "pdf",
                                    type: "application/pdf",
                                    message: "Please choose a PDF file",
                                },
                            },
                        },

                        jenissalinanPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Jenis Salinan harus diisi",
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

            $("#submitedit").on("click", function(e) {
                e.preventDefault();
                console.log("edit");

                var _input = new FormData(document.getElementById("form_edit"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    console.log(status);
                    console.log(_input);
                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "pmanual/edit",
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submitedit").removeClass(
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
                                $("#submitedit").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                            },
                        });
                    } else {
                        $("#submitedit").removeClass("spinner spinner-white spinner-right");
                    }
                });
            });
        }
    };
    // Private functions
    var _handleDownload = function() {
        var validation;

        if (isSelectorExist("#form_download")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_download"), {
                    fields: {
                        namecodedownloadPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Namecode harus diisi",
                                },
                            },
                        },

                        namadownloadPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Nama harus diisi",
                                },
                            },
                        },

                        keperluandownloadPmanual: {
                            validators: {
                                notEmpty: {
                                    message: "Keperluan harus diisi",
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

            $("#submitdownload").on("click", function(e) {
                e.preventDefault();
                console.log("edit");

                var _input = new FormData(document.getElementById("form_download"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    console.log(status);
                    console.log(_input);
                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "pmanual/download",
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submitdownload").removeClass(
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
                                $("#submitdownload").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                            },
                        });
                    } else {
                        $("#submitdownload").removeClass(
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
            _handleDownload();
        },
    };
})();

jQuery(document).ready(function() {
    KTFormControls.init();
});