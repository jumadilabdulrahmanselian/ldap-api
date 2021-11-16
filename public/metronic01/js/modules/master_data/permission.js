'use strict'

var InalumRole = function(){
    var id_table = '#table_user';
    var controller = 'permission';

    var _initSearcher = function (){
        var select = $('#fieldFilter select');
        var search = $('#fieldFilter input');

        select.hide();

        if(select.css('display') == 'none'){
            search.removeAttr('style');
            search.removeClass('w-50');
            search.addClass('w-100');
        }

        search.on('keyup', function(e){
            e.preventDefault();
            var value = $(this).val().toLowerCase();
            
            $(".namaRole").filter(function() {
                // console.log(this)
                $(this).parents('.searchRole').addClass('d-none');
                // $(this).parent('.searchRole').addClass('d-none');
                if($(this).text().toLowerCase().indexOf(value) > -1){
                    $(this).parents('.searchRole').removeClass('d-none');
                }
                // $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }

    var _subString = function(string){
        return string.replace('#', '');
    }

    var _handleTambah = function () {
		var validation;

        if(isSelectorExist('#form_tambah')){

            const form = KTUtil.getById('form_tambah');

            // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
            validation = FormValidation.formValidation(
                form,
                {
                    fields: {
                        nama: {
                            validators: {
                                notEmpty: {
                                    message: 'Nama Role Harus Diisi'
                                }
                            }
                        }
                        // ,status: {
                        //     validators: {
                        //         notEmpty: {
                        //             message: 'Switch Status Ke Enable atau Disable'
                        //         }
                        //     }
                        // }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                        bootstrap: new FormValidation.plugins.Bootstrap(),
                    }
                }
            );

            $('#submit').on('click', function (e) {
                e.preventDefault();

                var _input = $('#form_tambah').serialize();

                $(this).addClass('spinner spinner-white spinner-right disabled');

                validation.validate().then(function (status) {
                    // console.log(_input)
                    if (status == 'Valid') {
                        $.ajax({
                            url: BASE + controller+"/add",
                            method: "POST",
                            data: _input,
                            success: function (response) {
                                // console.log(response)
                                $('#submit').removeClass('spinner spinner-white spinner-right disabled');
                                var res = JSON.parse(response);
                                console.log(res)
                                if (res.status) {
                                    swal.fire({
                                        text: res.msg,
                                        icon: "success",
                                        timer: 3000,
                                        showCancelButton: false,
                                        showConfirmButton: false
                                    }).then(function (result) {
                                        if (result.isDismissed) {
                                            window.location.reload();
                                        }
                                    });
                                } else {
                                    swal.fire({
                                        text: res.msg,
                                        icon: "error",
                                        timer: 3000,
                                        showCancelButton: false,
                                        showConfirmButton: false
                                    }).then(function () {
                                        
                                    });
                                }
                            },
                            error: function (e) {
                                // console.log(e);
                                $('#submit').removeClass('spinner spinner-white spinner-right disabled');
                            }
                        });
                    } else {
                        $('#submit').removeClass('spinner spinner-white spinner-right disabled');
                    }
                });
            });
        }
	}

    var _handleDelete = function(id, nm){
        swal.fire({
            text: "Apakah anda ingin menghapus "+controller+" "+nm+"?",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batal"
        }).then(function (result) {
            if (result.isConfirmed) {
                $.ajax({
                    url: BASE + controller + "/delete",
                    method: "POST",
                    data: {id:id},
                    success: function (response) {
                        var res = JSON.parse(response);
                        if (res.status) {
                            swal.fire({
                                text: res.msg,
                                icon: "success",
                                timer: 3000,
                                showCancelButton: false,
                                showConfirmButton: false
                            }).then(function (result) {
                                if (result.isDismissed) {
                                    // window.location.reload();
                                    var locate = BASE + controller;
										window.location.href = locate;
                                }
                            });
                        } else {
                            swal.fire({
                                text: res.msg,
                                icon: "error",
                                timer: 3000,
                                showCancelButton: false,
                                showConfirmButton: false
                            }).then(function () {
                                
                            });
                        }
                    },
                    error: function (e) {
                    }
                });
            }
        });
        
    }

    var _handleClose = function(){
        // Handle forgot button
		$('.tutup').on('click', function (e) {
			e.preventDefault();
            swal.fire({
                text: "Data yang sudah diisi akan hilang, Apakah Anda yakin ingin menutup modal?",
                icon: "warning",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "Tutup",
                cancelButtonText: "Batal",
                customClass: {
                    // confirmButton: "btn font-weight-bold btn-light-primary"
                }
            }).then(function (result) {
                // console.log(result)
                if (result.isConfirmed) {
                    $('.modal').modal('hide');
                }
            });
		});
    }

    var _handleEdit = function (){
        $('.editRole').on('click', function(e) {
            e.preventDefault();
            var role = $(this).data('role');
            // console.log(role)

            $('#editFormPlace').html('Loading....');
            // $('#role_edit').val(role.id_role);
            
            $.ajax({
                url: BASE + controller + "/get_edit",
                    method: "POST",
                    data: {id:role.id_role},
                    success: function (response) {
                        $('#editFormPlace').html(response);
                        $('#role_edit').val(role.id_role);
                        $('#role_edit_select').val(role.id_role);
                        $('#role_edit_select').html(role.nm_role);
                    },
                    error: function (e) {
                    }
            })
        });
    }

    var _handleDeleteNotTable = function (){
        $('.deleteRole').on('click', function(e) {
            e.preventDefault();
            var role = $(this).data('role');
            // console.log(role)
            _handleDelete(role.id_role, role.nm_role);
        });
    }

    var _handleShowList = function () {
        $('.hideListing').on('mouseover', function(e) {
            $(this).addClass('d-none');
            $(this).parent().children('.listing').removeClass('d-none');
        });

        $('.listing').on('mouseleave', function(e) {
            $(this).parent().children('.hideListing').removeClass('d-none');
            $(this).parent().children('.listing').addClass('d-none');
        });
    }

    var _handleSwitchSelect = function(){
        $('.switchSelect').on('click', function() {
            var id = $(this).val();
            var index = $(this).data('index');
            var parent0 = $(this).data('parent0');
            var parent1 = $(this).data('parent1');
            var parent2 = $(this).data('parent2');
            var parent3 = $(this).data('parent3');
            var parent4 = $(this).data('parent4');
    
            if ($(this).parent().parent().find('label input:checked').length === 1) {
                if (parent2 !== '' || parent3 !== '' || parent4 !== '') {
                    // console.log($(this).parent().parent().children(':first-child').children().prop('checked', this.checked))
                    $(this).parent().parent().children(':first-child').children().prop('checked', this.checked);
    
                    // if ($(this).parent().parent().find('label input:checked').length > 1) {
                    $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1=""][data-parent2=""][data-parent3=""][data-parent4=""]').parent().parent().children(':first-child').children().prop('checked', this.checked);
                    // }
    
                    $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1="' + parent1 + '"][data-parent2=""][data-parent3=""][data-parent4=""]').parent().parent().children(':first-child').children().prop('checked', this.checked);
                    $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1="' + parent1 + '"][data-parent2="' + parent2 + '"][data-parent3=""][data-parent4=""]').parent().parent().children(':first-child').children().prop('checked', this.checked);
                }
            }
    
            // console.log($('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1=""][data-parent2=""][data-parent3=""][data-parent4=""]'))
            if (parent0 !== '' && parent1 !== '' && parent2 !== '' && parent3 !== '' && parent4 !== '') {
                $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1=""][data-parent2=""][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
                $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1="' + parent1 + '"][data-parent2=""][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
                $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1="' + parent1 + '"][data-parent2="' + parent2 + '"][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
                $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1="' + parent1 + '"][data-parent2="' + parent2 + '"][data-parent3="' + parent3 + '"][data-parent4=""]').prop('checked', this.checked);
            } else if (parent0 !== '' && parent1 !== '' && parent2 !== '' && parent3 !== '' && parent4 === '') {
                // $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1=""][data-parent2=""][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
                // $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1="' + parent1 + '"][data-parent2=""][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
                // $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1="' + parent1 + '"][data-parent2="' + parent2 + '"][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
            } else if (parent0 !== '' && parent1 !== '' && parent2 !== '' && parent3 === '' && parent4 === '') {
                // console.log('asdasd')
                // $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1=""][data-parent2=""][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
                // $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1="' + parent1 + '"][data-parent2=""][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
            } else if (parent0 !== '' && parent1 !== '' && parent2 === '' && parent3 === '' && parent4 === '') {
                $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1=""][data-parent2=""][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
            } else if (parent0 !== '' && parent1 === '' && parent2 === '' && parent3 === '' && parent4 === '') {
                $('input[value="' + id + '"][data-parent0="' + parent0 + '"][data-parent1=""][data-parent2=""][data-parent3=""][data-parent4=""]').prop('checked', this.checked);
            } else {}
    
            // console.log($('.RD:checked').length)
    
        });
    
        $("#checkAll").click(function() {
            $('#form_tambah input:checkbox').not(this).prop('checked', this.checked);
        });
    
        $("#checkAllEdit").click(function() {
            $('#form_edit input:checkbox').not(this).prop('checked', this.checked);
        });
    }

    return {
		// public functions
		init: function() {
            _initSearcher();
            _handleShowList();
            _handleSwitchSelect();
            _handleEdit();
            _handleTambah();
            _handleDeleteNotTable();
            _handleClose();
		}
	};
}();

jQuery(document).ready(function() {
	InalumRole.init();
});
