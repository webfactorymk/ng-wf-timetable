const DEFAULT_CELL_WIDTH = 32;

export class TimetableScope {
  startTime: Date;
  endTime: Date;
  cellWidth: number;

  startHour: number;
  endHour: number;

  constructor(startTime: Date, endTime: Date, cellWidth?: number) {
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
    this.cellWidth = cellWidth ? cellWidth : DEFAULT_CELL_WIDTH;
    this.startHour = Math.floor(this.startTime.getHours() + this.startTime.getMinutes() / 60);
    this.endHour = Math.ceil(this.endTime.getHours() + this.endTime.getMinutes() / 60);
  }

  public getTimetableWidth(): string {
    return ((this.cellWidth * 12) * this.getTimetableDurationInHours() + 1) + 'px';
  }

  public getTimetableDurationInHours(): number {
    return this.endHour >= this.startHour ?
      this.endHour - this.startHour : 24 + this.endHour - this.startHour;
  }

}
