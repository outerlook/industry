const checkStringExists = (str: string | undefined): string => {
  if (str === undefined) {
    throw new Error("Environment variable is undefined");
  }
  return str;
};

const PUBLIC_LINK_STORYBOOK = checkStringExists(
  import.meta.env.PUBLIC_LINK_STORYBOOK
);
const PUBLIC_LINK_GITHUB_PROJECT = checkStringExists(
  import.meta.env.PUBLIC_LINK_GITHUB_PROJECT
);

export { PUBLIC_LINK_GITHUB_PROJECT, PUBLIC_LINK_STORYBOOK };
