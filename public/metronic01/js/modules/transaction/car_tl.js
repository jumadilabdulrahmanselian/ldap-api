// let editor;
// let editorEdit;

// ClassicEditor.create(document.querySelector("#catatanCAR"))
//     .then((newEditor) => {
//         editor = newEditor;
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// ClassicEditor.create(document.querySelector("#catatanCAREdit"))
//     .then((newEditor) => {
//         editorEdit = newEditor;
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// let kesimpulan;
// let kesimpulanEdit;

// ClassicEditor.create(document.querySelector("#kesimpulanCAR"))
//     .then((newEditor) => {
//         kesimpulan = newEditor;
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// ClassicEditor.create(document.querySelector("#kesimpulanCAREdit"))
//     .then((newEditor) => {
//         kesimpulanEdit = newEditor;
//     })
//     .catch((error) => {
//         console.error(error);
//     });

$("#kt_datatable1 tbody").on("click", ".lihatCatatan", function() {
    const id = $(this).data("id");
    const name = $(this).data("name");

    button_action({
        label: name,
        btnLabel: "Ubah Data",
        type: "edit",
        url: "car_tindak_lanjut/edittemuan",
        modal: "modalDeskripsi",
        form: "form_edit",
    });

    $.ajax({
        url: BASE + "car_tindak_lanjut/getedit",
        data: { id: id },
        method: "post",
        success: function(data) {
            var car = JSON.parse(data);
            console.log(car);
            $("#modalLabelDeskripsi").html(name);
            if (name == "Kesimpulan") {
                $("#viewDeskripsi").html(car.data[0].KESIMPULAN);
            } else {
                $("#viewDeskripsi").html(car.data[0].CATATAN);
            }

            // if (
            //   car.data[0].FILE_TEMUAN_LTK != "" &&
            //   car.data[0].FILE_TEMUAN_LTK != null
            // ) {
            //   $("#ltkAwalLink").attr("href", BASE + car.data[0].FILE_TEMUAN_LTK);
            //   $("#ltkAwal").show();
            // } else {
            //   $("#ltkAwal").hide();
            // }

            // if (
            //   car.data[0].FILE_TL_LTK != "" &&
            //   car.data[0].FILE_TL_LTK != null
            // ) {
            //   $("#ltkProgressLink").attr("href", BASE + car.data[0].FILE_TL_LTK);
            //   $("#ltkProgress").show();
            // } else {
            //   $("#ltkProgress").hide();
            // }

            // var tl = car.data[0].DESKRIPSI_TL;
            // if (tl === "" || tl === null) {
            //   document.getElementById("viewTL").classList.add("text-danger");
            //   if (
            //     car.data[0].FILE_TEMUAN_LTK != "" &&
            //     car.data[0].FILE_TEMUAN_LTK != null &&
            //     (car.data[0].FILE_TEMUAN_TL == "" ||
            //       car.data[0].FILE_TL_LTK == null)
            //   ) {
            //     $("#viewTL").html("<br />Belum Ada");
            //   } else {
            //     $("#viewTL").html("Belum Ada");
            //   }
            // } else {
            //   document.getElementById("viewTL").classList.remove("text-danger");
            //   $("#viewTL").html(car.data[0].DESKRIPSI_TL);
            // }
        },
    });
});

$("#kt_datatable1 tbody").on("click", ".tambahProgress", function() {
    const id = $(this).data("id");
    const menu = $(this).data("menu");

    button_action({
        label: "Tambah CAR Final",
        btnLabel: "Simpan",
        type: "edit",
        url: BASE + "car_tindak_lanjut/progress/" + menu,
        modal: "modalProgress",
        form: "form_progress",
    });

    $.ajax({
        url: BASE + "car_tindak_lanjut/getedit/" + menu,
        data: { id: id },
        method: "post",
        success: function(data) {
            var car = JSON.parse(data);
            console.log(car);

            $("#idProgress").val(car.data[0].ID_CAR);
            // $("#jenisTemuanProgress").val(car.data[0].JENIS_TEMUAN);

            // if (car.data[0].JENIS_TEMUAN === "") {
            //     $("#uploadProgress").show();
            // } else {
            //     $("#uploadProgress").hide();
            // }
            // $("#noFormEdit").val(car.data[0].NO_FORM);
            // $("#judulFormEdit").val(car.data[0].JUDUL_FORM);

            $("#unggahanProgress").attr("href", BASE + car.data[0].FILE_TL);
            if (
                car.data[0].FILE_TL !== "" &&
                car.data[0].FILE_TL !== null
            ) {
                // console.log(car.data[0].FILE_TL);
                $("#igpProgress").show();
                $("#checkFilesProgress").show();
                $("#isProgress").val("1");
            } else {
                $("#igpProgress").hide();
                $("#checkFilesProgress").hide();
                $("#isProgress").val("0");
            }

            $(".selectpicker").selectpicker("refresh");
        },
    });
});

