import Report from '../../model/Report';
import ReportView from "../../view/archiveQuarterReport"

$(document).ready(function () {
    let reportModel = new Report();
    let reportView = new ReportView(reportModel);
});