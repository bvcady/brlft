export interface Guest {
  name: string;
  email: string;
  type: GuestType;
  timestamp?: string;
  people?: Person[];
}

export type GuestType = "borrel" | "dag" | "niet";

export interface Person {
  id: string;
  name: string;
  open?: boolean;
  type: GuestType;
  diet?: string;
  know?: string;
  help?: string;
}
