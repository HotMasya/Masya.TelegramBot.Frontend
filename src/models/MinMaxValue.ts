import { Room } from '.';

export interface MinMaxValue {
  id: number;
  minVal: number;
  maxVal: number;
}

export interface MinMaxValues {
  floors: MinMaxValue[];
  prices: MinMaxValue[];
  rooms: Room[];
}
