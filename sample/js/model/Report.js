/**
 * here'll be classes for report.
 */
export default class Report {
    constructor() {
        this.REPORT_URL = 'regulation_violations';
        this.reportBlockKeys = [];
        this.reportData = {};
        this.dayTimeHours = 'Утро: 06:00 - 12:00 / День: 12:00 - 17:00 / Вечер: 17:00 - 22:00 / Ночь: 22:00 - 06:00';
        this.linearColors = [
            '#808080', // grey
            '#FF0000', // red
            '#FFFF00', // yellow
            '#800080', // violet
            '#FFA500', //orange
            '#00FF00', //green
            '#0000FF', //blue
            '#00FFFF', //lightblue
            '#187f72', //seawawe
            '#46231E', //brown
            '#FE5E97', //pink
            '#165292', //native navy
            '#fff'
        ];
        this.districtColor = {
            "Троицкий": this.linearColors[0],
            "Новомосковский": this.linearColors[1],
            "Зеленоградский": this.linearColors[2],
            "Юго-Западный": this.linearColors[3],
            "Юго-Восточный": this.linearColors[4],
            "Центральный": this.linearColors[5],
            "Северный": this.linearColors[6],
            "Северо-Западный": this.linearColors[7],
            "Северо-Восточный": this.linearColors[8],
            "Южный": this.linearColors[9],
            "Восточный": this.linearColors[10],
            "Западный": this.linearColors[11]
        };
        this.timeofDay = {
            'Утро': this.linearColors[0],
            'День': this.linearColors[1],
            'Вечер': this.linearColors[2],
            'Ночь': this.linearColors[3]
        };
        this.weekDayColors = {
            'monday': this.linearColors[0],
            'tuesday': this.linearColors[1],
            'wednesday': this.linearColors[2],
            'thursday': this.linearColors[3],
            'friday': this.linearColors[4],
            'saturday': this.linearColors[5],
            'sunday': this.linearColors[6]
        };
        this.reportBlockCodes = {
            dispatch: 1,
            press: 2
        };
        this.reportBlockTypes = {
            dispatch: 'ДС',
            press: 'ПС'
        }
    }
    setReportBlockKeys(reportBlocks){
        this.reportBlockKeys = reportBlocks;
    }
    getReportBlockRequestUrl(){
        return `/api/report/${this.REPORT_URL}/${REPORT_BLOCK_KEY}?kind=${REPORT_DATA_KIND}`
    }
    getReportBlockTemplateId(){
        return `/api/report/${this.REPORT_URL}/${REPORT_BLOCK_KEY}?kind=${REPORT_DATA_KIND}`
    }
    addReportData(key, data){
        let isDataExist = typeof this.reportData[key] !=='undefined';
        if(!isDataExist){
            this.reportData = Object.assign({}, this.reportData,{
                [key]: data,
            });
        }
    }
    reset(){
        this.REPORT_URL = '';
        this.reportBlockKeys = [];
        this.reportData = {};
    }
}