$("#kt_datatable1 tbody").on("click", ".tombolEdit", function () {
  const id = $(this).data("id");

  button_action({
    label: "Ubah Data Menu",
    btnLabel: "Ubah Data",
    type: "Edit",
    url: "menu_action/edit",
    modal: "modalEdit",
    form: "form_edit",
  });

  $.ajax({
    url: BASE + "menu_action/getedit",
    data: { id: id },
    method: "post",
    success: function (data) {
      var menu_action = JSON.parse(data);
      console.log(menu_action);
      $("#idAction").val(menu_action.data[0].ID_ACTION);
      $("#nmActionEdit").val(menu_action.data[0].NM_ACTION);
      $("#kodeEdit").val(menu_action.data[0].KODE);
      $("#deskripsiEdit").val(menu_action.data[0].DESKRIPSI);

      // $('.selectpicker').selectpicker('refresh');
    },
  });
});

// $('.tombolTambah').on('click', function () {
//     $('#passwordDiv').show();
// });

// Class definition
var KTFormControls = (function () {
  // Private functions
  var _handleTambah = function () {
    var validation;

    if(isSelectorExist('#form_tambah')){
      validation = FormValidation.formValidation(
        document.getElementById("form_tambah"),
        {
          fields: {
            nmAction: {
              validators: {
                notEmpty: {
                  message: "Nama Action harus diisi",
                },
              },
            },

            kode: {
              validators: {
                notEmpty: {
                  message: "Kode Action harus diisi",
                },
              },
            },

            deskripsi: {
              validators: {
                notEmpty: {
                  message: "Deskripsi Action harus diisi",
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
        //   console.log("add");

        var _input = new FormData(document.getElementById("form_tambah"));

        $(this).addClass("spinner spinner-white spinner-right disabled");

        validation.validate().then(function (status) {
          //   console.log(status);

          if (status == "Valid") {
            $.ajax({
              url: "menu_action/add",
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

    if(isSelectorExist('#form_edit')){
      validation = FormValidation.formValidation(
        document.getElementById("form_edit"),
        {
          fields: {
            nmActionEdit: {
              validators: {
                notEmpty: {
                  message: "Nama Action harus diisi",
                },
              },
            },

            kodeEdit: {
              validators: {
                notEmpty: {
                  message: "Kode Action harus diisi",
                },
              },
            },

            deskripsiEdit: {
              validators: {
                notEmpty: {
                  message: "Deskripsi Action harus diisi",
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
        // console.log("edit");

        var _input = new FormData(document.getElementById("form_edit"));

        $(this).addClass("spinner spinner-white spinner-right disabled");

        validation.validate().then(function (status) {
          //   console.log(status);

          if (status == "Valid") {
            $.ajax({
              url: "menu_action/edit",
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
