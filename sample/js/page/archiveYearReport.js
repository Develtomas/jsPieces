import Report from '../../model/Report';
import ReportView from "../../view/archiveYearReport"

$(document).ready(function () {
    let reportModel = new Report();
    let reportView = new ReportView(reportModel);
});