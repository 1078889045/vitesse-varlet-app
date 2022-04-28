import { BasicPageParams, BasicFetchResult } from '~/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export type DemoParams = BasicPageParams;

export interface DemoListItem {
  ID: double;
  CreatedOn: string;
  Value: double;
  StandardValue: double;
  MaxValue: double;
  MinValue: double;
  Trend: double;
}

/**
 * @description: Request list return value
 */
export type DemoListGetResultModel = BasicFetchResult<DemoListItem>;
