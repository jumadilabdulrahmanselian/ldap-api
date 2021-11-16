const primary = "#6993FF";
const success = "#1BC5BD";
const info = "#8950FC";
const warning = "#FFA800";
const danger = "#F64E60";

var TOTAL_FP = 0;
var TOTAL_IM = 0;
var TOTAL_PM = 0;
var TOTAL_WI = 0;
var TOTAL_STANDAR = 0;
var TOTAL_SOP = 0;

var JENIS_INTERNAL_SERIES = [];
var JENIS_EKSTERNAL_SERIES = [];
var JENIS_LABELS = ["LTK (NC)", "Obs. (OFI)"];

var ELEMENT_INTERNAL_SERIES = [];
var ELEMENT_EKSTERNAL_SERIES = [];
var ELEMENT_LABELS = ["SMM", "SML", "SMEn", "SMK3"];

var tahun = 0;

var value_persen = 0;

var chart2;
var chart3;
var chart4;

var chart12;
var chart22;
var chart42;

$(document).ready(function() {
    console.log("Before :" + tahun);
    if (tahun == 0) {
        tahun = new Date().getFullYear();
    }
    console.log("After :" + tahun);
    // SECTION AUDIT DOKUMEN
    $.ajax({
        url: BASE + "dashboard/get_data_dokumen",
        // data: {
        //   tahun: tahun,
        // },
        method: "get",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data[0].TOTAL_FP);
                $("#total_fp").html(data.data[0].TOTAL_FP);
                $("#total_im").html(data.data[0].TOTAL_IM);
                $("#total_pm").html(data.data[0].TOTAL_PM);
                $("#total_wi").html(data.data[0].TOTAL_WI);
                $("#total_standar").html(data.data[0].TOTAL_STANDAR);
                $("#total_sop").html(data.data[0].TOTAL_SOP);
            }
        },
    });
    //SECTION AUDIT INTERNAL
    $.ajax({
        url: BASE + "dashboard/get_data_jadwal_internal",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log("total jadwal" + data.data[0].TOTAL_JADWAL);

                if (data.data[0].TOTAL_JADWAL == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_JADWAL,
                        data.data[0].TOTAL_JADWAL_TERLAKSANA
                    );
                }
                $("#jadwal_internal_bar").css("width", value_persen + "%");
                $("#persen_jadwal_internal").html(value_persen + " %");
                $("#total_jadwal_internal").html(data.data[0].TOTAL_JADWAL);
                $("#total_jadwal_internal_terlaksana").html(
                    data.data[0].TOTAL_JADWAL_TERLAKSANA
                );
            }
        },
    });
    $.ajax({
        url: BASE + "dashboard/get_data_lai",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data);

                if (data.data[0].TOTAL_LAI == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_LAI,
                        data.data[0].TOTAL_LAI_W_TL
                    );
                }

                $("#lai_bar").css("width", value_persen + "%");
                $("#persen_lai").html(value_persen + " %");
                $("#total_lai").html(data.data[0].TOTAL_LAI);
                $("#total_lai_ditindaklanjuti").html(data.data[0].TOTAL_LAI_W_TL);
            }
        },
    });

    var ChartAuditInternal1 = (function() {
        var categories;
        var BarChartByYearElement = function() {
            $.ajax({
                url: BASE + "dashboard/get_data_tahunan",
                method: "get",
                success: function(response) {
                    if (isJson(response)) {
                        categories = JSON.parse(response);
                        //   console.log(categories);
                    }
                },
            }).done(function() {
                $.ajax({
                    url: BASE + "dashboard/get_data_lai_temuan_tahunan",
                    method: "get",
                    success: function(response) {
                        // console.log(response);
                        if (isJson(response)) {
                            // console.log(response);
                            var res = JSON.parse(response);
                            // console.log(res);

                            //   var series = [];
                            //   var labels = [];
                            //   for (var i in res.series) {
                            //     series.push(parseInt(res.series[i]));
                            //     labels.push(res.labels[i]);
                            //   }
                            //   console.log(series);
                            //   console.log(labels);
                            const apexChart = "#chart_3";
                            var options = {
                                series: res,
                                chart: {
                                    toolbar: {
                                        show: false,
                                    },
                                    type: "bar",
                                    height: 350,
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        columnWidth: "55%",
                                        endingShape: "rounded",
                                    },
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                stroke: {
                                    show: true,
                                    width: 2,
                                    colors: ["transparent"],
                                },
                                xaxis: {
                                    categories: categories,
                                },
                                yaxis: {
                                    title: {
                                        text: "temuan",
                                    },
                                },
                                fill: {
                                    opacity: 1,
                                },
                                tooltip: {
                                    y: {
                                        formatter: function(val) {
                                            return val + " temuan";
                                        },
                                    },
                                },
                                colors: [primary, success, warning, info],
                            };

                            var chart1 = new ApexCharts(
                                document.querySelector(apexChart),
                                options
                            );
                            chart1.render();
                        } else {
                            console.log("failed");
                        }
                    },
                });
            });
        };

        var BarChartBySeksiElement = function() {
            var categories2;
            $.ajax({
                url: BASE + "dashboard/get_data_seksi",
                method: "get",
                success: function(response) {
                    if (isJson(response)) {
                        categories2 = JSON.parse(response);
                        //   console.log(categories);
                    }
                },
            }).done(function() {
                $.ajax({
                    url: BASE + "dashboard/get_data_lai_temuan_seksi",
                    data: {
                        tahun: tahun,
                    },
                    method: "post",
                    success: function(response) {
                        // console.log(response);
                        if (isJson(response)) {
                            // console.log(response);
                            var res = JSON.parse(response);
                            // console.log(res);

                            //   var series = [];
                            //   var labels = [];
                            //   for (var i in res.series) {
                            //     series.push(parseInt(res.series[i]));
                            //     labels.push(res.labels[i]);
                            //   }
                            //   console.log(series);
                            //   console.log(labels);
                            const apexChart = "#chart_4";
                            var options = {
                                series: res,
                                chart: {
                                    toolbar: {
                                        show: false,
                                    },
                                    type: "bar",
                                    height: 3500,
                                    stacked: true,
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: true,
                                    },
                                },
                                stroke: {
                                    width: 1,
                                    colors: ["#fff"],
                                },
                                title: {
                                    text: "Temuan per Seksi",
                                },
                                xaxis: {
                                    categories: categories2,
                                    labels: {
                                        formatter: function(val) {
                                            return val;
                                        },
                                    },
                                },
                                yaxis: {
                                    title: {
                                        text: undefined,
                                    },
                                },
                                tooltip: {
                                    y: {
                                        formatter: function(val) {
                                            return val + " temuan";
                                        },
                                    },
                                },
                                fill: {
                                    opacity: 1,
                                },
                                legend: {
                                    position: "top",
                                    horizontalAlign: "left",
                                    offsetX: 40,
                                },
                                colors: [primary, success, warning, info],
                            };

                            chart2 = new ApexCharts(
                                document.querySelector(apexChart),
                                options
                            );
                            chart2.render();
                        } else {
                            console.log("failed");
                        }
                    },
                });
            });
        };
        return {
            // public functions
            init: function() {
                BarChartByYearElement();
                BarChartBySeksiElement();
            },
        };
    })();
    ChartAuditInternal1.init();

    $.ajax({
        url: BASE + "dashboard/get_data_lai_data",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data);

                if (data.data[0].TOTAL_LAI_TEMUAN == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_LAI_TEMUAN,
                        data.data[0].TOTAL_LAI_TEMUAN_DIJAWAB
                    );
                }

                $("#lai_data_bar").css("width", value_persen + "%");
                $("#persen_lai_data").html(value_persen + " %");
                $("#total_lai_data").html(data.data[0].TOTAL_LAI_TEMUAN);
                $("#total_lai_data_dijawab").html(
                    data.data[0].TOTAL_LAI_TEMUAN_DIJAWAB
                );

                JENIS_INTERNAL_SERIES = [
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_LTK),
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_OBS),
                ];
                console.log(JENIS_INTERNAL_SERIES);

                ELEMENT_INTERNAL_SERIES = [
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_SMM),
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_SML),
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_SMEN),
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_SMK3),
                ];
                console.log(ELEMENT_INTERNAL_SERIES);
            }
        },
    }).done(function() {
        var ChartAuditInternal2 = (function() {
            var DonutChartByElement = function() {
                const apexChart = "#chart_11";
                var options = {
                    series: ELEMENT_INTERNAL_SERIES,
                    chart: {
                        width: 380,
                        type: "donut",
                    },
                    labels: ELEMENT_LABELS,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    }, ],
                    colors: [primary, success, warning, info],
                };

                chart3 = new ApexCharts(document.querySelector(apexChart), options);
                chart3.render();
            };

            var PieChartByJenis = function() {
                const apexChart = "#chart_12";
                var options = {
                    series: JENIS_INTERNAL_SERIES,
                    chart: {
                        width: 380,
                        type: "pie",
                    },
                    labels: JENIS_LABELS,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    }, ],
                    colors: [danger, warning],
                };

                chart4 = new ApexCharts(document.querySelector(apexChart), options);
                chart4.render();
            };
            return {
                // public functions
                init: function() {
                    DonutChartByElement();
                    PieChartByJenis();
                },
            };
        })();

        ChartAuditInternal2.init();
    });

    $.ajax({
        url: BASE + "dashboard/get_data_jadwal_eksternal",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data);

                if (data.data[0].TOTAL_JADWAL == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_JADWAL,
                        data.data[0].TOTAL_JADWAL_TERLAKSANA
                    );
                }

                $("#jadwal_eksternal_bar").css("width", value_persen + "%");
                $("#persen_jadwal_eksternal").html(value_persen + " %");
                $("#total_jadwal_eksternal").html(data.data[0].TOTAL_JADWAL);
                $("#total_jadwal_eksternal_terlaksana").html(
                    data.data[0].TOTAL_JADWAL_TERLAKSANA
                );
            }
        },
    });

    $.ajax({
        url: BASE + "dashboard/get_data_car",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data);

                if (data.data[0].TOTAL_CAR_NC == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_CAR_NC,
                        data.data[0].TOTAL_CAR_NC_W_TL
                    );
                }

                $("#nc_bar").css("width", value_persen + "%");
                $("#persen_nc").html(value_persen + " %");
                $("#total_nc").html(data.data[0].TOTAL_CAR_NC);
                $("#total_nc_ditindaklanjuti").html(data.data[0].TOTAL_CAR_NC_W_TL);

                if (data.data[0].TOTAL_CAR_OFI == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_CAR_OFI,
                        data.data[0].TOTAL_CAR_OFI_W_TL
                    );
                }

                $("#ofi_bar").css("width", value_persen + "%");
                $("#persen_ofi").html(value_persen + " %");
                $("#total_ofi").html(data.data[0].TOTAL_CAR_OFI);
                $("#total_ofi_ditindaklanjuti").html(data.data[0].TOTAL_CAR_OFI_W_TL);

                JENIS_EKSTERNAL_SERIES = [
                    parseInt(data.data[0].TOTAL_CAR_NC),
                    parseInt(data.data[0].TOTAL_CAR_OFI),
                ];
                console.log(JENIS_INTERNAL_SERIES);

                ELEMENT_EKSTERNAL_SERIES = [
                    parseInt(data.data[0].TOTAL_CAR_SMM),
                    parseInt(data.data[0].TOTAL_CAR_SML),
                    parseInt(data.data[0].TOTAL_CAR_SMEN),
                    parseInt(data.data[0].TOTAL_CAR_SMK3),
                ];
                console.log(ELEMENT_INTERNAL_SERIES);
            }
        },
    }).done(function() {
        var ChartAuditEksternal2 = (function() {
            var DonutChartByElement2 = function() {
                const apexChart = "#chart_112";
                var options = {
                    series: ELEMENT_EKSTERNAL_SERIES,
                    chart: {
                        width: 380,
                        type: "donut",
                    },
                    labels: ELEMENT_LABELS,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    }, ],
                    colors: [primary, success, warning, info],
                };

                chart12 = new ApexCharts(document.querySelector(apexChart), options);
                chart12.render();
            };

            var PieChartByJenis2 = function() {
                const apexChart = "#chart_122";
                var options = {
                    series: JENIS_EKSTERNAL_SERIES,
                    chart: {
                        width: 380,
                        type: "pie",
                    },
                    labels: JENIS_LABELS,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    }, ],
                    colors: [danger, warning],
                };

                chart22 = new ApexCharts(document.querySelector(apexChart), options);
                chart22.render();
            };
            return {
                // public functions
                init: function() {
                    DonutChartByElement2();
                    PieChartByJenis2();
                },
            };
        })();

        ChartAuditEksternal2.init();
    });

    var ChartAuditEksternal1 = (function() {
        var categories;
        var BarChartByYearElement2 = function() {
            $.ajax({
                url: BASE + "dashboard/get_data_tahunan_eksternal",
                method: "get",
                success: function(response) {
                    if (isJson(response)) {
                        categories = JSON.parse(response);
                        //   console.log(categories);
                    }
                },
            }).done(function() {
                $.ajax({
                    url: BASE + "dashboard/get_data_car_tahunan",
                    method: "get",
                    success: function(response) {
                        // console.log(response);
                        if (isJson(response)) {
                            // console.log(response);
                            var res = JSON.parse(response);
                            // console.log(res);

                            //   var series = [];
                            //   var labels = [];
                            //   for (var i in res.series) {
                            //     series.push(parseInt(res.series[i]));
                            //     labels.push(res.labels[i]);
                            //   }
                            //   console.log(series);
                            //   console.log(labels);
                            const apexChart = "#chart_32";
                            var options = {
                                series: res,
                                chart: {
                                    toolbar: {
                                        show: false,
                                    },
                                    type: "bar",
                                    height: 350,
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        columnWidth: "55%",
                                        endingShape: "rounded",
                                    },
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                stroke: {
                                    show: true,
                                    width: 2,
                                    colors: ["transparent"],
                                },
                                xaxis: {
                                    categories: categories,
                                },
                                yaxis: {
                                    title: {
                                        text: "temuan",
                                    },
                                },
                                fill: {
                                    opacity: 1,
                                },
                                tooltip: {
                                    y: {
                                        formatter: function(val) {
                                            return val + " temuan";
                                        },
                                    },
                                },
                                colors: [primary, success, warning, info],
                            };

                            var chart32 = new ApexCharts(
                                document.querySelector(apexChart),
                                options
                            );
                            chart32.render();
                        } else {
                            console.log("failed");
                        }
                    },
                });
            });
        };

        var BarChartBySeksiElement2 = function() {
            var categories2;
            $.ajax({
                url: BASE + "dashboard/get_data_seksi",
                method: "get",
                success: function(response) {
                    if (isJson(response)) {
                        categories2 = JSON.parse(response);
                        //   console.log(categories);
                    }
                },
            }).done(function() {
                $.ajax({
                    url: BASE + "dashboard/get_data_car_seksi",
                    data: {
                        tahun: tahun,
                    },
                    method: "post",
                    success: function(response) {
                        // console.log(response);
                        if (isJson(response)) {
                            // console.log(response);
                            var res = JSON.parse(response);
                            // console.log(res);

                            //   var series = [];
                            //   var labels = [];
                            //   for (var i in res.series) {
                            //     series.push(parseInt(res.series[i]));
                            //     labels.push(res.labels[i]);
                            //   }
                            //   console.log(series);
                            //   console.log(labels);
                            const apexChart = "#chart_42";
                            var options = {
                                series: res,
                                chart: {
                                    toolbar: {
                                        show: false,
                                    },
                                    type: "bar",
                                    height: 3500,
                                    stacked: true,
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: true,
                                    },
                                },
                                stroke: {
                                    width: 1,
                                    colors: ["#fff"],
                                },
                                title: {
                                    text: "Temuan per Seksi",
                                },
                                xaxis: {
                                    categories: categories2,
                                    labels: {
                                        formatter: function(val) {
                                            return val;
                                        },
                                    },
                                },
                                yaxis: {
                                    title: {
                                        text: undefined,
                                    },
                                },
                                tooltip: {
                                    y: {
                                        formatter: function(val) {
                                            return val + " temuan";
                                        },
                                    },
                                },
                                fill: {
                                    opacity: 1,
                                },
                                legend: {
                                    position: "top",
                                    horizontalAlign: "left",
                                    offsetX: 40,
                                },
                                colors: [primary, success, warning, info],
                            };

                            chart42 = new ApexCharts(
                                document.querySelector(apexChart),
                                options
                            );
                            chart42.render();
                        } else {
                            console.log("failed");
                        }
                    },
                });
            });
        };
        return {
            // public functions
            init: function() {
                BarChartByYearElement2();
                BarChartBySeksiElement2();
            },
        };
    })();
    ChartAuditEksternal1.init();
});

