import type { ScryfallCard, CardImage } from "../types";
import { SCRYFALL_API } from "../constants";

export function imageUrl(card: ScryfallCard, size: "normal" | "large" = "normal"): string {
  if (card.image_uris) return card.image_uris[size] ?? card.image_uris.normal;
  if (card.card_faces?.[0]?.image_uris)
    return card.card_faces[0].image_uris[size] ?? card.card_faces[0].image_uris.normal ?? "";
  return "";
}

export function toCardImage(card: ScryfallCard): CardImage {
  return {
    id: card.id,
    name: card.name,
    url: imageUrl(card, "large") || imageUrl(card),
  };
}

export async function searchCards(
  query: string,
  signal?: AbortSignal
): Promise<{ cards: ScryfallCard[]; notFound: boolean }> {
  const res = await fetch(
    `${SCRYFALL_API}?q=${encodeURIComponent(query)}&unique=cards&order=name`,
    { signal }
  );

  if (res.status === 404) return { cards: [], notFound: true };
  if (!res.ok) return { cards: [], notFound: false };

  const data = await res.json();
  if (!Array.isArray(data.data)) return { cards: [], notFound: false };

  return { cards: data.data.slice(0, 10), notFound: false };
}
