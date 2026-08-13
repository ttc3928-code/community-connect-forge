import {
  useLocation as useTanStackLocation,
  useNavigate as useTanStackNavigate,
} from "@tanstack/react-router";
import { forwardRef, useEffect, type AnchorHTMLAttributes, type ReactNode } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => (
  <a ref={ref} href={to} {...props} />
));
Link.displayName = "Link";

export function useNavigate() {
  const navigate = useTanStackNavigate();
  return (to: string) => navigate({ to });
}

export function useLocation() {
  return useTanStackLocation();
}

export function useSearchParams(): [URLSearchParams] {
  const location = useTanStackLocation();
  return [new URLSearchParams(location.searchStr)];
}

export type NavLinkProps = LinkProps;

export const NavLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const location = useTanStackLocation();
  return <a ref={ref} href={to} aria-current={location.pathname === to ? "page" : undefined} {...props} />;
});
NavLink.displayName = "NavLink";

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const navigate = useTanStackNavigate();
  useEffect(() => {
    navigate({ to, replace });
  }, [to, replace, navigate]);
  return null;
}
