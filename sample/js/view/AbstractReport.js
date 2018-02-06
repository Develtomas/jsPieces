import _ from 'underscore';
import Chart from 'chart.js';
import moment from 'moment';
import SysMap from '../model/SysMap';
import domtoimage from 'dom-to-image';
require('../plugins/table2csv.js');

let exporter = new Exporter();
const reportTypes = {
    organization: 'транспортным операторам',
    vehicle: 'видам ТС',
    time: 'времени суток',
    112: 'по количеству сообщений из Системы-112 ',
    archive: 'возникновению НС',
    incidentbymonth: 'месяцам года',
    incidentbytype: 'типам нештатных ситуаций',
    place: 'месту возникновения',
    time_weekday: 'по дням недели'
};

export default class ReportView {
    constructor(model) {
        this.model = model;
        $(document).on('click', '.print-report', function (e) {
            window.print()
        });
        $(document).on('click', '#buildReport', this.buildReport.bind(this));
        $(document).on('click', '.export-csv', function (e) {
            e.preventDefault();
            $('.page-table-data').table2csv({
                separator: ';',
                quoteFields: true,
                filename: 'report.csv'
            });
        });
        $(document).on('click', '.export-xml', function (e) {
            e.preventDefault();
            exporter.tableToXml('.page-table-data');
        });
        $(document).on('click', '.export-html', function (e) {
            e.preventDefault();
            exporter.downloadHtml();
        });
        $(document).on('click', '.export-doc', function (e) {
            e.preventDefault();
            exporter.downloadDocx();
        });
        $(document).on('click', '.export-xls', function (e) {
            e.preventDefault();
            exporter.tableToExcel($('.report__content').find('.page-table-data'), 'report.xls');
        });
        $(document).on('click', '.export-pdf', function (e) {
            e.preventDefault();

            let interval = setInterval(function () {
                if (exporter.checkReady()) {
                    exporter.download();
                    clearInterval(interval);
                    exporter.clearCounter();
                }
            }, 1000);

            $.each(exporter.getCounter(), function (key) {
                let elements = $(`.${key}`);
                switch (exporter.getType(key)) {
                    case 'image':
                        $.each(elements, function (k, element) {
                            exporter.addNeed(key);
                            //try to resize pic for different screens
                            domtoimage.toPng(element, { width: 2200 }).then(function (dataUrl) {
                                exporter.concatContents(key, {width: 1100, image: dataUrl});
                            });
                        });
                        break;
                    case 'table':
                        $.each(elements.find('.row'), function (k, element) {
                            let table = exporter.generateTable(element);
                            if (!table) {
                                table = exporter.generateList(element);
                            }

                            if (table) {
                                exporter.addNeed(key, 2);
                                exporter.concatContents(key, table);
                            }
                        });
                        break;
                }
            });
        });
        $(document).on('change', 'input[data-type="expanded"]', (e)=>{
            let isExpanded = $(e.currentTarget).val();
            $(e.currentTarget).siblings('ul').toggle(isExpanded);
        });
        moment.locale('ru');
    }

    dateReverser(date) {
        let dateArr = date.toString().split('-');
        return dateArr.reverse().join('-');
    }

    createLineChartLabels(type, data){
        switch(type){
            case 'month':{
                return [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь'
                ];
                break;
            }
            case 'day': {
                return [
                    {'monday':'Понедельник'},
                    {'tuesday':'Вторник'},
                    {'wednesday':'Среда'},
                    {'thursday':'Четверг'},
                    {'friday':'Пятница'},
                    {'saturday':'Суббота'},
                    {'sunday':'Воскресенье'}
                ];
                break;
            }
            default:{
                return data.map((item) => {
                    let name = '';
                    if (item.name) {
                        name = item.name
                    } else if (item.day) {
                        name = 'день ' + item.day;
                    } else if (item.week) {
                        name = 'неделя ' + item.week;
                    } else if (item.month) {
                        name = 'месяц ' + item.month;
                    } else if (item.date) {
                        name = item.date;
                    }
                    return name;
                });
                break;
            }
        }
    }

    chartTypeParse(group, loopNum, chartLabels, xGrouping, dataKind) {
        return group.filter((item)=>loopNum + 1 == item[xGrouping]);
    }