// FILTER BY YEAR

function change(tahunHTML) {
    console.log("Before :" + tahun);

    tahun = tahunHTML;
    $(".tahunText").html(tahunHTML);
    $("#tahunValue").val(tahunHTML);

    //   if (tahun == 0) {
    //     tahun = new Date().getFullYear();
    //   }
    console.log("After :" + tahun);
    //SECTION AUDIT INTERNAL
    $.ajax({
        url: BASE + "dashboard/get_data_jadwal_internal",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                console.log("total jadwal" + data.data[0].TOTAL_JADWAL);
                // console.log(data.data);

                if (data.data[0].TOTAL_JADWAL == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_JADWAL,
                        data.data[0].TOTAL_JADWAL_TERLAKSANA
                    );
                }

                $("#jadwal_internal_bar").css("width", value_persen + "%");
                $("#persen_jadwal_internal").html(value_persen + " %");
                $("#total_jadwal_internal").html(data.data[0].TOTAL_JADWAL);
                $("#total_jadwal_internal_terlaksana").html(
                    data.data[0].TOTAL_JADWAL_TERLAKSANA
                );
            }
        },
    });
    $.ajax({
        url: BASE + "dashboard/get_data_lai",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data);

                if (data.data[0].TOTAL_LAI == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_LAI,
                        data.data[0].TOTAL_LAI_W_TL
                    );
                }

                $("#lai_bar").css("width", value_persen + "%");
                $("#persen_lai").html(value_persen + " %");
                $("#total_lai").html(data.data[0].TOTAL_LAI);
                $("#total_lai_ditindaklanjuti").html(data.data[0].TOTAL_LAI_W_TL);
            }
        },
    });

    var categories2;
    $.ajax({
        url: BASE + "dashboard/get_data_seksi",
        method: "get",
        success: function(response) {
            if (isJson(response)) {
                categories2 = JSON.parse(response);
                //   console.log(categories);
            }
        },
    }).done(function() {
        $.ajax({
            url: BASE + "dashboard/get_data_lai_temuan_seksi",
            data: {
                tahun: tahun,
            },
            method: "post",
            success: function(response) {
                // console.log(response);
                if (isJson(response)) {
                    // console.log(response);
                    var res = JSON.parse(response);
                    console.log(res);

                    //   var series = [];
                    //   var labels = [];
                    //   for (var i in res.series) {
                    //     series.push(parseInt(res.series[i]));
                    //     labels.push(res.labels[i]);
                    //   }
                    //   console.log(series);
                    //   console.log(labels);

                    //   var chart2 = new ApexCharts(
                    //     document.querySelector(apexChart),
                    //     options
                    //   );
                    chart2.updateSeries(res);
                } else {
                    console.log("failed");
                }
            },
        });
    });

    $.ajax({
        url: BASE + "dashboard/get_data_lai_data",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data);

                if (data.data[0].TOTAL_LAI_TEMUAN == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_LAI_TEMUAN,
                        data.data[0].TOTAL_LAI_TEMUAN_DIJAWAB
                    );
                }

                $("#lai_data_bar").css("width", value_persen + "%");
                $("#persen_lai_data").html(value_persen + " %");
                $("#total_lai_data").html(data.data[0].TOTAL_LAI_TEMUAN);
                $("#total_lai_data_dijawab").html(
                    data.data[0].TOTAL_LAI_TEMUAN_DIJAWAB
                );

                JENIS_INTERNAL_SERIES = [
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_LTK),
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_OBS),
                ];
                console.log(JENIS_INTERNAL_SERIES);

                ELEMENT_INTERNAL_SERIES = [
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_SMM),
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_SML),
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_SMEN),
                    parseInt(data.data[0].TOTAL_LAI_TEMUAN_SMK3),
                ];
                console.log(ELEMENT_INTERNAL_SERIES);
            }
        },
    }).done(function() {
        chart3.updateSeries(ELEMENT_INTERNAL_SERIES);

        chart4.updateSeries(JENIS_INTERNAL_SERIES);
    });

    $.ajax({
        url: BASE + "dashboard/get_data_jadwal_eksternal",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data);

                if (data.data[0].TOTAL_JADWAL == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_JADWAL,
                        data.data[0].TOTAL_JADWAL_TERLAKSANA
                    );
                }

                $("#jadwal_eksternal_bar").css("width", value_persen + "%");
                $("#persen_jadwal_eksternal").html(value_persen + " %");
                $("#total_jadwal_eksternal").html(data.data[0].TOTAL_JADWAL);
                $("#total_jadwal_eksternal_terlaksana").html(
                    data.data[0].TOTAL_JADWAL_TERLAKSANA
                );
            }
        },
    });

    $.ajax({
        url: BASE + "dashboard/get_data_car",
        data: {
            tahun: tahun,
        },
        method: "post",
        success: function(response) {
            if (isJson(response)) {
                var data = JSON.parse(response);
                // console.log(data.data);

                if (data.data[0].TOTAL_CAR_NC == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_CAR_NC,
                        data.data[0].TOTAL_CAR_NC_W_TL
                    );
                }

                $("#nc_bar").css("width", value_persen + "%");
                $("#persen_nc").html(value_persen + " %");
                $("#total_nc").html(data.data[0].TOTAL_CAR_NC);
                $("#total_nc_ditindaklanjuti").html(data.data[0].TOTAL_CAR_NC_W_TL);

                if (data.data[0].TOTAL_CAR_OFI == 0) {
                    value_persen = 0;
                } else {
                    value_persen = convert_persen(
                        data.data[0].TOTAL_CAR_OFI,
                        data.data[0].TOTAL_CAR_OFI_W_TL
                    );
                }

                $("#ofi_bar").css("width", value_persen + "%");
                $("#persen_ofi").html(value_persen + " %");
                $("#total_ofi").html(data.data[0].TOTAL_CAR_OFI);
                $("#total_ofi_ditindaklanjuti").html(data.data[0].TOTAL_CAR_OFI_W_TL);

                JENIS_EKSTERNAL_SERIES = [
                    parseInt(data.data[0].TOTAL_CAR_NC),
                    parseInt(data.data[0].TOTAL_CAR_OFI),
                ];
                console.log(JENIS_EKSTERNAL_SERIES);

                ELEMENT_EKSTERNAL_SERIES = [
                    parseInt(data.data[0].TOTAL_CAR_SMM),
                    parseInt(data.data[0].TOTAL_CAR_SML),
                    parseInt(data.data[0].TOTAL_CAR_SMEN),
                    parseInt(data.data[0].TOTAL_CAR_SMK3),
                ];
                console.log(ELEMENT_EKSTERNAL_SERIES);
            }
        },
    }).done(function() {
        chart12.updateSeries(ELEMENT_EKSTERNAL_SERIES);
        chart22.updateSeries(JENIS_EKSTERNAL_SERIES);
    });

    var categories2;
    $.ajax({
        url: BASE + "dashboard/get_data_seksi",
        method: "get",
        success: function(response) {
            if (isJson(response)) {
                categories2 = JSON.parse(response);
                //   console.log(categories);
            }
        },
    }).done(function() {
        $.ajax({
            url: BASE + "dashboard/get_data_car_seksi",
            data: {
                tahun: tahun,
            },
            method: "post",
            success: function(response) {
                // console.log(response);
                if (isJson(response)) {
                    // console.log(response);
                    var res = JSON.parse(response);
                    // console.log(res);

                    //   var series = [];
                    //   var labels = [];
                    //   for (var i in res.series) {
                    //     series.push(parseInt(res.series[i]));
                    //     labels.push(res.labels[i]);
                    //   }
                    //   console.log(series);
                    //   console.log(labels);
                    chart42.updateSeries(res);
                } else {
                    console.log("failed");
                }
            },
        });
    });
}

// ISOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

$("#tableISO tbody").on("click", ".downloadButton", function() {
    const id = $(this).data("id");
    // console.log('clicked');

    $.ajax({
        url: BASE + "dashboard/downloadcounter",
        data: { id: id },
        method: "post",
        success: function(response) {
            var data = JSON.parse(response);
            if (data.status) {
                $.ajax({
                    url: BASE + "dashboard/getedit",
                    data: { id: id },
                    method: "post",
                    success: function(data) {
                        var iso = JSON.parse(data);
                        console.log(iso);
                        $("#downloadISO" + id).attr("href", iso.data[0].FILE_ISO);
                        $("#counter" + id).html(iso.data[0].COUNTER_DOWNLOAD);
                    },
                }).done(function() {
                    document.getElementById("downloadISO" + id).click();
                    $("#downloadISO" + id).attr("href", '');
                });
            } else {
                Swal.fire("Gagal!", "Download Gagal!", "error");
            }
        },
    });
});

$("#tableISO tbody").on("click", ".delete", function() {
    const name = $(this).data("nama");
    const id = $(this).data("id");

    Swal.fire({
        title: "Hapus Data ISO?",
        text: "Data yang sudah dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                url: BASE + name + "/delete/",
                data: { id: id },
                method: "post",
                success: function(response) {
                    var data = JSON.parse(response);
                    if (data.status) {
                        Swal.fire("Berhasil!", data.msg, "success").then(function() {
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

$("#tableISO tbody").on("click", ".tombolEdit", function() {
    const id = $(this).data("id");

    button_action({
        label: "Ubah Data ISO",
        btnLabel: "Ubah Data",
        type: "edit",
        url: "dashboard/edit",
        modal: "modalEdit",
        form: "form_edit",
    });

    $.ajax({
        url: BASE + "dashboard/getedit",
        data: { id: id },
        method: "post",
        success: function(data) {
            var iso = JSON.parse(data);
            console.log(iso);
            $("#idISO").val(iso.data[0].ID_ISO);
            $("#judulISOEdit").val(iso.data[0].JUDUL_ISO);

            $("#unggahanFileEdit").attr("href", BASE + iso.data[0].FILE_ISO);
            if (iso.data[0].FILE_ISO !== "" && iso.data[0].FILE_ISO !== null) {
                $("#igpFileEdit").show();
                $("#checkFileEdit").show();
                $("#isFileEdit").val("1");
            } else {
                $("#igpFileEdit").hide();
                $("#checkFileEdit").hide();
                $("#isFileEdit").val("0");
            }

            $(".selectpicker").selectpicker("refresh");
        },
    });
});

// Class definition
var KTFormControls = (function() {
    // Private functions
    var _handleTambah = function() {
        var validation;

        if (isSelectorExist("#form_tambah")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_tambah"), {
                    fields: {
                        judulISO: {
                            validators: {
                                notEmpty: {
                                    message: "Judul harus diisi",
                                },
                            },
                        },

                        fileISO: {
                            validators: {
                                file: {
                                    extension: "pdf",
                                    type: "application/pdf",
                                    message: "Silahkan pilih file PDF",
                                },
                            },
                        },
                    },

                    plugins: {
                        //Learn more: https://formvalidation.io/guide/plugins
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap(),
                        // Validate fields when clicking the Submit button
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        // Submit the form when all fields are valid
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                    },
                }
            );

            $("#submit").on("click", function(e) {
                e.preventDefault();
                const jenis = $(this).data("jenis");
                //   console.log("add");

                var _input = new FormData(document.getElementById("form_tambah"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: "dashboard/add",
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submit").removeClass("spinner spinner-white spinner-right");
                                var res = JSON.parse(response);
                                if (res.status) {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "success",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function(result) {
                                            if (result.isDismissed) {
                                                window.location.reload();
                                            }
                                        });
                                } else {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "error",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function() {});
                                }
                            },
                            error: function(e) {
                                // console.log(e);
                                $("#submit").removeClass("spinner spinner-white spinner-right");
                            },
                        });
                    } else {
                        $("#submit").removeClass("spinner spinner-white spinner-right");
                    }
                });
            });
        }
    };
    // Private functions
    var _handleEdit = function() {
        var validation;

        if (isSelectorExist("#form_edit")) {
            validation = FormValidation.formValidation(
                document.getElementById("form_edit"), {
                    fields: {
                        judulISO: {
                            validators: {
                                notEmpty: {
                                    message: "Judul harus diisi",
                                },
                            },
                        },

                        fileISO: {
                            validators: {
                                file: {
                                    extension: "pdf",
                                    type: "application/pdf",
                                    message: "Silahkan pilih file PDF",
                                },
                            },
                        },
                    },

                    plugins: {
                        //Learn more: https://formvalidation.io/guide/plugins
                        trigger: new FormValidation.plugins.Trigger(),
                        // Bootstrap Framework Integration
                        bootstrap: new FormValidation.plugins.Bootstrap(),
                        // Validate fields when clicking the Submit button
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        // Submit the form when all fields are valid
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                    },
                }
            );

            $("#submitEdit").on("click", function(e) {
                e.preventDefault();
                const jenis = $(this).data("jenis");
                // console.log("edit");

                var _input = new FormData(document.getElementById("form_edit"));

                $(this).addClass("spinner spinner-white spinner-right disabled");

                validation.validate().then(function(status) {
                    //   console.log(status);

                    if (status == "Valid") {
                        $.ajax({
                            url: "dashboard/edit",
                            method: "POST",
                            data: _input,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function(response) {
                                console.log(response);
                                $("#submitEdit").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                                var res = JSON.parse(response);
                                if (res.status) {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "success",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function(result) {
                                            if (result.isDismissed) {
                                                window.location.reload();
                                            }
                                        });
                                } else {
                                    swal
                                        .fire({
                                            text: res.msg,
                                            icon: "error",
                                            timer: 3000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                        })
                                        .then(function() {});
                                }
                            },
                            error: function(e) {
                                // console.log(e);
                                $("#submitEdit").removeClass(
                                    "spinner spinner-white spinner-right"
                                );
                            },
                        });
                    } else {
                        $("#submitEdit").removeClass("spinner spinner-white spinner-right");
                    }
                });
            });
        }
    };

    return {
        // public functions
        init: function() {
            _handleTambah();
            _handleEdit();
        },
    };
})();

jQuery(document).ready(function() {
    KTFormControls.init();
});