$(".deleteAttachment").on("click", function () {
    // const name = $(this).data("nama");
    const id = $(this).data("id");
    // console.log(name);
    // console.log(id);

    Swal.fire({
        title: "Hapus Attachment?",
        text: "Data yang sudah dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: BASE + "lai/deleteattachment",
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