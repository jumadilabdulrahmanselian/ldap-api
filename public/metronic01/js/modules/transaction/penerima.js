$("#kt_datatable1 tbody").on("click", ".tombolDetail", function () {
    // console.log('tombolDetail clicked');
    id = $(this).data('id');
    jenis = $(this).data('jenis');
    $.ajax({
        url: BASE + jenis + "/get_penerima",
        data: { id: id },
        method: 'post',
        success: function (response) {
            data = JSON.parse(response);
            penerima = data.data[0];
            if (data.status) {
                $('#judul').html(penerima.NM_FILES);
                $('#salinan').html(penerima.NO_SALINAN);
                $('#nama').html(penerima.NAMA);
                $('#namecode').html(penerima.NAMECODE);
                $('#seksi').html(penerima.ALIAS_SEKSI + ' - ' + penerima.NM_SEKSI);
                $('#downloadby').html(penerima.NM_USER);
                $('#keperluan').html(penerima.KEPERLUAN);

            }
        }
    })
})