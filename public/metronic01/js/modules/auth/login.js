"use strict";

// Class Definition
var KTLogin = function () {
	var _login;
    BASE = BASE + 'admin/';

	var _showForm = function (form) {
		var cls = 'login-' + form + '-on';
		var form = 'kt_login_' + form + '_form';

		_login.removeClass('login-signin-on');

		_login.addClass(cls);

		KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
	}

	var _handleSignInForm = function () {
		var validation;

        if(isSelectorExist('#kt_login_signin_form')){
            // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
            validation = FormValidation.formValidation(
                KTUtil.getById('kt_login_signin_form'),
                {
                    fields: {
                        username: {
                            validators: {
                                notEmpty: {
                                    message: _x
                                }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: _y
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                        bootstrap: new FormValidation.plugins.Bootstrap()
                    }
                }
            );

            // const onClickButton = document.getElementById("kt_login_signin_submit");
            // const formLogin = document.getElementById("kt_login_signin_form");

            // onClickButton.addEventListener("click", function (e) {
            //     e.preventDefault();

            //     var _input = new FormData(formLogin);
            $('#kt_login_signin_submit').on('click', function (e) {
                e.preventDefault();
    
                var _input = $('#kt_login_signin_form').serialize();

                validation.validate().then(function (status) {
                    // console.log(_input)
                    // console.log(BASE)
                    if (status == 'Valid') {
                        $.ajax({
                            url: BASE + "auth/authorize",
                            method: "POST",
                            data: _input,
                            success: function (response) {
                                // console.log(response)
                                if(isJson(response)) {
                                    var res = JSON.parse(response);
                                    if (res.status) {
                                        swal.fire({
                                            text: res.text,
                                            icon: "success",
                                            showConfirmButton: false,
                                            timer: 1500,
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, Ayo Masuk!",
                                            customClass: {
                                                confirmButton: "btn font-weight-bold btn-light-primary"
                                            }
                                        }).then(function (result) {
                                            if (result.isConfirmed) {
                                                window.location = BASE + 'dashboard';
                                            }
                                            KTUtil.scrollTop();
                                        });
                                    } else {
                                        swal.fire({
                                            text: _noauth,
                                            icon: "error",
                                            showConfirmButton: false,
                                            timer: 1500,
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, Coba Lagi!",
                                            customClass: {
                                                confirmButton: "btn font-weight-bold btn-light-primary"
                                            }
                                        }).then(function () {
                                            KTUtil.scrollTop();
                                        });
                                    }
                                }else{
                                    swal.fire({
                                        text: _nojson,
                                        icon: "error",
                                        showConfirmButton: false,
                                        timer: 1500,
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, Coba Lagi!",
                                        customClass: {
                                            confirmButton: "btn font-weight-bold btn-light-primary"
                                        }
                                    }).then(function () {
                                        KTUtil.scrollTop();
                                    });
                                }
                            },
                            error: function (e) {
                                console.log(e);
                            }
                        });
                    }
                    else {
                        swal.fire({
                            text: _empty,
                            icon: "error",
                            buttonsStyling: false,
                            showConfirmButton: false,
                            timer: 1500,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light-primary"
                            }
                        }).then(function () {
                            KTUtil.scrollTop();
                        });
                    }
                });
            });
        }
	}

	// Public Functions
	return {
		// public functions
		init: function () {
			_login = $('#kt_login');

			_handleSignInForm();
		}
	};
}();

// Class Initialization
jQuery(document).ready(function () {
	KTLogin.init();
});
