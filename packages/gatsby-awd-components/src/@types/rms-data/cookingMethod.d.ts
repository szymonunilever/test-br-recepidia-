declare namespace RMSData {
  export interface CookingMethodGroup {
    title: string;
    list: CookingMethod[];
  }

  export interface CookingMethod {
    position: number;
    description: string;
  }
}
