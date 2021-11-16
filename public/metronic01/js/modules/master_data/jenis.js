$('#kt_datatable1 tbody').on('click', '.tombolEdit', function () {
    // $('#passwordDiv').hide();
    button_action({
        label: 'Ubah Data Jenis Dokumen',
        btnLabel: 'Ubah Data',
        type: 'Edit',
        url: 'jenis/edit'
    });

    const id = $(this).data('id');

    $.ajax({
        url: BASE + 'jenis/getedit',
        data: { id: id },
        method: 'post',
        success: function (data) {
            var user = JSON.parse(data);
            console.log(user);
            $('#idJenis').val(user.data[0].ID_JENIS);
            $('#namaJenis').val(user.data[0].NM_JENIS);
            $('#alias').val(user.data[0].ALIAS_JENIS);
            $('#sifat').val(user.data[0].SIFAT);

            $('.selectpicker').selectpicker('refresh');
        }
    });
});

// $('.tombolTambah').on('click', function () {
//     $('#passwordDiv').show();
// });

