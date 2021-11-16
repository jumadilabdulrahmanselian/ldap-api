$("#kt_datatable1 tbody").on("click", ".tombolEdit", function () {
  const id = $(this).data("id");
  const jenis = $(this).data("jenis");

  button_action({
    label: "Ubah Data File",
    btnLabel: "Ubah Data",
    type: "Edit",
    url: jenis + "/edit",
    modal: "modalEdit",
    form: "form_edit",
  });

  $.ajax({
    url: BASE + jenis + "/getedit",
    data: { id: id },
    method: "post",
    success: function (data) {
      var files = JSON.parse(data);
      console.log(files);
      var stringSeksi = files.data[0].SEKSI;
      var seksi = stringSeksi.split(", ");
      console.log(seksi);
      $("#idFilesEdit").val(files.data[0].ID_FILES_T);
      $("#nmFilesEdit").val(files.data[0].NM_FILES_T);
      $("#noFilesEdit").val(files.data[0].NO_FILES_T);
      $("#idSeksiEdit").val(seksi);
      $("#seksiEdit").val(seksi);

      $("#unggahanFileEdit").attr("href", BASE + files.data[0].FILE_T);
      if (files.data[0].FILE_T !== "" && files.data[0].FILE_T !== null) {
        $("#igpFileEdit").show();
        $("#checkFileEdit").show();
        $("#isFileEdit").val("1");
      } else {
        $("#igpFileEdit").hide();
        $("#checkFileEdit").hide();
        $("#isFileEdit").val("0");
      }

      $('.selectpicker').selectpicker('refresh');
    },
  });
});

$(".pilihSeksi").on("change", function () {
  var nextName = $(this).val();
  console.log(nextName);
  var join = nextName.join(", ");
  console.log(join);
  $(".stringSeksi").val(join);
});

// $('.tombolTambah').on('click', function () {
//     $('#passwordDiv').show();
// });

// Class definition
var KTFormControls = (function () {
  // Private functions
  var _handleTambah = function () {
    var validation;

    if (isSelectorExist('#form_tambah')) {
      validation = FormValidation.formValidation(
        document.getElementById("form_tambah"),
        {
          fields: {
            noFiles: {
              validators: {
                notEmpty: {
                  message: "Nomor harus diisi",
                },
              },
            },

            nmFiles: {
              validators: {
                notEmpty: {
                  message: "Judul harus diisi",
                },
              },
            },

            // seksi: {
            //   validators: {
            //     notEmpty: {
            //       message: "Seksi harus dipilih",
            //     },
            //   },
            // },

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

      $("#submit").on("click", function (e) {
        e.preventDefault();
        const jenis = $(this).data("jenis");
        //   console.log("add");

        var _input = new FormData(document.getElementById("form_tambah"));

        $(this).addClass("spinner spinner-white spinner-right disabled");

        validation.validate().then(function (status) {
          //   console.log(status);

          if (status == "Valid") {
            $.ajax({
              url: jenis + "/add",
              method: "POST",
              data: _input,
              contentType: false,
              cache: false,
              processData: false,
              success: function (response) {
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
                    .then(function (result) {
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
                    .then(function () { });
                }
              },
              error: function (e) {
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
  var _handleEdit = function () {
    var validation;

    if (isSelectorExist('#form_edit')) {
      validation = FormValidation.formValidation(
        document.getElementById("form_edit"),
        {
          fields: {
            noFiles: {
              validators: {
                notEmpty: {
                  message: "Nomor harus diisi",
                },
              },
            },

            nmFiles: {
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

      $("#submitEdit").on("click", function (e) {
        e.preventDefault();
        const jenis = $(this).data("jenis");
        // console.log("edit");

        var _input = new FormData(document.getElementById("form_edit"));

        $(this).addClass("spinner spinner-white spinner-right disabled");

        validation.validate().then(function (status) {
          //   console.log(status);

          if (status == "Valid") {
            $.ajax({
              url: jenis + "/edit",
              method: "POST",
              data: _input,
              contentType: false,
              cache: false,
              processData: false,
              success: function (response) {
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
                    .then(function (result) {
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
                    .then(function () { });
                }
              },
              error: function (e) {
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
    init: function () {
      _handleTambah();
      _handleEdit();
    },
  };
})();

jQuery(document).ready(function () {
  KTFormControls.init();
});
