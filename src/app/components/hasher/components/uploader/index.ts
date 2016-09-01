import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
var papa = require('papaparse');
import {HasherService} from '../../services/hasher';
import {CsvData} from '../../services/csvdata';

@Component({
    selector: 'uploader',
    styles: [require('./style.scss').toString()],
    template: require('./template.html'),
    directives: [SELECT_DIRECTIVES],
    providers: [HasherService]
})
export class UploaderComponent {
    @Output() stepComplete = new EventEmitter();
    public dropzoneStylesVisible: boolean = false;
    private headerRow: boolean = true;
    private fileFormat: string = null;
    private file: File;
    public formats: Array<Object>;

    constructor(private csvData: CsvData, private hasherService: HasherService) {
        this.formats = [
            { id: 'csv', text: 'Comma-Delimited (CSV)' },
            { id: 'tsv', text: 'Tab-Delimted' },
            { id: 'newline', text: 'One Column, One Record per Line' },
        ];
    }

    showDropzoneStyles() {
        this.dropzoneStylesVisible = true;
        return false;
    }

    hideDropzoneStyles() {
        this.dropzoneStylesVisible = false;
        return false;
    }

    onChange($event: any): void {
        // Reset file-specific variables
        this.fileFormat = null;
        this.headerRow = true;

        let fileList = $event.srcElement.files;
        this.handleFiles(fileList);
    }

    handleDrop(e) {
        console.log('dropped!', e);
        e.preventDefault();
        let files: File = e.dataTransfer.files;
        this.handleFiles(files);

        this.hideDropzoneStyles();


        return false;
    }

    handleFiles(files: File) {
        this.file = files[0];

        let reader = new FileReader();
        reader.onload = ((evt) => {
            this.csvData.setRaw(evt.target.result);
            this.csvData.setFile(this.file);
            this.parseFile();
        });
        reader.readAsText(this.file);
    }

    parseFile() {
        let format = this.fileFormat;
        if (!format) {
            switch (this.file.type) {
                case 'text/csv':
                    format = 'csv';
                    break;
                case 'text/plain':
                    break;
            }
        }

        this.csvData.setFormat(format);
        this.csvData.parse(this.headerRow, format);
    }

    setFormat(value: any): void {
        this.fileFormat = value.id;

        // Very unlikely that we have a header row in a file that is one record per line
        if (this.fileFormat == 'newline') {
            this.headerRow = false;
        }
    }

    formatChange() {
        // Very unlikely that we have a header row in a file that is one record per line
        if (this.fileFormat == 'newline') {
            this.headerRow = false;
        }
    }

    parseErrors() {
        return this.csvData.hasErrors();
    }

    recordCount() {
        return this.csvData.getRecordCount();
    }

    removeFile() {
        this.file = null;
        this.fileFormat = null;
        this.headerRow = true;
    }

    continue() {
        this.stepComplete.emit(true);
    }
}
