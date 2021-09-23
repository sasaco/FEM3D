import { NgModule } from "@angular/core";

@NgModule({
  imports: [],
  exports: [],
})
export class DataHelperModule {
  constructor() {}
  
  /// 文字列string を数値に変換する
  public toNumber(num: any): number {

    let result: number = null;
    try {
      if(num === null) return null;
      if(num === undefined) return null;

      const tmp: string = num.toString().trim();
      if (tmp.length > 0) {
        result = ((n: number) => isNaN(n) ? null : n)(+tmp);
      }
    } catch {
      result = null;
    }
    return result;
  }

}
