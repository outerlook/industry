import type { Observable } from 'rxjs';
import type * as E from 'fp-ts/Either';
import { pipe } from 'effect';
import * as OE from 'fp-ts-rxjs/ObservableEither';
import { toUnknownError } from '@domain/lib/errors/unknown-error';

export const fromEitherObservable = <A, Err>(o: Observable<E.Either<Err, A>>) =>
  pipe(
    OE.fromObservable(o),
    // unknown error -> Error to preserve this information
    OE.mapLeft(toUnknownError),
    OE.chainW(OE.fromEither)
  );
