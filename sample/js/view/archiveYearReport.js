import moment from 'moment';
import ReportView from "../view/AbstractReport"

export default class ReportArchiveYear extends ReportView {
    constructor(model) {
        super(model);
        this.initWidgets();
        $(document).ready(this.bindOnReady);
    }

    bindOnReady() {
        $('input[name="year"]').val((new Date).getFullYear());
    }

    chartLabelParse(data, dataKind, chartLabels, sort_type, archiveType) {
        let year = $('input[name="year"]').val();
        let allMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        chartLabels = [];
        if (sort_type == '/yyyy-mm-dd') {
            allMonths.forEach((month) => {
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
            allMonths.forEach((month) => {
                let weekCount = this.getWeekCount(+month-1, +year);
                for (let i=1; i<weekCount+1; i++) {
                    chartLabels.push(`${i}-${month}-${year}`);
                }
            });
        }
        else if (sort_type == '/yyyy-mm') {
            allMonths.forEach((month) => {
                chartLabels.push(`${month}-${year}`);
            });
        }
        return chartLabels;
    }

}