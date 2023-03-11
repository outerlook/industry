import type { SearchItem} from "@/lib/search-service/search-item";
import {allSearchIndex$, fuseForSearchItems} from "@/lib/search-service/search-item";
import React from "react";
import {getMainSearchInputEffects} from "@/lib/global-shortcuts/main-search-input-effects";
import {useObservable} from "@/lib/react-rxjs/use-observable";
import {getOrThrow} from "@/lib/io-ts/get-or-throw";
import {pipe} from "effect";
import * as E from "fp-ts/Either";
import {AutoComplete, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const renderTitle = (title: string) => <span>{title}</span>;
const renderItem = (item: SearchItem) => ({
  value: item.label,
  item,
  label: <span>{item.label}</span>,
});
const groupByType = (items: SearchItem[]) => {
  const groups = new Map<string, SearchItem[]>();
  items.forEach((item) => {
    const group = groups.get(item.type) ?? [];
    group.push(item);
    groups.set(item.type, group);
  });
  return groups;
};
const renderGroup = (items: SearchItem[]) => {
  const entries = Array.from(groupByType(items).entries());
  return entries.map(([type, items]) => ({
    label: renderTitle(type),
    options: items.map(renderItem),
  }));
};

export function SearchBar() {
  const { activate$, registerEl, shortcut } = getMainSearchInputEffects();
  const [value, setValue] = React.useState<string>("");

  useObservable(activate$);
  const eitherOptions = useObservable(allSearchIndex$);

  // more expensive to build index, so we memoize it
  const optionsFuse = React.useMemo(() => {
    if (!eitherOptions) {
      return null;
    }
    const allOptions = getOrThrow(eitherOptions);
    return fuseForSearchItems(allOptions);
  }, [eitherOptions]);

  const searchResults = React.useMemo(() => {
    return pipe(
      optionsFuse,
      E.fromNullable("NULL_FUSE" as const),
      E.map((fuse) => fuse.search(value)),
      E.map((f) => f.map((i) => i.item)),
      E.map(renderGroup),
      E.getOrElseW(() => [] as never[])
    );
  }, [optionsFuse, value]);

  if (!eitherOptions) {
    return null;
  }

  return (
    <AutoComplete
      options={searchResults}
      value={value}
      onSelect={(value, option) => {
        const href = option?.item?.href;
        if (href) {
          window.location.href = href ?? "/";
        }
      }}
      onChange={(value) => setValue(value)}
    >
      <Input
        prefix={<SearchOutlined />}
        style={{ minWidth: 300 }}
        placeholder={'Try "Asset List" or "Fan Workorder"'}
        ref={(r) => registerEl(r?.input)}
        suffix={<div className="text-gray-400 text-xs">{shortcut}</div>}
      />
    </AutoComplete>
  );
}