    getWeekCount(month, year) {
        var l=new Date(year, month+1, 0);
        return Math.ceil( (l.getDate()- (l.getDay()?l.getDay():7))/7 )+1;
    }

    chartLabelParse(data, dataKind, chartLabels, sort_type, archiveType) {
        return chartLabels;
    }

    getChartItemData(group, index, labels, xGrouping, dataKind){
        let count = 0;
        let countGroupItems;
        countGroupItems = this.chartTypeParse(group, index, labels, xGrouping, dataKind);
        if (countGroupItems.length > 0) {
            count = countGroupItems[0].countTask ? countGroupItems[0].countTask : countGroupItems[0].countIncident;
        }
        return count;
    }

    createLinearChartData(yGrouping, xGrouping, chartLabels, data, label, dataKind){
        let datasets = [];
        if (yGrouping !== '') {
            const grouppedData = _.groupBy(data, yGrouping);
            let colorIndex = 0;
            for(let i in grouppedData){
                let group = grouppedData[i];
                let chartData = [];
                for (let j=0;j<chartLabels.length;++j){
                    chartData.push(this.getChartItemData(group, j, chartLabels, xGrouping, dataKind));
                }
                datasets.push(Object.assign({}, {
                        label: i,
                        backgroundColor: 'transparent',
                        borderColor: this.model.linearColors[colorIndex],
                        borderWidth: 3,
                        pointRadius: 1
                    },
                    {
                        data: chartData
                    }))
                ++colorIndex;
            }
        }
        else {
            let chartData = [];
            for (let j=0;j<chartLabels.length;++j){
                chartData.push(this.getChartItemData(data, j, chartLabels, xGrouping, dataKind));
            }
            datasets = [{
                label: label,
                data: chartData,
                backgroundColor: 'transparent',
                borderColor: this.model.linearColors[0],
                borderWidth: 3,
                pointRadius: 3,
                pointBackgroundColor: this.model.linearColors[12]
            }];
        }
        return datasets;
    }

    createBarChartData(yGrouping, xGrouping, chartLabels, data, label, dataKind){
        let datasets = [];
        if (yGrouping !== '') {
            const grouppedData = _.groupBy(data, yGrouping);
            let colorIndex = 0;
            for(let i in grouppedData){
                let group = grouppedData[i];
                let chartData = [];
                for (let j=0;j<chartLabels.length;++j){
                    chartData.push(this.getChartItemData(group, j, chartLabels, xGrouping, dataKind));
                }
                datasets.push(Object.assign({}, {
                        label: i,
                        backgroundColor: this.model.linearColors[colorIndex],
                        borderColor: this.model.linearColors[colorIndex],
                        borderWidth: 1
                    },
                    {
                        data: chartData
                    }))
                ++colorIndex;
            }
        }
        else {
            let chartData = [];
            for (let j=0;j<chartLabels.length;++j){
                chartData.push(this.getChartItemData(data, j, chartLabels, xGrouping, dataKind));
            }
            datasets = [{
                data: chartData,
                backgroundColor: this.model.linearColors,
                borderColor: this.model.linearColors,
                borderWidth: 1
            }];
        }
        return datasets;
    }

    createBarArchive(data, labels) {
        let barColor = (labels.length < 13) ? this.model.linearColors : '#808080';
        let chartData = [];
        labels.map((item)=>{
            item = this.dateReverser(item);
            let match = false;
            for (let i=0; i<data.length; i++) {
                if (item == data[i].date) {
                    chartData.push(data[i].countIncident);
                    match = !match;
                    break;
                }
            }
            if (!match) {
                chartData.push(0);
            }
        });
        let datasets = [{
            data: chartData,
            backgroundColor: barColor,
            borderColor: barColor,
            borderWidth: 1
        }];
        return datasets;
    }

    createLineArchive(data, labels) {
        let chartPointRadius = (labels.length < 13) ? 3 : 0;
        let chartData = [];
        labels.map((item)=>{
            item = this.dateReverser(item);
            let match = false;
            for (let i=0; i<data.length; i++) {
                if (item == data[i].date) {
                    chartData.push(data[i].countIncident);
                    match = !match;
                    break;
                }
            }
            if (!match) {
                chartData.push(0);
            }
        });
        let datasets = [{
            data: chartData,
            backgroundColor: 'transparent',
            borderColor: this.model.linearColors[0],
            borderWidth: 3,
            pointRadius: chartPointRadius,
            pointBackgroundColor: this.model.linearColors[12]
        }];
        return datasets;
    }

