import { treeElementToTree } from '../generic-tree';
import * as A from "fp-ts/Array";
import { describe, expect, test } from 'vitest';
import * as Tr from 'fp-ts/Tree'
import {pipe} from "effect";

describe('treeElementToTree', () => {
  test('tree element to tree work', () => {
    const result = treeElementToTree('root')([
      { id: 'root', name: 'root', type: 'root' },
      { id: 'a', name: 'a', type: 'a', parent: 'root' },
      { id: 'b', name: 'b', type: 'b', parent: 'root' },
      { id: 'c', name: 'c', type: 'c', parent: 'a' },
      { id: 'd', name: 'd', type: 'd', parent: 'a' },
      { id: 'e', name: 'e', type: 'e', parent: 'b' },
      { id: 'f', name: 'f', type: 'f', parent: 'b' },
    ]);

    if (result._tag === 'Left') {
        throw new Error('should be right');
    }

    const idForest = pipe(
        result.right,
        a => a,
        A.map(Tr.map(i => i.id))
    )

    expect(Tr.drawForest(idForest)).toMatchInlineSnapshot(`
      "
      └─ root
         ├─ a
         │  ├─ c
         │  └─ d
         └─ b
            ├─ e
            └─ f"
    `);
  });
});
