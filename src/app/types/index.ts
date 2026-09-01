export interface ScryfallCard {
  id: string;
  name: string;
  type_line: string;
  set_name: string;
  image_uris?: { normal: string; large: string };
  card_faces?: Array<{ image_uris?: { normal: string; large: string } }>;
}

export interface CardEntry {
  card: ScryfallCard;
  qty: number;
}
