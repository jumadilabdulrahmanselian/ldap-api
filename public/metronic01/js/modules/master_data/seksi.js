$('#kt_datatable1 tbody').on('click', '.tombolEdit', function () {
    // $('#passwordDiv').hide();
    button_action({
        label: 'Ubah Data Seksi',
        btnLabel: 'Ubah Data',
        type: 'Edit',
        url: 'seksi/edit'
    });

    const id = $(this).data('id');

    $.ajax({
        url: BASE + 'seksi/getedit',
        data: { id: id },
        method: 'post',
        success: function (data) {
            var user = JSON.parse(data);
            console.log(user);
            $('#idSeksi').val(user.data[0].ID_SEKSI);
            $('#namaSeksi').val(user.data[0].NM_SEKSI);
            $('#alias').val(user.data[0].ALIAS_SEKSI);
        }
    });
});

// $('.tombolTambah').on('click', function () {
//     $('#passwordDiv').show();
// });

