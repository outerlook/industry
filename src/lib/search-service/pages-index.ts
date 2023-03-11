import type { SearchItem } from "@/lib/search-service/search-item";
import { servicesList } from "@/ui/components/common/servicos/services-list";

export const pagesIndex = [
  ...servicesList.map((item) => ({
    label: item.label,
    href: item.href,
    type: "Page List" as const,
  })),
] satisfies Array<SearchItem>;
