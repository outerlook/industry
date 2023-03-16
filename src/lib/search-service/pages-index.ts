import type {SearchItem} from "./search-item";
import {servicesList} from "@domain/lib/entities/services-list";
import {isString} from "lodash";

export const pagesIndex = [
  ...servicesList.map((item) => ({
    label: item.label,
    href: item.href,
    type: "Page List" as const,
    keywords: Object.values(item).filter(isString),
  })),
] satisfies Array<SearchItem>;
