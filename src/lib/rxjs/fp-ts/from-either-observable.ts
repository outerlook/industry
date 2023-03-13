import {Observable} from "rxjs";
import * as E from "fp-ts/Either";
import {pipe} from "effect";
import * as OE from "fp-ts-rxjs/ObservableEither";
import {toUnknownError} from "@/lib/errors/unknown-error";

export const fromEitherObservable = <A, Err>(o: Observable<E.Either<Err, A>>) =>
    pipe(
        OE.fromObservable(o),
        // unknown error -> Error to preserve this information
        OE.mapLeft(toUnknownError),
        OE.chainW(OE.fromEither)
    );