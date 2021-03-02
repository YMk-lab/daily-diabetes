import * as moment from 'moment';

export class DateTimeFormatter {

  static formatDate(date: Date): string {
    return moment(date).format('DD.MM.YYYY');
  }

  static formTime(time?: string): string {
    return moment(time).format('HH:mm');
  }

}
