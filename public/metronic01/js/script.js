jQuery(document).ready(function () {
  var table1 = $("#kt_datatable1").DataTable({
    scrollY: "150vh",
    scrollX: false,
    scrollCollapse: true,
    // dom: "Bfrtip",
    // buttons: [{
    //     extend: "excel",
    //     text: "Export to Excel",
    // }, ],
  });

  $("#datatable_filter").on("keyup change clear", function () {
    if (table1.search() !== this.value) {
      table1.search(this.value, true, false).draw();
    }
  });

  $("#datatable_length").on("change", function () {
    table1.page.len($(this).val()).draw();
  });

  function ucwords(str) {
    return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }

  $("#kt_datatable1 tbody").on("click", ".delete", function () {
    const name = $(this).data("nama");
    const id = $(this).data("id");
    var menu = $(this).data("menu");
    if (typeof menu === "undefined") {
      menu = "";
    }
    console.log(menu);
    // console.log(id);

    Swal.fire({
      title:
        "Hapus Data " +
        (name == "car_tindak_lanjut" ? "OFI" : ucwords(name)) +
        "?",
      text: "Data yang sudah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          url: BASE + name + "/delete/" + menu,
          data: { id: id },
          method: "post",
          success: function (response) {
            var data = JSON.parse(response);

            if (data.status) {
              Swal.fire("Berhasil!", data.msg, "success").then(function () {
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
});

/**
 * SIMPAN FORM YANG TIDAK PAKAI UPLOAD
 */
function simpan(el) {
  var url = $(el).attr("data-url");
  console.log(url);

  $.ajax({
    url: url,
    data: $(el).serialize(),
    method: "POST",
    success: function (response) {
      var data = JSON.parse(response);
      console.log(data);

      if (data.status) {
        Swal.fire("Berhasil!", data.msg, "success").then(function () {
          window.location.reload();
        });
      } else {
        Swal.fire("Gagal!", data.msg, "error");
      }
    },
  });
}

/**
 * DYNAMIC BUTTON ACTION UNTUK MODAL
 * @param {*} settings
 */
function button_action(settings = null) {
  if (settings !== null && typeof settings === "object") {
    var label =
      typeof settings.label === "undefined" ? "Tambah Data" : settings.label;
    var url = typeof settings.url === "undefined" ? "add" : settings.url;
    var modal =
      typeof settings.modal === "undefined" ? "#modal" : "#" + settings.modal;
    var form =
      typeof settings.form === "undefined" ? "#formModal" : "#" + settings.form;
    var type = typeof settings.type === "undefined" ? "save" : settings.type;
    var btnLabel =
      typeof settings.btnLabel === "undefined" ? "Simpan" : settings.btnLabel;
    var fileLabel;
    if (typeof settings.fileLabel !== "undefined") {
      if (typeof settings.fileLabel === "object") {
        var arr = [];
        for (let index = 0; index < settings.fileLabel.length; index++) {
          arr.push(settings.fileLabel[index]);
        }
        fileLabel = arr;
      } else if (typeof settings.fileLabel === "string") {
        fileLabel = settings.fileLabel;
      }
    } else {
      fileLabel = "Pilih File";
    }
    console.log(label);

    $(modal + "Label").html(label);
    $(form).attr("data-url", BASE + url);
    $(".modal-footer button[data-type=submit]").html(btnLabel);
    $("#igp").hide();
    $("#check").hide();
    if (type === "save") {
      $(form + " input").val("");
      $(form + " textarea").val("");
      var selectLength = $(form).find("select").length;
      if (selectLength > 0) {
        for (let index = 0; index < selectLength; index++) {
          $(form + " select")[index].selectedIndex = -1;
        }

        if ($(form).find("select.selectpicker").length > 0) {
          $(".selectpicker").selectpicker("refresh");
        }
      }
    }

    var fileLength = $(form).find(".custom-file").length;
    if (fileLength > 0) {
      if (
        typeof fileLabel === "string" ||
        (typeof fileLabel === "object" && fileLabel.length === 1)
      ) {
        $(form + "label.custom-file-label").html(fileLabel);
      } else if (typeof fileLabel === "object" && fileLabel.length > 1) {
        for (let index = 0; index < fileLabel.length; index++) {
          $(form + "label.custom-file-label:eq(" + index + ")").html(
            fileLabel[index]
          );
        }
      }
    }
  }

  $(modal).modal("show");
}

/**
 * SIMPAN FORM YANG MEMILIKI UPLOAD
 */
function simpan_file(el) {
  var url = $("#" + el).attr("data-url");
  var data = new FormData(document.getElementById(el));

  $.ajax({
    url: url,
    data: data,
    method: "POST",
    contentType: false,
    cache: false,
    processData: false,
    success: function (response) {
      var data = JSON.parse(response);

      console.log(data);

      if (data.status) {
        Swal.fire("Berhasil!", data.msg, "success").then(function () {
          window.location.reload();
        });
      } else {
        Swal.fire("Gagal!", data.msg, "error");
      }
    },
  });
}

// Cek apakah data adalah JSON
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function convert_number(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function convert_persen(patokan, value) {
  return ((value / patokan) * 100).toFixed(2);
}
