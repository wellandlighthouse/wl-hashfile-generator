/* beautify ignore:start */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CsvData} from '../../services/csvdata';
import {HasherService} from '../../services/hasher';
import * as _ from 'lodash';

var fileSaver = require('file-saver');
/* beautify ignore:end */

export interface Field {
    name: string
}

@Component({
    selector: 'field-mapper',
    styles: [require('./style.scss').toString()],
    template: require('./template.html'),
    providers: [HasherService]
})
export class FieldMapperComponent {
    @Output() stepComplete = new EventEmitter();
    private fields: Array<Field> = [];
    private recordCount: number;
    private sample: {};

    constructor(private csvData: CsvData, private hasherService: HasherService) { }

    ngOnInit() {
        this.recordCount = this.csvData.getData().length;
        if (this.recordCount > 0) {
            this.sample = this.csvData.getData()[0];
            _.keys(this.sample).forEach((f) => {
                this.fields.push({
                    name: f,
                });
            });
        }
    }

    getFieldSample(field) {
        // In lieu of showing actual hash, we'll just do a mask
        if (field.encrypt) {
            return Array(25).join('#');
        }
        return this.sample[field.name];
    }

    hasSelectedFields() {
        return _.find(this.fields, {include: true});
    }

    save() {
        let newData = this.filterData();
        let newCsv = this.csvData.convertToCSV(newData);

        // Check to see if we have access to Electron functionality
        if (typeof electron !== 'undefined') {
            let saveDialog = electron.dialog;
            let fileOpts = {
                defaultPath: this.csvData.getFile().name + ' (hashed).csv',
                filters: [
                    { name: 'Comma-Delimited', extensions: ['csv', 'txt'] },
                ]
            };
            saveDialog.showSaveDialog(fileOpts, (fileName) => {
                if (fileName === undefined) {
                    console.log("You didn't save the file");
                    return;
                }
                // fileName is a string that contains the path and filename created in the save file dialog.
                fs.writeFile(fileName, newCsv, (err) => {
                    if (err) {
                        alert("An error ocurred creating the file " + err.message)
                    } else {
                        alert("The file has been succesfully saved");
                        this.stepComplete.emit(true);
                    }
                });
            });
        } else {
            // No Electron, use FileSaver.js
            let blob = new Blob([newCsv], { type: 'text/csv' });
            fileSaver.saveAs(blob, this.csvData.getFile().name + ' (hashed)');
            this.stepComplete.emit(true);
        }
    }

    private filterData(): Array<any> {
        let newData = _.cloneDeep(this.csvData.getData());
        let includedFields = _.filter(this.fields, { include: true });
        let fieldNames: Array<any> = _.map(includedFields, 'name');

        // Filter to included fields
        newData = _.map(newData, (o) => {
            return _.pick(o, fieldNames);
        });

        // Hash the selected fields
        let encryptedFields: Array<any> = _.map(_.filter(includedFields, { encrypt: true }), 'name');
        newData = this.hasherService.hashField(newData, encryptedFields);

        return newData;
    }
}