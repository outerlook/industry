import { AutoComplete, Button, Input, Layout, Space } from "antd";
import { DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";
import { useObservable } from "../../../../lib/react-rxjs/use-observable";
import { getMainSearchInputEffects } from "../../../../lib/global-shortcuts/main-search-input-effects";
import { SiteLogo } from "../SiteLogo";
import { ServicesDropdown } from "@/ui/components/common/Header/ServicosDropdownContent";
import {
  fuseForSearchItems,
  searchIndex$,
  SearchItem,
} from "@/lib/api/search-index/search-items";
import { getOrThrow } from "@/lib/io-ts/get-or-throw";
import React from "react";
import { pipe } from "effect";
import * as E from "fp-ts/Either";

const { Header } = Layout;

export const AppHeader = () => {
  return (
    <Layout className={"flex-none"}>
      <Header className="bg-gray-800 sticky h-12 fixed w-full">
        <div className="flex justify-between items-center h-full mx-2">
          <Space direction={"horizontal"} size={"middle"}>
            <a href={"/"} className="text-white text-2xl font-bold">
              <SiteLogo />
            </a>
            <ServicesButton></ServicesButton>
            <SearchBar />
          </Space>
          <div className="flex items-center">
            <div className="text-white text-xl font-bold">User</div>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

function ServicesButton() {
  return (
    <ServicesDropdown>
      <Button
        ghost
        icon={<DoubleRightOutlined />}
      >
        Services
      </Button>
    </ServicesDropdown>
  );
}

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

function SearchBar() {
  //  ( Icon INPUT [alt+/] )
  const { activate$, registerEl, shortcut } = getMainSearchInputEffects();
  const [value, setValue] = React.useState<string>("");

  useObservable(activate$);
  const eitherOptions = useObservable(searchIndex$);

  // more expensive to build index, so we memoize it
  const optionsFuse = React.useMemo(() => {
    if (!eitherOptions) {
      return null;
    }
    const allOptions = getOrThrow(eitherOptions);
    return fuseForSearchItems(allOptions);
  }, [eitherOptions]);

  const searchResults = React.useMemo(() => {
    // return optionsFuse?.search(value).map(
    //     (f) => f.item
    // ) ?? [];
    return pipe(
      optionsFuse,
      E.fromNullable("NULL_FUSE" as const),
      E.map((fuse) => fuse.search(value)),
      E.map((f) => f.map((i) => i.item)),
      E.map(renderGroup),
      E.getOrElseW(() => [] as never[])
    );
  }, [optionsFuse, value]);

  console.log({ searchResults });

  if (!eitherOptions) {
    return null;
  }

  return (
    <AutoComplete
      // options={[]}
      options={searchResults}
      value={value}
      onSelect={(value, option) => {
        const href = option?.item?.href;
        console.log({href})
        if (href) {
          window.location.href = href ?? "/";
        }
      }}
      dropdownClassName={"w-96 text-gray-900"}
      onChange={(value) => setValue(value)}
    >
      <Input
        prefix={<SearchOutlined />}
        placeholder="Try an to find an asset"
        ref={(r) => registerEl(r?.input)}
        suffix={<div className="text-gray-400 text-xs">{shortcut}</div>}
      />
    </AutoComplete>
  );
}
