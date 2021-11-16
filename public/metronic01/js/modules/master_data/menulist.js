$("#kt_datatable1 tbody").on("click", ".tombolEdit", function () {
  const id = $(this).data("id");

  button_action({
    label: "Ubah Data Menu",
    btnLabel: "Ubah Data",
    type: "Edit",
    url: "menulist/edit",
    modal: "modalEdit",
    form: "form_edit",
  });

  $.ajax({
    url: BASE + "menulist/getedit",
    data: { id: id },
    method: "post",
    success: function (data) {
      var menulist = JSON.parse(data);
      // var status;
      // if (menulist.data[0].status === 'A') {
      //   status = '1';
      // } else if (menulist.data[0].status === 'N') {
      //   status = '2';
      // }
      console.log(menulist);
      $("#idMenu").val(menulist.data[0].ID_MENU);
      $("#nmMenuEdit").val(menulist.data[0].NM_MENU);
      $("#iconMenuEdit").val(menulist.data[0].ICON_MENU);
      $("#linkMenuEdit").val(menulist.data[0].LINK_MENU);
      $("#parentMenuEdit").val(menulist.data[0].ID_PARENT);
      $("#levelMenuEdit").val(menulist.data[0].LEVEL);
      console.log('level: ' + menulist.data[0].LEVEL);
      $("#statusMenuEdit").val(menulist.data[0].STATUS);
      console.log('status: ' + menulist.data[0].STATUS);
      // $("#urutMenuEdit").val(menulist.data[0].NO_MENU);

      $('.selectpicker').selectpicker('refresh');
    },
  });
});

$('#parentMenu').on('change', function () {
  var selected = $(this).find('option:selected');
  var childLevel = selected.data('level')
  var num = Number(childLevel) + 1;
  $("#levelMenu").val(num);
  console.log('level: ' + num);

  // $('.selectpicker').selectpicker('refresh');
})

$('#parentMenuEdit').on('change', function () {
  var selected = $(this).find('option:selected');
  var childLevel = selected.data('level');
  var num = Number(childLevel) + 1;
  $("#levelMenuEdit").val(num);
  console.log('level: ' + num);

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
          nmMenu: {
            validators: {
              notEmpty: {
                message: "Nomor harus diisi",
              },
            },
          },

          statusMenu: {
            validators: {
              notEmpty: {
                message: "Judul harus diisi",
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
            url: "menulist/add",
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
          nmMenuEdit: {
            validators: {
              notEmpty: {
                message: "Nama Menu harus diisi",
              },
            },
          },

          statusMenuEdit: {
            validators: {
              notEmpty: {
                message: "Status harus dipilih",
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
            url: "menulist/edit",
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
