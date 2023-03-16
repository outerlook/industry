import type {Lens} from 'monocle-ts';
import type { Observable} from 'rxjs';
import {forkJoin, map} from 'rxjs';
import {flow, pipe} from 'effect';
import * as A from 'fp-ts/Array';
import {bindTo} from 'fp-ts/Identity';
import {fromEitherObservable} from '@/lib/rxjs/fp-ts/from-either-observable';
import * as E from 'fp-ts/Either';
import type {customScalars} from '@/lib/io-ts/api-types';
import type * as t from 'io-ts';

export const entityFromId =
  <V, Er>(api: (arg: { id: string }) => Observable<E.Either<Er, V>>) =>
  (id: t.TypeOf<typeof customScalars.ID>) =>
    pipe(
      id,
      String, // number -> string
      bindTo('id'), // string -> {id: string}
      api,
      fromEitherObservable // Observable<Either<Er, V>> -> ObservableEither<Er, V>
    );

export const entityFromIdLens = <S, Er, V>(
  lens: Lens<S, t.TypeOf<typeof customScalars.ID>>,
  apiFunction: (arg: { id: string }) => Observable<E.Either<Er, V>>
) => flow(lens.get, entityFromId(apiFunction));
export const entitiesFromIdLens = <S, Er, V>(
  lens: Lens<S, t.TypeOf<typeof customScalars.ID>[]>,
  apiFunction: (arg: { id: string }) => Observable<E.Either<Er, V>>
) =>
  flow(
    lens.get,
    A.map(entityFromId(apiFunction)),
    a => forkJoin(a),
    map(A.sequence(E.Applicative)),
    fromEitherObservable
  );
