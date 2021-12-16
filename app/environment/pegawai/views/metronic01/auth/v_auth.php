<!--begin::Main-->
<div class="d-flex flex-column flex-root">
    <!--begin::Login-->
    <div class="login login-3 login-signin-on d-flex flex-row-fluid" id="kt_login">
        <div class="d-flex flex-center bgi-size-cover bgi-no-repeat flex-row-fluid" style="background-image: url(https://www.mbizmarket.co.id/news/wp-content/uploads/2019/08/iStock-1134579212.jpg);">
            <div class="card card-custom gutter-b" style="background-color: black; opacity: 0.75">
                <div class="card-body">
                    <div class="login-form text-center text-white p-7 position-relative overflow-hidden">
                        <!--begin::Login Header-->
                        <div class="d-flex flex-center mb-15">
                            <a href="<?= base_url(); ?>">
                                <img src="<?= assetsUri(); ?>media/logos/logo-inalum.png" class="max-h-80px" alt="" />
                            </a>
                        </div>
                        <!--end::Login Header-->

                        <!--begin::Login Sign in form-->
                        <div class="login-signin">
                            <div class="mb-10">
                                <h3><?= getLangKey('enter_system_auth'); ?></h3>
                                <p class="opacity-60 font-weight-bold"><?= getLangKey('desc_enter_system_auth'); ?></p>
                            </div>
                            <form class="form" id="kt_login_signin_form">
                                <div class="form-group">
                                    <input class="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8 mb-5" type="text" placeholder="<?= getLangKey('ph_email_auth'); ?>" name="username" autocomplete="off" />
                                </div>
                                <div class="form-group">
                                    <input class="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8 mb-5" type="password" placeholder="<?= getLangKey('ph_password_auth'); ?>" name="password" />
                                </div>
                                <!-- <div class="form-group d-flex flex-wrap justify-content-between align-items-center px-8">
                                    <div class="checkbox-inline">
                                        <label class="checkbox checkbox-outline checkbox-white text-white m-0">
                                            <input type="checkbox" name="remember"/>
                                            <span></span>
                                            Tetap Login?
                                        </label>
                                    </div>
                                    <a href="javascript:;" id="kt_login_forgot" class="text-white font-weight-bold">Lupa Password ?</a>
                                </div> -->
                                <div class="form-group text-center mt-10">
                                    <button id="kt_login_signin_submit" class="btn btn-pill btn-outline-white font-weight-bold opacity-90 px-15 py-3"><?= getLangKey('enter_btn_auth'); ?></button>
                                </div>
                            </form>
                        </div>
                        <!--end::Login Sign in form-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--end::Login-->
</div>
<!--end::Main-->
<!--begin::Page Scripts(used by this page)-->
<script src="<?= assetsUri(); ?>plugins/global/library.js"></script>
<script src="<?= assetsUri(); ?>js/modules/auth/login.js"></script>
<!--end::Page Scripts-->