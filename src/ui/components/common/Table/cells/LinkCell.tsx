type LinkCellProps = {
  href: string;
};
export const LinkCell = (props: React.PropsWithChildren<LinkCellProps>) => {
  const { children, href } = props;

  return <a href={href}>{children}</a>;
};
