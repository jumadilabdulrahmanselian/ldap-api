$("#kt_datatable1 tbody").on("click", ".tombolEdit", function () {
  const id = $(this).data("id");

  button_action({
    label: "Ubah Data Element",
    btnLabel: "Ubah Data",
    type: "Edit",
    url: "element/edit",
    modal: "modalEdit",
    form: "form_edit",
  });

  $.ajax({
    url: BASE + "element/getedit",
    data: { id: id },
    method: "post",
    success: function (data) {
      var element = JSON.parse(data);
      console.log(element);
      $("#id").val(element.data[0].ID_ELEMENT);
      $("#nmElementEdit").val(element.data[0].NM_ELEMENT);
      $("#nmElementDecoy").val(element.data[0].NM_ELEMENT);
      $("#tipeElementDecoy").val(element.data[0].TIPE_ELEMENT);
      $("#tipeElementEdit").val(element.data[0].TIPE_ELEMENT);
      $("#deskripsiEdit").html(element.data[0].DESKRIPSI_ELEMENT);

      $('.selectpicker').selectpicker('refresh');
    },
  });
});

$('#tipeElementDecoy').on('change', function () {
  var tipe = $(this).val();
  $("#tipeElementEdit").val(tipe);

  // $('.selectpicker').selectpicker('refresh');
})

// $('.tombolTambah').on('click', function () {
//     $('#passwordDiv').show();
// });

// Class definition
var KTFormControls = (function () {
  // Private functions
  var _handleTambah = function () {
    var validation;

    validation = FormValidation.formValidation(
      document.getElementById("form_tambah"),
      {
        fields: {
          tipeElement: {
            validators: {
              notEmpty: {
                message: "Tipe Element harus dipilih",
              },
            },
          },

          nmElement: {
            validators: {
              notEmpty: {
                message: "Klausul harus diisi",
              },
            },
          },

          deskripsi: {
            validators: {
              notEmpty: {
                message: "Deskripsi harus diisi",
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
            url: "element/add",
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
  };
  // Private functions
  var _handleEdit = function () {
    var validation;

    validation = FormValidation.formValidation(
      document.getElementById("form_edit"),
      {
        fields: {
          tipeElementEdit: {
            validators: {
              notEmpty: {
                message: "Tipe Element harus dipilih",
              },
            },
          },

          nmElementEdit: {
            validators: {
              notEmpty: {
                message: "Klausul harus diisi",
              },
            },
          },

          deskripsiEdit: {
            validators: {
              notEmpty: {
                message: "Deskripsi harus diisi",
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
      var klausul = $('#nmElementDecoy').val();
      $('#nmElementEdit').val(klausul);
      console.log($('#nmElementEdit').val());

      // console.log("edit");

      var _input = new FormData(document.getElementById("form_edit"));

      $(this).addClass("spinner spinner-white spinner-right disabled");

      validation.validate().then(function (status) {
        //   console.log(status);

        if (status == "Valid") {
          $.ajax({
            url: "element/edit",
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
