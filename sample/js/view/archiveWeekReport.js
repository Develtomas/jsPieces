import moment from 'moment';
import ReportView from "../view/AbstractReport"

export default class ReportArchiveWeek extends ReportView {
    constructor(model) {
        super(model);
        $(document).ready(this.bindOnReady);
    }

    bindOnReady() {
        //hightlight week
        let picker = $('.datepicker').pickadate('picker');
        picker.on({
            set: (item) => {
                if (typeof item.select !== 'undefined') {
                    let $activeWeekRow = $('.activeWeekRow');
                    if ($activeWeekRow.length > 0) {
                        $activeWeekRow.removeClass('activeWeekRow');
                    }
                    let $trigElement = $(`[data-pick="${item.select}"]`).closest('tr');
                    $trigElement.addClass('activeWeekRow');
                }
            }
        });
    }

    getDayinWeek(day, weekNumber, year) {
        return moment(year, 'YYYY').week(weekNumber).isoWeekday(day).format('YYYY-MM-DD');
    }

    chartLabelParse(data, dataKind, chartLabels, sort_type, archiveType) {
        chartLabels = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
        let weekNumber = moment(data[0].date, 'YYYY-MM-DD').week();
        let year =  moment(data[0].date, 'YYYY');
        return chartLabels.map((item) => {
            let day = this.getDayinWeek(item, weekNumber, year);
            return this.dateReverser(day);
        });                        
    }
}