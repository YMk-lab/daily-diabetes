export class DateTimeFormatter {

  static formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return hours + ':' + minutes;
  }

}
