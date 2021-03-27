export class VersionInfoModel {
  constructor(version: string, versionComments_i18n_FieldName: string) {
    this.version = version;
    this.versionComments_i18n_FieldName = versionComments_i18n_FieldName;
  }

  public version: string;
  public versionComments: string;
  public versionComments_i18n_FieldName: string;
}