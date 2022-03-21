export interface IProduct {
    id: string;
    sku: string;
    price: string;
    enabled: string;
    weight: string;
    arrivalDate: string;
    name: string;
    description: string;
    created: string;
    vendor: string;
    vendorID: string;
    amount: string;
    participateSale: string;
    category: string;
    condition: string | null;
}

export interface CommonSelectProps {
    id: string | null | number;
    name: string;
  }