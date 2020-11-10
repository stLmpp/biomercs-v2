export interface BaseModel {
  id: number;
  creationDate: Date;
  lastUpdatedDate?: Date;
  createdBy: number;
  lastUpdatedBy?: number;
}