$("#kt_datatable1 tbody").on("click", ".tombolEdit", function() {
    const id = $(this).data("id");
    const menu = $(this).data("menu");

    button_action({
        label: "Ubah Data Corrective Action Request",
        btnLabel: "Ubah Data",
        type: "edit",
        url: "car_tindak_lanjut/edit/" + menu,
        modal: "modalEdit",
        form: "form_edit",
    });

    $.ajax({
        url: BASE + "car_tindak_lanjut/getedit/" + menu,
        data: { id: id },
        method: "post",
        success: function(data) {
            var car = JSON.parse(data);
            console.log(car);
            $("#idEdit").val(car.data[0].ID_CAR);
            var jadwal = car.data[0].JADWAL.split(",");
            console.log(car.data[0].JADWAL);
            $("#idJadwalEdit").val(jadwal);
            $("#listJadwalEdit").val(car.data[0].JADWAL);
            $("#idSeksiEdit").val(car.data[0].SEKSI);
            $("#noCarEdit").val(car.data[0].NO_CAR);
            $("#judulCarEdit").val(car.data[0].JUDUL_CAR);
            $("#tglDeadlineEdit").val(car.data[0].FULL_TGL_DEADLINE);
            console.log(car.data[0].FULL_TGL_DEADLINE);
            // $("#emailPICEdit").val(car.data[0].EMAIL_PIC);

            // editorEdit.setData("");
            // if (car.data[0].CATATAN !== "" && car.data[0].CATATAN !== null) {
            //     editorEdit.setData(car.data[0].CATATAN);
            // }

            // kesimpulanEdit.setData("");
            // if (car.data[0].KESIMPULAN !== "" && car.data[0].KESIMPULAN !== null) {
            //     kesimpulanEdit.setData(car.data[0].KESIMPULAN);
            // }

            $("#unggahanFileEdit").attr("href", BASE + car.data[0].FILE_CAR);
            if (car.data[0].FILE_CAR !== "" && car.data[0].FILE_CAR !== null) {
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

$("#idJadwal").on("change", function() {
    var value = $(this).val();
    var result = $("#idJadwal option:selected")
        .map(function() {
            return $(this).data("seksi");
        })
        .get();

    var join = result.join(", ");
    $("#jenisTanahString").val(join);

    $("#listJadwal").val(value);
    var value2 = $("#listJadwal").val();
    $("#idSeksi").val(join);
    console.log("idSeksi: " + join);
    console.log("listJadwal: " + value2);

    // $('.selectpicker').selectpicker('refresh');
});

$("#idJadwalEdit").on("change", function() {
    var value = $(this).val();
    var result = $("#idJadwalEdit option:selected")
        .map(function() {
            return $(this).data("seksi");
        })
        .get();

    var join = result.join(", ");
    $("#jenisTanahString").val(join);

    $("#listJadwalEdit").val(value);
    $("#idSeksiEdit").val(join);
    console.log("idSeksi: " + join);
    console.log("listJadwal: " + value);

    // $('.selectpicker').selectpicker('refresh');
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
                        noCar: {
                            validators: {
                                notEmpty: {
                                    message: "Nomor harus diisi",
                                },
                            },
                        },

                        judulCar: {
                            validators: {
                                notEmpty: {
                                    message: "Judul harus diisi",
                                },
                            },
                        },

                        tglDeadline: {
                            validators: {
                                notEmpty: {
                                    message: "Batas Waktu harus diisi",
                                },
                            },
                        },

                        idJadwal: {
                            validators: {
                                notEmpty: {
                                    message: "Jadwal harus dipilih",
                                },
                            },
                        },

                        // fileCAR: {
                        //     validators: {
                        //         file: {
                        //             extension: "pdf",
                        //             type: "application/pdf",
                        //             message: "Silahkan pilih file PDF",
                        //         },
                        //     },
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

            $("#submit").on("click", function(e) {
                e.preventDefault();
                const jenis = $(this).data("jenis");
                const menu = $(this).data("menu");
                //   console.log("add");

                var _input = new FormData(document.getElementById("form_tambah"));
                // _input.append("catatanCAR", editor.getData());
                // _input.append("kesimpulanCAR", kesimpulan.getData());

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "car_tindak_lanjut/add/" + menu,
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
                        noCarEdit: {
                            validators: {
                                notEmpty: {
                                    message: "Nomor harus diisi",
                                },
                            },
                        },

                        judulCarEdit: {
                            validators: {
                                notEmpty: {
                                    message: "Judul harus diisi",
                                },
                            },
                        },

                        tglDeadlineEdit: {
                            validators: {
                                notEmpty: {
                                    message: "Batas Waktu harus diisi",
                                },
                            },
                        },

                        idJadwalEdit: {
                            validators: {
                                notEmpty: {
                                    message: "Jadwal harus dipilih",
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
                const menu = $(this).data("menu");
                // console.log("edit");

                var _input = new FormData(document.getElementById("form_edit"));
                // _input.append("catatanCAR", editorEdit.getData());
                // _input.append("kesimpulanCAR", kesimpulanEdit.getData());

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: BASE + "car_tindak_lanjut/edit/" + menu,
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
    var _handleProgress = function() {
        var validation;

        if (isSelectorExist("#form_progress")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_progress"), {
                    fields: {
                        fileProgress: {
                            validators: {
                                // file: {
                                //     extension: "pdf",
                                //     type: "application/pdf",
                                //     message: "Silahkan pilih file PDF",
                                // },
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
                const menu = $(this).data("menu");
                // console.log("edit");

                var _input = new FormData(document.getElementById("form_progress"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: "car_tindak_lanjut/progress/" + menu,
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
            _handleProgress();
        },
    };
})();

jQuery(document).ready(function() {
    KTFormControls.init();
});

// PDF GENERATOR

$(document).on("click", ".tombolPrint", function() {
    // alert("rendering");
    $(".content_div_pdf").html("");
    $("#PrintPreview").show();

    button_action({
        label: "Print Preview",
        btnLabel: "Download",
        type: "edit",
        modal: "modalPrintPreview",
    });

    const id = $(this).data("id");

    // alert(id);

    // GET DATA JADWAL HERE FOR EDIT
    $.ajax({
        url: BASE + "car_tindak_lanjut/print",
        data: { id: id },
        method: "post",
        success: function(data) {
            var dataprint = JSON.parse(data);

            console.log(dataprint.data.length);

            // var no_temuan = dataprint.data[0].NO_TEMUAN.split("||");
            // var des_temuan = dataprint.data[0].DESKRIPSI_TEMUAN.split("||");
            // var jenis_temuan = dataprint.data[0].JENIS_TEMUAN.split("||");
            // var element_temuan = dataprint.data[0].ELEMENT_TEMUAN.split("||");
            // var status_temuan = dataprint.data[0].STATUS_TEMUAN.split("||");

            $.each(dataprint.data, function() {});

            // var paragraph = text1 + text2 + text3;

            var data = true;
            var gindex = 0;
            var gdataindex = 0;

            var gindextable = 0;

            var heightheader = 0;
            var limitheightcontent = 0;

            auditeee = dataprint.data[0].AUDITEE;
            if (auditeee == null) {
                auditeee = "";
            }

            PrintHeader(
                dataprint.data[0].NO_CAR,
                dataprint.data[0].ALIAS_SEKSI,
                auditeee,
                dataprint.data[0].TGL_MULAI,
                dataprint.data[0].TGL_SELESAI,
                dataprint.data[0].LIST_AUDITOR,
                dataprint.data[0].KESIMPULAN
            );
            heightheader = Math.round(
                $(".table1").height() +
                $(".table2").height() +
                $(".table3").height() +
                $(".table4").height()
            );
            limitheightcontent = 1010 - heightheader;

            console.log("/////////////////////////////" + heightheader);

            while (data == true) {
                // heightheader = Math.round(
                //   $(".table1").height() +
                //     $(".table2").height() +
                //     $(".table3").height() +
                //     $(".table4").height()
                // );
                // console.log("/////////////////////////////" + heightheader);

                console.log("index table :" + gdataindex);
                console.log("index tr :" + gindex);
                PrintTable(gdataindex);

                if (gindex < dataprint.data.length) {
                    IterateData(
                        gindex,
                        dataprint.data.length,
                        gdataindex,
                        dataprint.data[gindex].DESKRIPSI_TEMUAN,
                        dataprint.data[gindex].NO_TEMUAN,
                        dataprint.data[gindex].JENIS_TEMUAN,
                        dataprint.data[gindex].ID_ELEMENT,
                        dataprint.data[gindex].STATUS_TEMUAN,
                        dataprint.data[0].NO_CAR,
                        dataprint.data[0].ALIAS_SEKSI,
                        dataprint.data[0].AUDITEE,
                        dataprint.data[0].TGL_MULAI,
                        dataprint.data[0].TGL_SELESAI,
                        dataprint.data[0].LIST_AUDITOR,
                        dataprint.data[0].KESIMPULAN
                    );
                } else {
                    var table = document.getElementsByTagName("table");

                    for (var i = 0, a = table[i]; i < table.length; i++, a = table[i]) {
                        if (a.getElementsByTagName("td").length === 0) {
                            // a.parentElement.removeChild(a);
                            a.style.display = "none";
                        }
                    }
                    var ajaxcatatan = dataprint.data[0].CATATAN;
                    PrintCatatan(ajaxcatatan);
                    data = false;
                }
            }

            function IterateData(
                index,
                arr,
                dataindex,
                datacontenttable,
                no,
                jenis,
                element,
                status,
                car_nomor,
                car_seksi,
                car_auditee,
                car_mulai,
                car_selesai,
                car_auditor,
                car_kesimpulan
            ) {
                if (index < arr) {
                    var heightcounter = 0;
                    heightcounter = $("#data" + dataindex).height();
                    console.log(heightcounter);
                    if (heightcounter > limitheightcontent) {
                        // Add Margin Bottom
                        var heightremain = $(".canvas_div_pdf").height();
                        AddMarginBottom(heightremain);

                        PrintHeader(
                            car_nomor,
                            car_seksi,
                            car_auditee,
                            car_mulai,
                            car_selesai,
                            car_auditor,
                            car_kesimpulan
                        );
                        gindextable = 0;
                        // gindex++;
                        console.log("++++++++++++++++++++ " + gdataindex);
                        gdataindex++;
                        data = true;
                        // break;
                    } else {
                        console.log("++++++++++++++++ PRINT KE 5 DISINI" + (index + 1));
                        PrintFull(
                            gindextable,
                            index,
                            dataindex,
                            datacontenttable,
                            no,
                            jenis,
                            element,
                            status
                        );
                        // CEK TR setelah cetak
                        console.log("=================" + dataindex);
                        heightcounter = $("#data" + dataindex).height();
                        console.log(
                            "cek height table:" + dataindex + " besaran " + heightcounter
                        );
                        if (heightcounter > limitheightcontent) {
                            // Remove Last TR
                            // RemoveLastTr(index, dataindex);
                            console.log(
                                "Eksekusi remove:" + index + " dari table " + dataindex
                            );
                            $("#data" + dataindex + " tr:last").remove();

                            // CEK REMOVE 1 BY 1 LAST </P> FROM DATA CONTENT TABLE
                            var printres = false;
                            // var countprint = 0;

                            while (printres == false) {
                                var splitcontenttable = datacontenttable.split("</p>");
                                // splitcontenttable = splitcontenttable.pop();
                                console.log(splitcontenttable);
                                var datacontentpartialtable1 = datacontenttable;
                                var datacontentpartialtable2 = "";
                                var temp = "";
                                for (var i = 1; i <= splitcontenttable.length - 1; i++) {
                                    console.log(splitcontenttable);
                                    console.log(
                                        "cek iterasi : " + i + " dari " + splitcontenttable.length
                                    );
                                    if (i != 0) {
                                        datacontentpartialtable1 = datacontentpartialtable1.replace(
                                            splitcontenttable[splitcontenttable.length - i] + "</p>",
                                            ""
                                        );

                                        temp =
                                            splitcontenttable[splitcontenttable.length - i] + "</p>";
                                        datacontentpartialtable2 = temp + datacontentpartialtable2;

                                        // CETAK
                                        console.log(datacontentpartialtable1);
                                        console.log("exe print partial");
                                        PrintFull(
                                            gindextable,
                                            index,
                                            dataindex,
                                            datacontentpartialtable1,
                                            no,
                                            jenis,
                                            element,
                                            status
                                        );
                                        // CEK TR setelah cetak
                                        heightcounter = $("#data" + dataindex).height();
                                        console.log(
                                            "cek height table:" +
                                            dataindex +
                                            " sebesar " +
                                            heightcounter
                                        );
                                        if (heightcounter > limitheightcontent) {
                                            // Remove Last Partial TR

                                            console.log(
                                                "Eksekusi remove:" + index + " dari table " + dataindex
                                            );
                                            $("#data" + dataindex + " tr:last").remove();
                                        } else {
                                            console.log("exe print partial 1 selesai");
                                            printres = true;
                                            // Add Margin Bottom
                                            var heightremain = $(".canvas_div_pdf").height();
                                            AddMarginBottom(heightremain);

                                            console.log("exe print partial 2");
                                            PrintHeader(
                                                car_nomor,
                                                car_seksi,
                                                car_auditee,
                                                car_mulai,
                                                car_selesai,
                                                car_auditor,
                                                car_kesimpulan
                                            );
                                            gindextable = 0;
                                            console.log(
                                                "gindextable table after delete:" + gindextable
                                            );
                                            gdataindex++;
                                            PrintTable(gdataindex);
                                            gindex = index;
                                            PrintFull(
                                                gindextable,
                                                index,
                                                gdataindex,
                                                datacontentpartialtable2,
                                                no,
                                                jenis,
                                                element,
                                                status
                                            );
                                            console.log("iterasi printres :" + printres);
                                            // data = true;
                                            // i = splitcontenttable.length;
                                            break;
                                        }
                                        if (i == splitcontenttable.length - 1) {
                                            console.log("force to create new page");
                                            printres = true;

                                            var heightremain = $(".canvas_div_pdf").height();
                                            AddMarginBottom(heightremain);

                                            PrintHeader(
                                                car_nomor,
                                                car_seksi,
                                                car_auditee,
                                                car_mulai,
                                                car_selesai,
                                                car_auditor,
                                                car_kesimpulan
                                            );
                                            gindextable = 0;
                                            gindex = index;
                                            console.log("++++++++++++++++++++ " + gdataindex);
                                            gdataindex++;
                                            data = true;
                                            // break;
                                        }
                                    }
                                }
                            }
                        } else if (limitheightcontent - heightcounter < 80) {
                            var heightremain = $(".canvas_div_pdf").height();
                            AddMarginBottom(heightremain);

                            PrintHeader(
                                car_nomor,
                                car_seksi,
                                car_auditee,
                                car_mulai,
                                car_selesai,
                                car_auditor,
                                car_kesimpulan
                            );
                            gindextable = 0;
                            // gindex = index;
                            console.log("++++++++++++++++++++ " + gdataindex);
                            gdataindex++;
                            data = true;
                        }
                        // IterateData(index++, 5, dataindex);
                    }
                } else {
                    var ajaxcatatan = dataprint.data[0].CATATAN;
                    PrintCatatan(ajaxcatatan);
                    data = false;
                }
            }

            function AddMarginBottom(content_height) {
                // Add Margin Bottom
                var heightremain = content_height;
                if (heightremain > 1120) {
                    var page = Math.round(heightremain / 1120);
                    heightremain = 1120 * page - heightremain;
                    console.log("bottom 2" + heightremain);
                    $(".content_div_pdf").append(
                        "<div style='height: " + heightremain + "px;'></div>"
                    );
                } else {
                    heightremain = 1120 - heightremain;
                    console.log("bottom > 2 page" + heightremain);
                    $(".content_div_pdf").append(
                        "<div style='height: " + heightremain + "px;'></div>"
                    );
                }
            }

            function PrintFull(
                pgindextable,
                pindex,
                pdataindex,
                pdatacontenttable,
                no,
                jenis,
                element,
                status
            ) {
                console.log("gindextable table before delete:" + pgindextable);
                console.log("Eksekusi cetak:" + pgindextable + " di table " + pindex);
                PrintToTable(
                    pdataindex,
                    pindex,
                    pdatacontenttable,
                    no,
                    jenis,
                    element,
                    status
                );
                console.log("Baris Ke : " + gindex);
                gindex++;
                // gindextable++;

                var table = document.getElementById("data" + pdataindex).rows;
                console.log("tinggi baris ini " + table[pgindextable].offsetHeight);
            }
        },
    });
});

// ============================== JALANKAN INI NAK
// $(document).ready(function () {
//   console.log("ready!");

//   var data = true;
//   var gindex = 0;
//   var gdataindex = 0;

//   var gindextable = 0;

//   var tokens1 = ["Ganyu1 ", "Childe1 ", "Hu tao1 "];
//   var text1 = "";
//   text1 += "<p>";
//   for (var i = 0; i < 180; i++) {
//     text1 += tokens1[Math.floor(Math.random() * tokens1.length)];
//   }
//   text1 += "</p>";

//   var tokens2 = ["Ganyu2 ", "Childe2 ", "Hu tao2 "];
//   var text2 = "";
//   text2 += "<p>";
//   for (var i = 0; i < 52; i++) {
//     text2 += tokens2[Math.floor(Math.random() * tokens2.length)];
//   }
//   text2 += "</p>";

//   var tokens3 = ["Ganyu3 ", "Childe3 ", "Hu tao3 "];
//   var text3 = "";
//   text3 += "<p>";
//   for (var i = 0; i < 40; i++) {
//     text3 += tokens3[Math.floor(Math.random() * tokens3.length)];
//   }
//   text3 += "</p>";

//   var paragraph = text1 + text2 + text3;

//   PrintHeader();

//   while (data == true) {
//     console.log("index table :" + gdataindex);
//     console.log("index tr :" + gindex);
//     PrintTable(gdataindex);

//     IterateData(gindex, 4, gdataindex, paragraph);
//   }

//   function IterateData(index, arr, dataindex, datacontenttable) {
//     if (index < arr) {
//       var heightcounter = 0;
//       heightcounter = $("#data" + dataindex).height();
//       console.log(heightcounter);
//       if (heightcounter > 600) {
//         // Add Margin Bottom
//         var heightremain = $(".canvas_div_pdf").height();
//         AddMarginBottom(heightremain);

//         PrintHeader();
//         gindextable = 0;
//         // gindex++;
//         console.log("++++++++++++++++++++ " + gdataindex);
//         gdataindex++;
//         data = true;
//         // break;
//       } else {
//         console.log("++++++++++++++++ PRINT KE 5 DISINI" + (index + 1));
//         PrintFull(gindextable, index, dataindex, datacontenttable);
//         // CEK TR setelah cetak
//         console.log("=================" + dataindex);
//         heightcounter = $("#data" + dataindex).height();
//         console.log(
//           "cek height table:" + dataindex + " besaran " + heightcounter
//         );
//         if (heightcounter > 600) {
//           // Remove Last TR
//           // RemoveLastTr(index, dataindex);
//           console.log("Eksekusi remove:" + index + " dari table " + dataindex);
//           $("#data" + dataindex + " tr:last").remove();

//           // CEK REMOVE 1 BY 1 LAST </P> FROM DATA CONTENT TABLE
//           var printres = false;
//           // var countprint = 0;

//           while (printres == false) {
//             var splitcontenttable = datacontenttable.split("</p>");
//             // splitcontenttable = splitcontenttable.pop();
//             console.log(splitcontenttable);
//             var datacontentpartialtable1 = datacontenttable;
//             var datacontentpartialtable2 = "";
//             var temp = "";
//             for (var i = 1; i <= splitcontenttable.length - 1; i++) {
//               console.log(splitcontenttable);
//               console.log(
//                 "cek iterasi : " + i + " dari " + splitcontenttable.length
//               );
//               if (i != 1) {
//                 datacontentpartialtable1 = datacontentpartialtable1.replace(
//                   splitcontenttable[splitcontenttable.length - i] + "</p>",
//                   ""
//                 );

//                 temp = splitcontenttable[splitcontenttable.length - i] + "</p>";
//                 datacontentpartialtable2 = temp + datacontentpartialtable2;

//                 // CETAK
//                 console.log(datacontentpartialtable1);
//                 console.log("exe print partial");
//                 PrintFull(
//                   gindextable,
//                   index,
//                   dataindex,
//                   datacontentpartialtable1
//                 );
//                 // CEK TR setelah cetak
//                 heightcounter = $("#data" + dataindex).height();
//                 console.log(
//                   "cek height table:" + dataindex + " sebesar " + heightcounter
//                 );
//                 if (heightcounter > 600) {
//                   // Remove Last Partial TR

//                   console.log(
//                     "Eksekusi remove:" + index + " dari table " + dataindex
//                   );
//                   $("#data" + dataindex + " tr:last").remove();
//                 } else {
//                   console.log("exe print partial 1 selesai");
//                   printres = true;
//                   // Add Margin Bottom
//                   var heightremain = $(".canvas_div_pdf").height();
//                   AddMarginBottom(heightremain);

//                   console.log("exe print partial 2");
//                   PrintHeader();
//                   gindextable = 0;
//                   console.log("gindextable table after delete:" + gindextable);
//                   gdataindex++;
//                   PrintTable(gdataindex);
//                   gindex = index;
//                   PrintFull(
//                     gindextable,
//                     index,
//                     gdataindex,
//                     datacontentpartialtable2
//                   );
//                   console.log("iterasi printres :" + printres);
//                   // data = true;
//                   // i = splitcontenttable.length;
//                   break;
//                 }
//                 if (i == splitcontenttable.length - 1) {
//                   console.log("force to create new page");
//                   printres = true;

//                   var heightremain = $(".canvas_div_pdf").height();
//                   AddMarginBottom(heightremain);

//                   PrintHeader();
//                   gindextable = 0;
//                   gindex = index;
//                   console.log("++++++++++++++++++++ " + gdataindex);
//                   gdataindex++;
//                   data = true;
//                   // break;
//                 }
//               }
//             }
//           }
//         } else if (600 - heightcounter < 100) {
//           var heightremain = $(".canvas_div_pdf").height();
//           AddMarginBottom(heightremain);

//           PrintHeader();
//           gindextable = 0;
//           // gindex = index;
//           console.log("++++++++++++++++++++ " + gdataindex);
//           gdataindex++;
//           data = true;
//         }
//         // IterateData(index++, 5, dataindex);
//       }
//     } else {
//       var ajaxcatatan = "<p>Catatan :</p><p>Obs adalah Observasi</p>";
//       PrintCatatan(ajaxcatatan);
//       data = false;
//     }
//   }

//   function AddMarginBottom(content_height) {
//     // Add Margin Bottom
//     var heightremain = content_height;
//     if (heightremain > 1120) {
//       var page = Math.round(heightremain / 1120);
//       heightremain = Math.round(1120 * page - heightremain);
//       console.log("bottom 2" + heightremain);
//       $(".content_div_pdf").append(
//         "<div style='height: " + heightremain + "px;'></div>"
//       );
//     } else {
//       heightremain = Math.round(1120 - heightremain);
//       console.log("bottom > 2 page" + heightremain);
//       $(".content_div_pdf").append(
//         "<div style='height: " + heightremain + "px;'></div>"
//       );
//     }
//   }

//   function PrintFull(pgindextable, pindex, pdataindex, pdatacontenttable) {
//     console.log("gindextable table before delete:" + pgindextable);
//     console.log("Eksekusi cetak:" + pgindextable + " di table " + pindex);
//     PrintToTable(pdataindex, pindex, pdatacontenttable);
//     console.log("Baris Ke : " + gindex);
//     gindex++;
//     // gindextable++;

//     var table = document.getElementById("data" + pdataindex).rows;
//     console.log("tinggi baris ini " + table[pgindextable].offsetHeight);
//   }

//   function PrintPartial(pgindextable, pindex, pdataindex, pdatacontenttable) {
//     console.log("gindextable table before delete:" + pgindextable);
//     console.log("Eksekusi cetak:" + pgindextable + " di table " + pindex);
//     PrintToTable(pdataindex, pindex, pdatacontenttable);
//     // gindex++;
//     // gindextable++;

//     var table = document.getElementById("data" + pdataindex).rows;
//     console.log("tinggi baris ini " + table[pgindextable].offsetHeight);
//   }

//   function RemoveLastTr(rindex, rdataindex) {
//     // Remove Last TR
//     console.log("Eksekusi remove:" + rindex + " dari table " + rdataindex);
//     $("#data" + rdataindex + " tr:last").remove();
//     // Add Margin Bottom
//     var heightremain = $(".canvas_div_pdf").height();
//     AddMarginBottom(heightremain);

//     PrintHeader();
//     gindextable = 0;
//     console.log("gindextable table after delete:" + gindextable);
//     gdataindex++;
//     gindex--;
//     data = true;
//   }

//   // var heightcounter = 0;
//   // for (var i = 0; i < 5; i++) {
//   //   heightcounter = $(".table5").height();
//   //   console.log(heightcounter);
//   //   if (heightcounter > 600) {
//   //     $(".content_div_pdf").append(header);
//   //     break;
//   //   }
//   //   contenttable += "<tr>";
//   //   contenttable +=
//   //     '    <td class="text1 borderblack" width="35"><a>' +
//   //     (i + 1) +
//   //     "</a></td>";
//   //   contenttable += '    <td class="text2 borderblack" width="430">';
//   //   contenttable += "        <p>";
//   //   contenttable +=
//   //     "            Disarankan Kepada SIT untuk melakukan review Prosedur Manual";
//   //   contenttable +=
//   //     "            dan Instruksi Kerja yang dipergunakan SIT saat ini dimana terdapat rujukan";
//   //   contenttable += "            prosedur";
//   //   contenttable +=
//   //     "            sudah tidak berlaku lagi, ruang lingkup prosedur belum memasukkan aspek SME,";
//   //   contenttable += "            SMK3,";
//   //   contenttable += "            dan";
//   //   contenttable +=
//   //     "            SML yang sudah diterapkan Inalum dan Instruksi Kerja yang berlaku ada yang";
//   //   contenttable += "            tidak";
//   //   contenttable += "            relevan";
//   //   contenttable += "            lagi dengan implementasinya saat ini.";
//   //   contenttable += "            <br><br>";
//   //   contenttable += "            Contoh :<br>";
//   //   contenttable +=
//   //     "            Prosedur Pengelolaan Operasional Tehnologi Infrastruktur No.";
//   //   contenttable += "            SIT-PM04515-004/0";
//   //   contenttable +=
//   //     "            terdapat rujukan no SK-004/DIR/2018 yang sudah dicabut dengan terbitnya SK";
//   //   contenttable += "            yang";
//   //   contenttable += "            baru";
//   //   contenttable +=
//   //     "            yaitu SK=015/DIRPEL/2020 tentang Bagan Struktur Organsisasi dan Penugasan";
//   //   contenttable += "            Kerja";
//   //   contenttable += "            yang";
//   //   contenttable +=
//   //     "            terbit pada Juli 2020. Dan belum memasukkan aspek SM3, SMK3 dan SMK.";
//   //   contenttable += "            <br><br>";
//   //   contenttable +=
//   //     "            Instruksi Kerja No ST-WI09-006 bahwa pelaksanaan pemeliharaan perawatan";
//   //   contenttable +=
//   //     "            perangkat komputer dilakukan akan tetapi implementasinya saat ini tidak ada";
//   //   contenttable += "            lagi";
//   //   contenttable +=
//   //     "            perawatan perangkat tersebut karena penyediaan perangkat computer sudah";
//   //   contenttable += "            dilakukan pihak ke tiga";
//   //   contenttable += "        </p>";
//   //   contenttable += "    </td>";
//   //   contenttable +=
//   //     '    <td class="text3 borderblack" width="55"><a>Obs. (OFI)</a></td>';
//   //   contenttable += '    <td class="text3 borderblack" width="70"></td>';
//   //   contenttable += '    <td class="text3 borderblack" width="60"></td>';
//   //   contenttable += "</tr>";

//   //   $(".table5").append(contenttable);
//   //   contenttable = "";
//   // }
// });
// ============================== JALANKAN INI NAK

function PrintHeader(
    car_nomor,
    car_seksi,
    car_auditee,
    car_mulai,
    car_selesai,
    car_auditor,
    car_kesimpulan
) {
    console.log(car_auditee);
    var header = "";

    car_listauditee = car_auditee.split(",");
    car_listauditor = car_auditor.split(",");

    var totalauditee = car_listauditee.length;
    var totalauditor = car_listauditor.length;

    var colspan1 = totalauditee;
    var colspan2 = colspan1 - 1;

    var totalauditeecolspan = totalauditee + 1;

    var colspanauditor = [];

    for (var i = 0; i < totalauditor; i++) {
        if (i == totalauditor - 1) {
            var sum = colspanauditor.reduce(function(a, b) {
                return a + b;
            }, 0);
            colspanauditor.push(totalauditeecolspan - sum);
        } else {
            colspanauditor.push(Math.round(totalauditeecolspan / totalauditor));
        }
    }

    console.log("================Colspan Auditor :" + colspanauditor);

    // Table 1
    header += '<table class="table1">';
    header += '<tr style="line-height: 28px;">';
    header += '<td class="td1" rowspan="2">';
    header +=
        '    <img class="image2" src="http://localhost/inalum-ssm/assets/kOP.png" />';
    header += "</td>";
    header +=
        '<td style="border-left: 1px solid black; border-bottom: 1px solid black;" width="165"><a class="text2">No. Dokumen / Revisi</a></td>';
    header += "</tr>";
    header += "<tr>";
    header +=
        '<td style="border-left: 1px solid black;"><a class="text2">' +
        car_nomor +
        "</a></td>";
    header += "</tr>";
    header += "</table>";

    // Table 2

    header += '<table class="table2">';
    header += "<tr>";
    header += '    <td colspan="2" class="text3">';
    header += '        <a class="text1"><span>LAPORAN AUDIT EKSTERNAL</span></a>';
    header += "    </td>";
    header += "</tr>";
    header += "<tr>";
    header +=
        '    <td colspan="2"><a class="text2">SMM, SML, SMEn & SMK3</a></td>';
    header += "</tr>";
    header += "</table>";

    // Table 3

    // header += '<table class="table3">';
    // header += '<tr style="line-height: 20px">';
    // header += '    <td colspan="2" class="borderblack">';
    // header += '        <a class="text1" style="margin-left: 5px;">';
    // header += "            Lokasi&nbsp;&nbsp;&nbsp; :";
    // header += "            " + car_seksi + "";
    // header += "        </a>";
    // header += "    </td>";
    // header += '    <td class="borderblack" width="100"><a class="text1"';
    // header += '            style="margin-left: 5px;">Tanggal</a></td>';
    // header +=
    //   '    <td class="borderblack" width="110" style="text-align:center;"><a';
    // header += '            class="text1">Auditor</a></td>';
    // header +=
    //   '    <td class="borderblack" width="135" style="text-align:center;"><a class="text1">T.';
    // header += "            Tangan</a></td>";
    // header += "</tr>";
    // header += '<tr style="line-height: 15px">';
    // header +=
    //   '    <td class="borderblack" width="182" style="text-align:center;"><a';
    // header += '            class="text2">Auditee</a></td>';
    // header +=
    //   '    <td class="borderblack" width="130"><a class="text2">T. Tangan P. Auditee</a></td>';
    // header +=
    //   '    <td class="borderblack" style="text-align:center;"><a class="text3">' +
    //   car_mulai +
    //   "-" +
    //   car_selesai +
    //   "</a></td>";
    // header +=
    //   '    <td rowspan="4" class="borderblack"><a class="text3">Heriyanto P</a></td>';
    // header +=
    //   '    <td rowspan="4" class="borderblack"><a class="text3">Tanda Tangan</a></td>';
    // header += "</tr>";
    // header += '<tr class="tr1">';
    // header += '    <td><a class="text3">1.&nbsp;&nbsp; Emil Salim</a></td>';
    // header +=
    //   '    <td rowspan="7" class="borderblack ttd1"><a class="text3">Emil Salim</a></td>';
    // header +=
    //   '    <td class="borderblack" style="text-align:center;" style="line-height:16px"><a';
    // header += '            class="text2">Jam</a>';
    // header += "    </td>";
    // header += "</tr>";
    // header += '<tr class="tr1">';
    // header += '    <td><a class="text3">2.&nbsp;&nbsp; Iman S. Ginting</a></td>';
    // header +=
    //   '    <td rowspan="6" class="borderblack" style="text-align:center;"><a class="text2">10.00 -';
    // header += "            17.00</a></td>";
    // header += "</tr>";
    // header += '<tr class="tr1">';
    // header += '    <td><a class="text3">3.&nbsp;&nbsp; Reinhard PS</a></td>';
    // header += "</tr>";
    // header += '<tr class="tr1">';
    // header +=
    //   '    <td><a class="text3">4.&nbsp;&nbsp; Jabbar Abd. Gaffar</a></td>';
    // header +=
    //   '    <td rowspan="4" class="text3 borderblack"><a>B. Pandiangan</a></td>';
    // header +=
    //   '    <td rowspan="4" class="text3 borderblack"><a>Tanda Tangan</a></td>';
    // header += "</tr>";
    // header += '<tr class="tr1">';
    // header +=
    //   '    <td><a class="text3">5.&nbsp;&nbsp; Andrew B. Siagian</a></td>';
    // header += "</tr>";
    // header += '<tr class="tr1">';
    // header += '    <td><a class="text3">6.&nbsp;&nbsp; Endang Lisna</a></td>';
    // header += "</tr>";
    // header += '<tr class="tr1">';
    // header += '    <td><a class="text3">7.&nbsp;&nbsp; Sri Devika</a></td>';
    // header += "</tr>";
    // header += "</table>";

    // Table 3 Dynamic

    header += '<table class="table3">';
    header += '<tr style="line-height: 20px">';
    header += '    <td colspan="2" class="borderblack">';
    header += '        <a class="text1" style="margin-left: 5px;">';
    header += "            Lokasi&nbsp;&nbsp;&nbsp; :";
    header += "            " + car_seksi + "";
    header += "        </a>";
    header += "    </td>";
    header +=
        '    <td class="borderblack" width="100" style="text-align:center;"><a class="text1"';
    header += "            >Tanggal</a></td>";
    header +=
        '    <td class="borderblack" width="110" style="text-align:center;"><a';
    header += '            class="text1">Auditor</a></td>';
    header +=
        '    <td class="borderblack" width="135" style="text-align:center;"><a class="text1">T.';
    header += "            Tangan</a></td>";
    header += "</tr>";
    header += '<tr id="partial1" style="line-height: 15px">';
    header +=
        '    <td class="borderblack" width="182" style="text-align:center;"><a';
    header += '            class="text2">Auditee</a></td>';
    header +=
        '    <td class="borderblack" width="130"><a class="text2">T. Tangan P. Auditee</a></td>';
    header +=
        '    <td class="borderblack" style="text-align:center;"><a class="text3">' +
        car_mulai +
        " - " +
        car_selesai +
        "</a></td>";

    if (car_listauditor[0] != undefined) {
        header +=
            '    <td rowspan="' +
            colspanauditor[0] +
            '" class="borderblack"><a class="text3">' +
            car_listauditor[0] +
            "</a></td>";
        header +=
            '    <td rowspan="' +
            colspanauditor[0] +
            '" class="borderblack"><a class="text3"></a></td>';
        header += "</tr>";
    } else {
        header += "</tr>";
    }

    // Kolom Auditee, ttd auditee, head jam, start auditor dan tanda tangan auditor 2
    // var header = "";
    var j = 0;
    var rowspanned = colspanauditor[j] - 1;
    for (var i = 0; i < totalauditee; i++) {
        // header_table3_auiditee = "";
        if (i == 0) {
            console.log("Auditee 0/" + totalauditee + " : " + car_listauditee[i]);
            header += '<tr class="tr1" id="partial2">';
            header +=
                '    <td><a class="text3">' +
                (i + 1) +
                ".&nbsp;&nbsp;" +
                car_listauditee[i] +
                " </a></td>";
            header +=
                '    <td rowspan="' +
                colspan1 +
                '" class="borderblack ttd1"><a class="text3">' +
                car_listauditee[0] +
                " </a></td>";
            header +=
                '    <td class="borderblack" style="text-align:center;" style="line-height:16px"><a';
            header += '            class="text2">Jam</a>';
            header += "    </td>";

            if (i == rowspanned && car_listauditor[j + 1] != undefined) {
                header +=
                    '    <td rowspan="' +
                    colspanauditor[j + 1] +
                    '" class="borderblack"><a class="text3">' +
                    car_listauditor[j + 1] +
                    "</a></td>";
                header +=
                    '    <td rowspan="' +
                    colspanauditor[j + 1] +
                    '" class="borderblack"><a class="text3"></a></td>';
                // header += "</tr>";
                rowspanned += colspanauditor[j + 1];
                j++;
            }
            header += "</tr>";
        } else if (i == 1) {
            console.log("Auditee 1/" + totalauditee + " : " + car_listauditee[i]);

            header += '<tr class="tr1" id="partial3">';
            header +=
                '    <td><a class="text3">' +
                (i + 1) +
                ".&nbsp;&nbsp;" +
                car_listauditee[i] +
                " </a></td>";
            header +=
                '    <td rowspan="' +
                colspan2 +
                '" class="borderblack" style="text-align:center;"><a class="text2">10.00 -';
            header += "            17.00</a></td>";

            if (i == rowspanned && car_listauditor[j + 1] != undefined) {
                header +=
                    '    <td rowspan="' +
                    colspanauditor[j + 1] +
                    '" class="borderblack"><a class="text3">' +
                    car_listauditor[j + 1] +
                    "</a></td>";
                header +=
                    '    <td rowspan="' +
                    colspanauditor[j + 1] +
                    '" class="borderblack"><a class="text3"></a></td>';
                // header += "</tr>";
                rowspanned += colspanauditor[j + 1];
                j++;
            }
            header += "</tr>";
        } else {
            console.log(
                "Auditee " + (i + 1) + "/" + totalauditee + " : " + car_listauditee[i]
            );

            console.log("Baris untuk colspan /" + i + " : " + colspanauditor[j]);
            header += '<tr class="tr1" >';
            header +=
                '    <td><a class="text3">' +
                (i + 1) +
                ".&nbsp;&nbsp;" +
                car_listauditee[i] +
                " </a></td>";

            if (i == rowspanned && car_listauditor[j + 1] != undefined) {
                console.log("========================PRINT AUDITOR KE:" + j);
                console.log(
                    "========================Colspan" +
                    colspanauditor[j + 1] +
                    "auditor:" +
                    car_listauditor[j + 1]
                );
                header +=
                    '    <td rowspan="' +
                    colspanauditor[j + 1] +
                    '" class="borderblack"><a class="text3">' +
                    car_listauditor[j + 1] +
                    "</a></td>";
                header +=
                    '    <td rowspan="' +
                    colspanauditor[j + 1] +
                    '" class="borderblack"><a class="text3"></a></td>';
                // header += "</tr>";
                rowspanned += colspanauditor[j + 1];
                j++;
            }
            header += "</tr>";
        }
    }

    // Kolom Auditor dan Tanda Tangan Auditor
    // for (var i = 0; i < totalauditor; i++) {
    //   if (i == 0) {
    //   }
    // }
    // var header_table3_partial1 = "";
    // header_table3_partial1 +=
    //   '    <td rowspan="4" class="borderblack"><a class="text3">Heriyanto P</a></td>';
    // header_table3_partial1 +=
    //   '    <td rowspan="4" class="borderblack"><a class="text3">Tanda Tangan</a></td>';
    // header_table3_partial1 += "</tr>";
    // // =========================

    // header += "</table>";
    // $(".table3").append(header_table3_auiditee);
    // =========================

    // Table 4

    header += '<table class="table4">';
    header += '<tr style="line-height:15px;">';
    header +=
        '    <td colspan="5"><a class="text1">Kesimpulan hasil audit :</a></td>';
    header += "</tr>";
    header += '<tr style="line-height:18px;">';
    header += '    <td colspan="5" class="text2">';
    header += "        <a>";
    header += "" + car_kesimpulan + "";
    // header +=
    //   "            Secara umum audit berjalan dengan lancar, namun ada beberapa hal yang perlu";
    // header +=
    //   "           ditindaklanjuti sebagai perbaikan di Seksi, sebagai berikut :";
    header += "        </a>";
    header += "    </td>";
    header += "</tr>";
    header += '<tr style="line-height: 16px;">';
    header +=
        '    <td rowspan="2" class="text3 borderblack" width="35"><a>No</a></td>';
    header +=
        '    <td colspan="2" class="text3 borderblack" width="482"><a>Hasil Audit Eksternal</a></td>';
    header +=
        '    <td rowspan="2" class="text3 borderblack" width="70"><a>Elemen</a></td>';
    header +=
        '    <td rowspan="2" class="text3 borderblack" width="60"><a>Status</a></td>';
    header += "</tr>";
    header += '<tr style="line-height: 16px;">';
    header += '    <td class="text3 borderblack" width="433"><a>Temuan</a></td>';
    header += '    <td class="text3 borderblack" width="54"><a>Jenis</a></td>';
    header += "</tr>";
    header += "</table>";

    $(".content_div_pdf").append(header);
}

// test checkout commit
//
// function IterateData(index, arr, dataindex) {
//   if (index < arr) {
//     var heightcounter = 0;
//     heightcounter = $("#data" + dataindex).height();
//     console.log(heightcounter);
//     if (heightcounter > 600) {
//       PrintHeader();
//       gindex++;
//       gdataindex++;
//       data = true;
//       // break;
//     } else {
//       PrintToTable(dataindex, index);
//       IterateData(index++, 5, dataindex);
//     }
//   } else {
//     data = false;
//   }
// }

function PrintTable(index) {
    // Table 5
    var table = "";

    table +=
        '<table class="table5" id="data' +
        index +
        '" cellspacing="0" style="border-collapse:collapse;">';
    table += "</table>";

    $(".content_div_pdf").append(table);
}

function PrintCatatan(catatan) {
    console.log("print catatan" + catatan);

    var content = "";

    content +=
        '<table class="table5" id="datacatatan" cellspacing="0" style="border-collapse:collapse;">';
    content += "<tr>";
    content +=
        '<td class="text2 borderblack"><strong>Catatan : </strong><br/><br/>' +
        catatan +
        "</td>";
    content += "</tr>";
    content += "</table>";

    $(".content_div_pdf").append(content);
}

function PrintToTable(
    dataindex,
    index,
    datacontenttable,
    no,
    jenis,
    element,
    status
) {
    var contenttable = "";

    if (datacontenttable == null) {
        datacontenttable = "";
    }

    if (no == null) {
        no = "";
    }

    if (status == "O") {
        status = "Open";
    } else if (status == "C") {
        status = "Closed";
    } else {
        status = "";
    }

    if (jenis == "OFI") {
        jenis = "Obs. (OFI)";
    } else if (jenis == "NC") {
        jenis = "LTK. (NC)";
    } else {
        jenis = "";
    }

    contenttable += "<tr>";
    contenttable +=
        '    <td class="text1 borderblack" width="35"><a>' + no + "</a></td>";
    contenttable += '    <td class="text2 borderblack" width="433">';
    contenttable += datacontenttable;
    // contenttable += "        <p>";
    // contenttable +=
    //   "            Disarankan Kepada SIT untuk melakukan review Prosedur Manual";
    // contenttable +=
    //   "            dan Instruksi Kerja yang dipergunakan SIT saat ini dimana terdapat rujukan";
    // contenttable += "            prosedur";
    // contenttable +=
    //   "            sudah tidak berlaku lagi, ruang lingkup prosedur belum memasukkan aspek SME,";
    // contenttable += "            SMK3,";
    // contenttable += "            dan";
    // contenttable +=
    //   "            SML yang sudah diterapkan Inalum dan Instruksi Kerja yang berlaku ada yang";
    // contenttable += "            tidak";
    // contenttable += "            relevan";
    // contenttable += "            lagi dengan implementasinya saat ini.";
    // contenttable += "            <br><br>";
    // contenttable += "            Contoh :<br>";
    // contenttable +=
    //   "            Prosedur Pengelolaan Operasional Tehnologi Infrastruktur No.";
    // contenttable += "            SIT-PM04515-004/0";
    // contenttable +=
    //   "            terdapat rujukan no SK-004/DIR/2018 yang sudah dicabut dengan terbitnya SK";
    // contenttable += "            yang";
    // contenttable += "            baru";
    // contenttable +=
    //   "            yaitu SK=015/DIRPEL/2020 tentang Bagan Struktur Organsisasi dan Penugasan";
    // contenttable += "            Kerja";
    // contenttable += "            yang";
    // contenttable +=
    //   "            terbit pada Juli 2020. Dan belum memasukkan aspek SM3, SMK3 dan SMK.";
    // contenttable += "            <br><br>";
    // contenttable +=
    //   "            Instruksi Kerja No ST-WI09-006 bahwa pelaksanaan pemeliharaan perawatan";
    // contenttable +=
    //   "            perangkat komputer dilakukan akan tetapi implementasinya saat ini tidak ada";
    // contenttable += "            lagi";
    // contenttable +=
    //   "            perawatan perangkat tersebut karena penyediaan perangkat computer sudah";
    // contenttable += "            dilakukan pihak ke tiga";
    // contenttable += "        </p>";
    contenttable += "    </td>";
    contenttable +=
        '    <td class="text3 borderblack" width="54"><a>' + jenis + "</a></td>";
    contenttable +=
        '    <td class="text3 borderblack" width="70">' + element + "</td>";
    contenttable +=
        '    <td class="text3 borderblack" width="60">' + status + "</td>";
    contenttable += "</tr>";

    $("#data" + dataindex).append(contenttable);
}

function getPDF() {
    // $(".PrintButton").attr("disabled", "disabled");
    $("#loading-overlay").fadeIn(10);

    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 0;
    var PDF_Width = 791;
    var PDF_Height = 1120;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    console.log(totalPDFPages);

    html2canvas($(".canvas_div_pdf")[0], {
        allowTaint: true,
        scale: 3,
        width: 794,
        height: 1120 * (totalPDFPages + 1),
    }).then(function(canvas) {
        canvas.getContext("2d");

        console.log(canvas.height + "  " + canvas.width);

        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF("p", "pt", "a4");
        // pdf.internal.scaleFactor = 100;
        pdf.addImage(imgData, "JPG", 0, 0, 595, 843.2 * (totalPDFPages + 1));
        var minormargin = 0.5;
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage();
            pdf.addImage(
                imgData,
                "JPG",
                0, -(840.2 * i) + minormargin,
                595,
                843.2 * (totalPDFPages + 1)
            );
            minormargin = minormargin + 1;
        }

        pdf.save("HTML-Document.pdf");
        $("#loading-overlay").fadeOut(10);

        $("#PrintPreview").hide();
    });
}

// function getPDF() {
//   var HTML_Width = $(".canvas_div_pdf").width();
//   var HTML_Height = $(".canvas_div_pdf").height();
//   var top_left_margin = 0;
//   var PDF_Width = 791;
//   var PDF_Height = 1120;
//   var canvas_image_width = HTML_Width;
//   var canvas_image_height = HTML_Height;

//   var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

//   console.log(totalPDFPages);

//   html2canvas($(".canvas_div_pdf")[0], { allowTaint: true }).then(function (
//     canvas
//   ) {
//     canvas.getContext("2d");

//     console.log(canvas.height + "  " + canvas.width);

//     var imgData = canvas.toDataURL("image/jpeg", 1.0);
//     var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
//     pdf.addImage(
//       imgData,
//       "JPG",
//       top_left_margin,
//       top_left_margin,
//       canvas_image_width,
//       canvas_image_height
//     );

//     for (var i = 1; i <= totalPDFPages; i++) {
//       pdf.addPage(PDF_Width, PDF_Height);
//       pdf.addImage(
//         imgData,
//         "JPG",
//         top_left_margin,
//         -(PDF_Height * i) + top_left_margin * 4,
//         canvas_image_width,
//         canvas_image_height
//       );
//     }

//     pdf.save("HTML-Document.pdf");
//   });
// }

function getPDF2() {
    // let pdf = new jsPDF("p", "pt", "a4");
    // pdf.html(document.getElementById("PrintCARPDF"), {
    //   callback: function () {
    //     //pdf.save('test.pdf');
    //     window.open(pdf.output("bloburl")); // to debug
    //   },
    // });

    var pdf = new jsPDF("p", "in", "a4");
    pdf.internal.scaleFactor = 30;
    pdf.addHTML($("#PrintCARPDF")[0], function() {
        pdf.save("HTML-Document.pdf");
    });
}