export interface PlaceData {
    name: string;
    images: string[];
    address: string | null;
    category: PlaceCategories;
}

export enum PlaceCategories {
    FUN = 'fun',
    FOOD = 'food',
    SLEEP = 'sleep',
    TRANSPORTATION = 'transportation',
    INFO = 'info'
}
