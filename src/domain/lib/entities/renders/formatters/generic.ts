export type FormatterRecord<T> = (t: T) => {
  label: string;
  value: string;
};

export type FormatterRecords<T> = {
  [k: string]: FormatterRecord<T>;
}; // let's create a generic structure for the same things

export const getAttributeRecords =
  <T, F extends FormatterRecords<T>>(formatter: F & FormatterRecords<T>) =>
  <Key extends keyof F>(keys: ReadonlyArray<Key>) =>
  (entity: T) =>
    keys.map((key) => formatter[key]!(entity)); // todo: fix the ! here
