import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "../../lib/utils";

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: "primary" | "secondary" | "destructive" | "quiet";
}

let button = tv({
  extend: focusRing,
  base: `
    relative inline-flex items-center justify-center gap-2
    border box-border px-3.5 h-9 rounded-lg font-sans text-sm
    transition cursor-default
  `,
  variants: {
    variant: {
      primary: `
        bg-[var(--theme-color-bg-fill-brand-main)]  
        hover:bg-[var(--theme-color-bg-fill-brand-strong)] 
        text-[var(--theme-color-fg-white)]
      `,
      secondary: `
        bg-[var(--theme-color-bg-fill-subtle)]
        hover:bg-[var(--theme-color-bg-fill-light)]
        text-[var(--theme-color-fg-main)]
        border-[var(--theme-color-border-subtle)]
      `,
      destructive: `
        bg-[var(--theme-color-bg-fill-error-main)]
        hover:bg-[var(--theme-color-bg-fill-error-strong)]
        text-[var(--theme-color-fg-white)]
      `,
      quiet: `
        bg-transparent
        hover:bg-[var(--theme-color-bg-fill-subtle)]
        text-[var(--theme-color-fg-main)]
        border-transparent
      `,
    },
    isDisabled: {
      true: `
        bg-[var(--theme-color-bg-fill-disabled)]
        text-[var(--theme-color-fg-disabled)]
        border-transparent
      `,
    },
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    >
      {composeRenderProps(props.children, (children, { isPending }) => (
        <>
          {children}
          {isPending && (
            <span
              aria-hidden
              className="flex absolute inset-0 justify-center items-center"
            >
              <svg
                className="w-4 h-4 text-white animate-spin"
                viewBox="0 0 24 24"
                stroke={
                  props.variant === "secondary" || props.variant === "quiet"
                    ? "light-dark(black, white)"
                    : "white"
                }
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-25"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="60 140"
                  strokeDashoffset="0"
                />
              </svg>
            </span>
          )}
        </>
      ))}
    </RACButton>
  );
}