    checkColumnarChart(data, dataType, dataKind, yGrouping, xGrouping, archiveType, label, chartLabels) {
        let datasets, chartData, maxChartValue;
        let chartColors = this.model.linearColors;
        if (xGrouping) {
            datasets = this.createBarChartData(yGrouping, xGrouping, chartLabels, data, label, dataKind);
        }
        else if (archiveType) {
            datasets = this.createBarArchive(data, chartLabels);
        }
        else {
            chartData = data.map((chartItem) => {
                return chartItem.countTask ? chartItem.countTask : chartItem.countIncident;
            });
            maxChartValue = Math.max(chartData);
            datasets = [{
                data: chartData,
                backgroundColor: chartColors,
                borderWidth: 1
            }];
            chartLabels = this.chartLabelParse('',dataKind, chartLabels);
        }
        return {"datasets": datasets, "chartLabels": chartLabels, "max": maxChartValue };
    }

    checkLCircularChart(data, dataKind, yGrouping, xGrouping, chartColors, chartData) {
        chartData = data.map((chartItem) => {
            return chartItem.countTask ? chartItem.countTask : chartItem.countIncident;
        });
        return {"chartData": chartData, "chartColors": chartColors};
    }

    checkLinearChart(data, dataType, dataKind, yGrouping, xGrouping, archiveType, label, chartLabels) {
        let datasets, chartData;
        if (xGrouping) {
            datasets = this.createLinearChartData(yGrouping, xGrouping, chartLabels, data, label, dataKind);
        }
        else if (archiveType) {
            datasets = this.createLineArchive(data, chartLabels);
            datasets[0].label = label;
        }
        else {
            chartData = data.map((chartItem) => {
                return chartItem.countTask ? chartItem.countTask : chartItem.countIncident;
            });
            datasets = [{
                label: label,
                data: chartData,
                backgroundColor: 'transparent',
                borderColor: this.model.linearColors[0],
                borderWidth: 3,
                pointRadius: 3,
                pointBackgroundColor: this.model.linearColors[12]
            }];
        }
        return datasets;
    }

    chartScale(instance) {
        let chartHeight = {
            'xs': 250,
            'sm': 300,
            'md': 400
        };
        let canvas = instance.chart.canvas;
        let windowWidth = $(window).width();

        if (instance.config.type == 'doughnut') {
            instance.chart.options.legend.display = windowWidth > 1024;
        }
        if (windowWidth < 512) {
            $(canvas).height(chartHeight['xs']);
        }
        else if (windowWidth >= 512 && windowWidth < 1024) {
            $(canvas).height(chartHeight['sm']);
        }
        else {
            $(canvas).height(chartHeight['md']);
        }
    }

