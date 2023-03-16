import {flow} from 'effect';
import Fuse from 'fuse.js';

export type SearchItem = {
  label: string;
  /** this will be used to index the search records */
  type: string;
  keywords?: string[];
  object?: any;
  href: string;
};

export const fuseForSearchItems = flow(
  (items: SearchItem[]) =>
    new Fuse(items, {
      keys: [
        { name: 'label', weight: 2 },
        'object',
        'type',
        {
          name: 'keywords',
          getFn: item =>
            // user types: "asset list" then should find the page list for assets
            [...(item.keywords ?? []), item.type, item.label].join(' '),
        },
      ],
      includeScore: true,
      threshold: 0.3,
      minMatchCharLength: 2,
      useExtendedSearch: true,
      shouldSort: true,
    })
);
