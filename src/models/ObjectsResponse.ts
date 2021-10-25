import { Category, DirectoryItem, RealtyObject } from '.';

export interface ObjectsReponse {
  objects: RealtyObject[];
  states: DirectoryItem[];
  wallMaterials: DirectoryItem[];
  streets: DirectoryItem[];
  districts: DirectoryItem[];
  categories: Category[];
}
