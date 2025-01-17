export interface Category {
  id: number;
  name: string;
  creationDate: Date;
  root: boolean;
  childrenId: number[];
  parentId: number;
}
