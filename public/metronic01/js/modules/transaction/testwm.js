$("#kt_datatable1 tbody").on("click", ".tombolEdit", function () {
  button_action({
    label: "Download File Watermark",
    btnLabel: "Download",
    type: "Edit",
    url: "testwm/download",
  });
});

$("#kt_datatable1 tbody").on("click", ".downloadTestwm", function () {
  button_action({
    label: "Download File Watermark",
    btnLabel: "Download",
    type: "Edit",
    url: "testwm/download",
    modal: "modalDownload",
    form: "formModalDownload",
  });

  const id = $(this).data("id");

  // GET DATA FILE HERE TO DOWNLOAD
  $.ajax({
    url: BASE + "testwm/getdownload",
    data: { id: id },
    method: "post",
    success: function (data) {
      var file = JSON.parse(data);
      console.log(file);

      $("#idTestwmD").val(file.data[0].ID_TESTWM);
      $("#fileTestwmD").val(file.data[0].FILE);
      $("#downloadTestwmD").val(file.data[0].DOWNLOAD);
    },
  });
});
