export class WidgetModel {
  constructor(
    public primaryCcy: string,
    public secondaryCcy: string,
    public buyRate: number,
    public sellRate: number,
    public notional: number | null,
    public tenor: string,
    public pickCCYState: boolean
  ) {}
}

export interface FxRatesResponse {
  buyRate: number;
  sellRate: number;
}