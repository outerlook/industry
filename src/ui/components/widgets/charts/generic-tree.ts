import type { Element } from './company-tree-builder';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import { pipe } from 'effect';
import * as I from 'fp-ts/Identity';
import { make, Tree } from 'fp-ts/Tree';
import * as E from 'fp-ts/Either';
import { traceWithValue } from 'fp-ts-std/Debug';
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import {groupBy} from "@lib/utils/group-by";

const fromGroupToTree =
  (groupedByParent: Record<string, Element[]>) =>
  (rootElement: Element): Tree<Element> => {
    const children = pipe(
      rootElement,
      ({ id }) => O.fromNullable(groupedByParent[id]),
      traceWithValue('here'),
      O.map(A.map(fromGroupToTree(groupedByParent))),
      O.getOrElse(() => [] as Tree<Element>[])
    );
    return make(rootElement, children);
  };
export const treeElementToTree =
  (rootType: string) => (as: NonEmptyArray<Element>) =>
    pipe(
      as,
      groupBy('parent'),
      I.bindTo('groupedByParent'),
      I.bind('groupedByType', () => pipe(as, groupBy('type'))),
      I.bind('rootElements', ({ groupedByType }) =>
        // E.fromNullable({ type: 'NO_SUCH_ROOTTYPE' as const, data: {rootType} })(
        E.fromNullable({ type: 'NO_SUCH_ROOTTYPE' as const, data: {rootType} })(
          groupedByType[rootType]
        )
      ),
      I.map(({ rootElements, groupedByParent }) =>
        pipe(rootElements, E.map(A.map(fromGroupToTree(groupedByParent))))
      )
    );
