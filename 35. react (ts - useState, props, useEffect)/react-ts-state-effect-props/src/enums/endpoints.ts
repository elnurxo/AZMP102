export enum API_ENDPOINTS {
  products = "/products",
}
export enum DeliveryStatus {
  pending,
  rejected,
  accepted,
  onCourier,
  delivered,
}
export type Status = "pending" | "rejected" | "accepted";
