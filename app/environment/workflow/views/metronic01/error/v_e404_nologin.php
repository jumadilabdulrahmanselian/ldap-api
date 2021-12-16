<!DOCTYPE html>
<html lang="en">
<!--begin::Head-->

<head>
    <base href="/">
    <meta charset="utf-8" />
    <title><?= getLangKey('title_e404') ?></title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!--begin::Fonts-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <!--end::Fonts-->

    <!--begin::Page Custom Styles(used by this page)-->
    <link href="<?= assetsUri() ?>css/pages/error/error-6.css" rel="stylesheet" type="text/css" />
    <!--end::Page Custom Styles-->

    <!--begin::Global Theme Styles(used by all pages)-->
    <link href="<?= assetsUri() ?>plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
    <link href="<?= assetsUri() ?>plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css" />
    <link href="<?= assetsUri() ?>css/style.bundle.css" rel="stylesheet" type="text/css" />
    <!--end::Global Theme Styles-->

    <!--begin::Layout Themes(used by all pages)-->

    <link href="<?= assetsUri() ?>css/themes/layout/header/base/light.css" rel="stylesheet" type="text/css" />
    <link href="<?= assetsUri() ?>css/themes/layout/header/menu/light.css" rel="stylesheet" type="text/css" />
    <link href="<?= assetsUri() ?>css/themes/layout/brand/dark.css" rel="stylesheet" type="text/css" />
    <link href="<?= assetsUri() ?>css/themes/layout/aside/dark.css" rel="stylesheet" type="text/css" />
    <!--end::Layout Themes-->

    <link rel="shortcut icon" href="<?= assetsUri() ?>media/logos/favicon.ico" />

</head>
<!--end::Head-->

<!--begin::Body-->

<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">

    <!--begin::Main-->
    <div class="d-flex flex-column flex-root">
        <!--begin::Error-->
        <div class="error error-6 d-flex flex-row-fluid bgi-size-cover bgi-position-center" style="background-image: url(<?= assetsUri() ?>media/error/bg6.jpg);">
            <!--begin::Content-->
            <div class="d-flex flex-column flex-row-fluid text-center">
                <h1 class="error-title font-weight-boldest text-white mb-12" style="margin-top: 12rem;"><?= getLangKey('oops_e404') ?></h1>
                <p class="display-4 font-weight-bold text-white">
                    <?= getLangKey('desc_e404') ?>
                </p>
            </div>
            <!--end::Content-->
        </div>
        <!--end::Error-->
    </div>
    <!--end::Main-->

</body>
<!--end::Body-->

</html>