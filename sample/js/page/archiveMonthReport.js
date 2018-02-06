import Report from '../../model/Report';
import ReportView from "../../view/archiveMonthReport"

$(document).ready(function () {
    let reportModel = new Report();
    let reportView = new ReportView(reportModel);
});