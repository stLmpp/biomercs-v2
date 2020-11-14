import { HttpParams as OriginHttpParams } from '@angular/common/http';
import { isDate, isNil } from '@stlmpp/utils';

export class HttpParams extends OriginHttpParams {
  constructor(fromObject?: { [id: string]: any }, excludeNil?: boolean) {
    if (fromObject) {
      let entries = Object.entries(fromObject);
      if (excludeNil) {
        entries = entries.filter(([_, value]) => !isNil(value) && value !== '');
      }
      fromObject = entries.reduce((obj, [key, value]) => ({ ...obj, [key]: convertToString(value) }), {});
      super({ fromObject });
    } else {
      super();
    }
  }
}

const convertToString = (value: any) => (isDate(value) ? value.toISOString() : '' + value);
