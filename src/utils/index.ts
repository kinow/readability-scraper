enum AlertType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
}

class Alert {
  private titleValue: string = '';
  private detailValue: string = '';
  private typeValue: AlertType = AlertType.PRIMARY;

  public get title(): string {
    return this.titleValue;
  }

  public set title(title) {
    this.titleValue = title;
  }

  public get detail(): string {
    return this.detailValue;
  }

  public set detail(detail) {
    this.detailValue = detail;
  }

  public get type(): AlertType {
    return this.typeValue;
  }

  public set type(type) {
    this.typeValue = type;
  }
}

export {
  Alert,
  AlertType,
};