    createChartBlock(data, chartType, dataType, dataKind, yGrouping = '', xGrouping = '', selectChartType = '', archiveType = '') {
        let ctx;
        let dataChartType = typeof dataType !== 'undefined' ? dataType : '';
        const chartContainer = dataKind
            ? `.report__chart__${chartType}-diagram-${dataKind}`
            :  `.report__chart__${chartType}-diagram`;
        if (dataKind == 'time') {$(chartContainer).append(`<span class="time-report">${this.model.dayTimeHours}</span>`);}
        switch (chartType) {
            case 'columnar': {
                const chartId = `columnarDiagramm${dataKind}`;
                $(chartContainer).append(`<div class="chart"><canvas id="${chartId}"></canvas></div>`);
                ctx = document.getElementById(chartId).getContext('2d');
                let label = reportTypes[dataKind] ? `Диаграмма НС по ${dataType}` : `Диаграмма нарушений по ${dataType}`;
                let chartLabels = this.createLineChartLabels(xGrouping, data);
                chartLabels = this.chartLabelParse(data, dataKind, chartLabels, selectChartType, archiveType);

                let dataObj = this.checkColumnarChart(data, dataType, dataKind, yGrouping, xGrouping, archiveType, label, chartLabels);
                let datasets = dataObj['datasets'];
                let maxChartValue = dataObj['max'];
                chartLabels = dataObj['chartLabels'];

                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: chartLabels,
                        datasets: datasets
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        title: {
                            display: true,
                            text: label
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: Math.floor(maxChartValue/5),
                                }
                            }]
                        }
                    },
                    plugins: [{
                        beforeRender: this.chartScale,
                        resize: this.chartScale
                    }]
                });
                break;
            } 
            case 'circular': {
                let chartColors = this.model.linearColors;
                const chartId = `circularDiagramm${dataKind}`;
                $(chartContainer).append(`<div class="chart"><canvas id="${chartId}"></canvas></div>`);
                ctx = document.getElementById(chartId).getContext('2d');
                let chartLabels = this.createLineChartLabels(xGrouping, data);
                chartLabels = this.chartLabelParse(data, dataKind, chartLabels);
                let label = reportTypes[dataKind] ? `Диаграмма НС по ${dataType}` : `Диаграмма нарушений по ${dataType}`;

                let chartData = this.checkLCircularChart(data, dataKind, yGrouping, xGrouping, chartColors, chartData)['chartData'];
                chartColors = this.checkLCircularChart(data, dataKind, yGrouping, xGrouping, chartColors, chartData)['chartColors'];

                const myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: chartData,
                            backgroundColor: chartColors
                        }],
                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: chartLabels
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        cutoutPercentage: 0,
                        title: {
                            display: true,
                            text: label
                        }
                    },
                    plugins: [{
                        beforeRender: this.chartScale,
                        resize: this.chartScale
                    }]
                });
                break;
            }
            case 'linear': {
                const chartId = `linearDiagramm${dataKind}`;
                $(chartContainer).append(`<div class="chart"><canvas id="${chartId}"></canvas></div>`);
                ctx = document.getElementById(chartId).getContext('2d');
                let label = `Диаграмма НС по ${dataType}`;
                let chartLabels = this.createLineChartLabels(xGrouping, data, selectChartType);
                chartLabels = this.chartLabelParse(data, dataKind, chartLabels, selectChartType, archiveType);

                let datasets = this.checkLinearChart(data, dataType, dataKind, yGrouping, xGrouping, archiveType, label, chartLabels);
                let maxChartValue = Math.max(datasets.data);

                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: chartLabels,
                        datasets: datasets,
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: Math.floor(maxChartValue/5),
                                }
                            }]
                        }
                    },
                    plugins: [{
                        beforeRender: this.chartScale,
                        resize: this.chartScale
                    }]
                });
                break;
            }
            default: {
                break;
            }
        }
    }

    createMap(mapType) {
        $('.report__map').append("<div id='map' data-type='" + mapType + "'></div>");
        this.mapData = new SysMap([55.7503990, 37.6093400], mapType);
        this.map = L.map('map', this.mapData.crs);
        this.mapData.tileLayer().addTo(this.map);
        this.map.setView(this.mapData.center, this.mapData.zoom);
    }

    createOneMarker(coords, mapType) {
        this.createMap(mapType);
        L.marker([coords[1], coords[0]], {icon: SysMap.getIcon(this.model.linearColors[11])}).addTo(this.map);
    }

    createMapFromFeatures(json, mapType) {
        this.createMap(mapType);
        L.geoJSON(json, {
            pointToLayer: (feature, latlng) => {
                return L.marker(latlng, {
                  icon: SysMap.getIcon(this.model.linearColors[11])
                })
            }
        }).addTo(this.map);
    }

    createMapMarkers(data, mapType, isDataMixed = false, reportCode = false) {
        this.createMap(mapType);
        if (isDataMixed) {
            const reportInterval = $('#reportFilter').attr('data-interval');
            const groupedByParam = _.groupBy(data, (item) => item[reportInterval]);
            let groupNum = 0;
            for (let i in groupedByParam) {
                //max of month, if more than 12 , than native blue color sets on markers
                const maxColorVal = 11;
                let colorNum = (groupNum < maxColorVal) ? groupNum : maxColorVal;
                groupNum++;
                for (let j = 0; j < groupedByParam[i].length; ++j) {
                    L.marker([groupedByParam[i][j].latitude, groupedByParam[i][j].longitude], {icon: SysMap.getIcon(linearColors[colorNum])}).addTo(this.map);
                }
            }
        } else {
            $.each(data, (index, response) => {
                $.each(response, (key, point) => {
                    if (point.latitude && point.longitude) {
                        L.marker([point.latitude, point.longitude], {icon: SysMap.getIcon(this.model.timeofDay[index])}).addTo(this.map);
                    }
                });
            });
        }
    }

    buildReport() {
        this.model.reset();
        let dataRequestsPromises = [];
        const reportBlocks = $('.report__switcher').find('input:checked:visible');
        $(`.report__common-info`).html('');
        $(`.report__footer`).html('');
        $(`.report__list>div`).html('');
        $(`.report__chart>div`).html('');
        $('.report__photo').html('');
        $('.report__map').html('');
        const ARCHIVE_REPORT_URL = 'incident_archive_statistic';
        const IS_ARCHIVE_REPORT =
            ($('#reportFilter').attr('data-type') == ARCHIVE_REPORT_URL)
                ? true
                : false;
        let REPORT_URL = $('.container-fluid').data('route');
        let ARCHIVE_TYPE;
        if (IS_ARCHIVE_REPORT) {
            let archive_arr = REPORT_URL.split('_');
            ARCHIVE_TYPE = archive_arr[archive_arr.length - 1];
            REPORT_URL = `${ARCHIVE_REPORT_URL}/${ARCHIVE_TYPE}`;
        }
        const REPORT_MAIN_DATA_URL = $('#reportFilter').attr('data-mainurl');
        const TYPE_FILTER_DATA_GET = $('#reportFilter').attr('data-get');
        let filtrationData;
        switch (TYPE_FILTER_DATA_GET) {
            case 'client': {
                filtrationData = '/' + $('.report__filter__field select').val() + '?' + $('#reportFilter').serialize();
                break;
            }
            case 'server': {
                filtrationData = '?' + $('#reportFilter').serialize();
                break;
            }
            default: {
                break;
            }
        }
        for (let i = 0; i < reportBlocks.length; ++i) {
            //get block Key for define request url and target underscore template
            const REPORT_BLOCK_KEY = $(reportBlocks[i]).data('key');

            //get block type for divide logic with report block building (like map, chart, table)
            const REPORT_BLOCK_TYPE = $(reportBlocks[i]).data('type');

            //get kind of data for divide press and dispatch requests
            const DATA_KIND = $(reportBlocks[i]).data('kind');

            //get html key for push filled template in right block
            const DATA_TEMPLATE_KEY = $(reportBlocks[i]).data('template');

            let group_report = DATA_KIND == '112' ? `&groupBy=${$('#where_groupBy').val()}` : '';
            let REPORT_DATA_KIND = typeof this.model.reportBlockCodes[DATA_KIND] !== 'undefined' ? `&where[kind][]=${this.model.reportBlockCodes[DATA_KIND]}` : '';
            let selectChartType = '';
            if (IS_ARCHIVE_REPORT) {
                if (REPORT_BLOCK_KEY == 'diagramm') {
                    selectChartType = '/' + $('.chartScale').val();
                    if (ARCHIVE_TYPE == 'week') {
                        selectChartType = '/yyyy-mm-dd'; 
                    }
                }
                REPORT_DATA_KIND = '';
            }
            if (typeof REPORT_BLOCK_KEY != 'undefined' && REPORT_BLOCK_KEY.length != 0) {
                dataRequestsPromises.push(
                fetch(`/api/report/${REPORT_URL}/${REPORT_BLOCK_KEY}${selectChartType}${filtrationData}${REPORT_DATA_KIND}${group_report}`, {credentials: 'include'})
                    .then((data) => {
                        return data.json();
                    })
                    .then((json) => {
                        if ((json.length || typeof json.geometry !== 'undefined' || !$.isEmptyObject(json)) && typeof json.code == 'undefined') {
                            this.model.addReportData(REPORT_BLOCK_KEY+DATA_KIND, json);
                            let label = this.model.reportBlockTypes[DATA_KIND] ? this.model.reportBlockTypes[DATA_KIND] : reportTypes[DATA_KIND];
                            const data = {
                                dataTypeLabel: label,
                                json: json,
                            };
                            switch (REPORT_BLOCK_TYPE) {
                                case 'diagram': {
                                    const DIAGRAM_TYPE = $(reportBlocks[i]).data('diagram');
                                    /**
                                     * GROUPING_FIELD_Y - parameter of building many series in chart
                                     */
                                    const GROUPING_FIELD_Y = typeof $(reportBlocks[i]).data('groupy') !=='undefined'
                                    ? $(reportBlocks[i]).data('groupy') : '';

                                    /**
                                     * GROUPING_FIELD_X - parameter of grouping data by columns
                                     */
                                    const GROUPING_FIELD_X = typeof $(reportBlocks[i]).data('groupx') !=='undefined'
                                    ? $(reportBlocks[i]).data('groupx') : '';

                                    this.createChartBlock(json, DIAGRAM_TYPE, label, DATA_KIND, GROUPING_FIELD_Y,GROUPING_FIELD_X, selectChartType, ARCHIVE_TYPE);
                                    break;
                                }
                                case 'map': {
                                    const MAP_TYPE = $('.report__map').data('type');
                                    if ($.inArray(MAP_TYPE, ['compensationReport', 'placeReport']) != -1) {
                                        this.createMapFromFeatures(json, MAP_TYPE);
                                    } else {
                                        if (json.geometry) {
                                            this.createOneMarker(json.geometry.coordinates, MAP_TYPE);
                                        } else {
                                            const isDataMixed = (typeof json[0] !== 'undefined' && typeof json[0].latitude !== 'undefined' && typeof json[0].longitude !== 'undefined');
                                            this.createMapMarkers(json, MAP_TYPE, isDataMixed, REPORT_URL);
                                        }
                                    }
                                    break;
                                }
                                case 'photo': {
                                    const templateId = typeof REPORT_BLOCK_TYPE !== 'undefined'
                                        ? `${REPORT_BLOCK_TYPE}${REPORT_BLOCK_KEY}Template`
                                        : `${REPORT_BLOCK_KEY}Template`;
                                    let template = _.template($(`#${templateId}`).html());
                                    $(`.report__photo`).append(template({data: data}));
                                    $('.materialboxed').materialbox();
                                    break;
                                }
                                default: {
                                    const templateId = typeof REPORT_BLOCK_TYPE !== 'undefined'
                                        ? `${REPORT_BLOCK_TYPE}${REPORT_BLOCK_KEY}Template`
                                        : `${REPORT_BLOCK_KEY}Template`;
                                    let template = _.template($(`#${templateId}`).html());
                                    $(`.report__list__${REPORT_BLOCK_KEY}-${DATA_TEMPLATE_KEY}`).html(template({data: data}));
                                    break;
                                }
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Your report block request failed with error. Maybe report underscore template doesn\'t exist:', error);
                    }));
            }
        }
        Promise.all(dataRequestsPromises).then(()=>{
            this.fillReportBounds(REPORT_URL, REPORT_MAIN_DATA_URL, filtrationData, REPORT_URL);
        });
    }

    getCommonInfo(json) {
        return {
            created: (new Date).toLocaleDateString(),
            totalCount: json.length,
        };
    }

    fillReportBounds(reportUrl, mainInfoUrl, filtrationQuery, reportType) {
        fetch(`/api/report/${reportUrl}/${mainInfoUrl}${filtrationQuery}`, {credentials: 'include'})
            .then((data) => {
                return data.json();
            })
            .then((json) => {
                if (typeof json !== 'undefined') {
                    let template = _.template($(`#commoninfoTemplate`).html());
                    $(`.report__common-info`).html(template({data: this.getCommonInfo(json)}));
                }
                if (json.length || !$.isEmptyObject(json)) {
                    this.fillFooterInfoBlock();
                }
            })
            .catch((error) => {
                console.error('Your report block request failed with error. Maybe report underscore template doesn\'t exist:', error);
            });
    }

    fillFooterInfoBlock() {
        const footerInfoData = {
            date: (new Date).toLocaleDateString(),
            time: (new Date).toLocaleTimeString(),
        };
        let template = _.template($(`#footerinfoTemplate`).html());
        $(`.report__footer`).html(template({data: footerInfoData}));
    }

    initWidgets() {
        $('select').not('.chartScale, .quarter').select2({
            language: "ru"
        });
        $('select.chartScale, select.quarter').select2({
            language: "ru",
            tags: true
        });
    }
}

