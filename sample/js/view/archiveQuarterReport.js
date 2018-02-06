import moment from 'moment';
import ReportView from "../view/AbstractReport"
export default class ReportArchiveQuarter extends ReportView {
    constructor(model) {
        super(model);
        this.initWidgets();
        $(document).ready(this.bindOnReady);
    }

    bindOnReady() {
        $('input[name="year"]').val((new Date).getFullYear());
    }

    chartLabelParse(data, dataKind, chartLabels, sort_type, archiveType) {
        let quarterNum = $('select[name="quarter"]').val();
        let year = $('input[name="year"]').val();
        let allQarters = {
            1: ['01', '02', '03'],
            2: ['04', '05', '06'],
            3: ['07', '08', '09'],
            4: ['10', '11', '12']
        }
        let quarterMonths = allQarters[quarterNum];
        chartLabels = [];
        if (sort_type == '/yyyy-mm-dd') {
            quarterMonths.forEach((month) => {
                let dayCount = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
                for (let i=1; i<dayCount+1; i++) {
                    i = String(i);
                    if (i.length < 2) {
                        i = '0' + i;
                    }
                    chartLabels.push(`${i}-${month}-${year}`);
                }
            });
        }
        else if (sort_type == '/yyyy-mm-w') {
            quarterMonths.forEach((month) => {
                let weekCount = this.getWeekCount(+month-1, +year);
                for (let i=1; i<weekCount+1; i++) {
                    chartLabels.push(`${i}-${month}-${year}`);
                }
            });
        }
        else if (sort_type == '/yyyy-mm') {
            quarterMonths.forEach((month) => {
                chartLabels.push(`${month}-${year}`);
            });
        }
        return chartLabels;
    }
}