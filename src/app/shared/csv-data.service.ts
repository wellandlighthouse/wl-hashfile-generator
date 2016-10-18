import { Injectable } from '@angular/core';

import { HasherService } from './hasher.service';

var papa = require('papaparse');

@Injectable()
export class CsvDataService {
  private _file: File;
  private _data: Array<any> = [];
  private _raw: string = '';
  private _errors: Array<any> = [];
  private _format: string = null;

  constructor(private hasherService: HasherService) { }

  setFile(file): void {
    this._file = file;
  }

  getFile(): File {
    return this._file;
  }

  getData(): Array<any> {
    return this._data;
  }

  setData(newData: Array<any>) {
    this._data = newData;
  }

  getRecordCount(): number {
    return this._data.length;
  }

  setRaw(content: string) {
    this._raw = content;

    // Reset formatted data
    this._data = [];
  }

  getRaw(): string {
    return this._raw;
  }

  setFormat(format: string) {
    this._format = format;
  }

  getFormat(): string {
    return this._format;
  }

  parse(headerRow: boolean, format?: string) {
    // format = format || 'csv';
    let parsed;

    // Reset data array
    this._data = [];

    // Reset error array
    this._errors = [];

    switch (this._format) {
      case 'csv':
      case 'tsv':
        parsed = papa.parse(this._raw, {
          header: headerRow
        });
        this._data = parsed.data;
        break;
      case 'newline':
        let tmp = this._raw.replace('\r\n', '\n').split('\n');

        // If for some reason we have header row, remove that from data
        if (headerRow) {
          tmp.shift();
        }

        for (let row of tmp) {
          this._data.push({ 0: row });
        }
        break;
      default:
        parsed = papa.parse(this._raw, {
          header: headerRow
        });
        if (parsed.errors.length) {
          for (let err of parsed.errors) {
            if (err.code == 'UndetectableDelimiter') {
              this._errors.push({ status: 'error', code: err.code });
            }
          }
        } else {
          this._data = parsed.data;
        }
        break;
    }
  }

  hasErrors() {
    return this._errors && this._errors.length;
  }

  convertToCSV(input: Array<any>) {
    return papa.unparse(input, { quotes: true });
  }

}
