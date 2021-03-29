export class Constants {
  public static readonly EN_LANG_CODE: string = 'en';
  public static readonly ES_LANG_CODE: string = 'es';

  public static readonly EN_LANG_NAME: string = 'English';
  public static readonly ES_LANG_NAME: string = 'Español';
}

export class RequestContentType {
  public static Application_Text: string = "application/text"
  public static Application_JS: string = "application/javascript"
  public static Application_XML: string = "application/xml"
  public static Application_Json: string = "application/json"
}

export class ResponseContentType {
  public static Application_Vnd_MS_Excel: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  public static Application_Octet_Stream: string = "application/octet-stream";
  public static Blob: string = "blob";
}

export class ControllerNames { 
  public static MeasureType: string = "measuretype";
}
export class EndpointNames {
  public static MeasureType_GetAll: string = "GetAll";
}

export class TypeNames {
  public static MeasureType: string = "MeasureType";
}