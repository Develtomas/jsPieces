import moment from 'moment';
import ReportView from "../view/AbstractReport"

export default class ReportArchiveMonth extends ReportView {
    constructor(model) {
        super(model);
        this.initWidgets();
        $(document).ready(this.bindOnReady);
    }
    bindOnReady() {
        //to hightlight month
        let picker = $('.datepicker').pickadate('picker');
        picker.on({
            set: (item) => {
                if (typeof item.select !== 'undefined') {
                    let $activeTbody = $('.activeTbody');
                    if ($activeTbody.length > 0) {
                        $activeTbody.removeClass('activeTbody');
                    }
                    let $trigElement = $(`[data-pick="${item.select}"]`).closest('tbody');
                    $trigElement.addClass('activeTbody');
                }
            }
        });
        $('option[value="yyyy-mm"]').remove();
    }
    chartLabelParse(data, dataKind, chartLabels, sort_type, archiveType) {
        let year = moment(chartLabels[0], 'YYYY-MM-DD').format('YYYY');
        let month = moment(chartLabels[0], 'YYYY-MM-DD').format('MM');
        let weekCount = this.getWeekCount(month-1, year);
        let dayCount = moment(chartLabels[0], 'YYYY-MM-DD').daysInMonth();
        chartLabels = [];
        if (sort_type == '/yyyy-mm-dd') {
            for (let i=1; i<dayCount+1; i++) {
                i = String(i);
                //add '0' before days with 1 symbol length
                if (i.length < 2) {
                    i = '0' + i;
                }
                chartLabels.push(`${i}-${month}-${year}`);
            }
        }
        else if (sort_type == '/yyyy-mm-w') {
            //-1 beacause of js's month count beginning from 0
            for (let i=1; i<weekCount+1; i++) {
                chartLabels.push(`${i}-${month}-${year}`);
            }                            
        }
        return chartLabels;                      
    }
}