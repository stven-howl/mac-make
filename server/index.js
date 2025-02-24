import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Link, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, redirect, data } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createElement } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown, ChevronRight, Check, Circle, BellIcon, MessageCircleIcon, BarChart3Icon, UserIcon, SettingsIcon, LogOutIcon, EyeIcon, ChevronUpIcon, DotIcon, HeartIcon, LockIcon } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { DateTime } from "luxon";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  NavigationMenuPrimitive.Root,
  {
    ref,
    className: cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(NavigationMenuViewport, {})
    ]
  }
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;
const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  NavigationMenuPrimitive.List,
  {
    ref,
    className: cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    ),
    ...props
  }
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);
const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  NavigationMenuPrimitive.Trigger,
  {
    ref,
    className: cn(navigationMenuTriggerStyle(), "group", className),
    ...props,
    children: [
      children,
      " ",
      /* @__PURE__ */ jsx(
        ChevronDown,
        {
          className: "relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180",
          "aria-hidden": "true"
        }
      )
    ]
  }
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  NavigationMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    ),
    ...props
  }
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;
const NavigationMenuLink = NavigationMenuPrimitive.Link;
const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: cn("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ jsx(
  NavigationMenuPrimitive.Viewport,
  {
    className: cn(
      "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
      className
    ),
    ref,
    ...props
  }
) }));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;
const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  NavigationMenuPrimitive.Indicator,
  {
    ref,
    className: cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
  }
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "leaderboards",
        description: "See the leaderboards",
        to: "/products/leaderboards"
      },
      {
        name: "Categories",
        description: "See the categories",
        to: "/products/categories"
      },
      {
        name: "Search",
        description: "Search for a product",
        to: "/products/search"
      },
      {
        name: "Submit",
        description: "Submit a product to our community",
        to: "/products/submit"
      },
      {
        name: "Promote",
        description: "Promote a product",
        to: "/products/promote"
      }
    ]
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "Find a remote job in our community",
        to: "/jobs?location=remote"
      },
      {
        name: "Full-time   Jobs",
        description: "Find a full-time job in our community",
        to: "/jobs?type=full-time"
      },
      {
        name: "Freelance Jobs",
        description: "Find a freelance job in our community",
        to: "/jobs?type=freelance"
      },
      {
        name: "Internships",
        description: "Find an internship in our community",
        to: "/jobs?type=internship"
      },
      {
        name: "Submit",
        description: "Submit a job to our community",
        to: "/jobs/submit"
      }
    ]
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "See all posts in our community",
        to: "/community"
      },
      {
        name: "Top Posts",
        description: "See the top posts in our community",
        to: "/community?sort=top"
      },
      {
        name: "New Posts",
        description: "See the new posts in our community",
        to: "/community?sort=new"
      },
      {
        name: "Create a Post",
        description: "Create a post to our community",
        to: "/community/create"
      }
    ]
  },
  {
    name: "IdeasGPT",
    to: "/ideas"
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "See all teams in our community",
        to: "/teams"
      },
      {
        name: "Create a Team",
        description: "Create a team to our community",
        to: "/teams/create"
      }
    ]
  }
];
function Navigation({
  isLoggedIn,
  hasNotification,
  hasMessage
}) {
  return /* @__PURE__ */ jsxs("nav", { className: "flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-lg font-bold tracking-tighter", children: "KeyStone" }),
      /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-6 mx-4" }),
      /* @__PURE__ */ jsx(NavigationMenu, { children: /* @__PURE__ */ jsx(NavigationMenuList, { children: menus.map((menu) => {
        var _a;
        return /* @__PURE__ */ jsx(NavigationMenuItem, { children: menu.items ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Link, { to: menu.to, children: /* @__PURE__ */ jsx(NavigationMenuTrigger, { className: "bg-transparent text-foreground", children: menu.name }) }),
          /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsx("ul", { className: "grid w-[600px] grid-cols-2 gap-3 p-6 font-light ", children: (_a = menu.items) == null ? void 0 : _a.map((item) => /* @__PURE__ */ jsx(
            NavigationMenuItem,
            {
              className: cn([
                "select-none rounded-md transition-colors hover:bg-accent focus:bg-accent",
                item.to === "/products/promote" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                item.to === "/jobs/submit" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20"
              ]),
              children: /* @__PURE__ */ jsx(NavigationMenuLink, { asChild: true, children: /* @__PURE__ */ jsxs(
                Link,
                {
                  className: "p-3 space-y-1 block leading-none no-underline outline-none",
                  to: item.to,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium leading-none", children: item.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm leading-snug text-muted-foreground", children: item.description })
                  ]
                }
              ) })
            },
            item.name
          )) }) })
        ] }) : /* @__PURE__ */ jsx(
          Link,
          {
            to: menu.to,
            className: navigationMenuTriggerStyle({
              className: "bg-transparent"
            }),
            children: /* @__PURE__ */ jsx("span", { children: menu.name })
          }
        ) }, menu.name);
      }) }) })
    ] }),
    isLoggedIn ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", asChild: true, className: "relative", children: /* @__PURE__ */ jsxs(Link, { to: "/my/notifications", children: [
        /* @__PURE__ */ jsx(BellIcon, { className: "w-4 h-4" }),
        hasNotification && /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" })
      ] }) }),
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", asChild: true, className: "relative", children: /* @__PURE__ */ jsxs(Link, { to: "/my/messages", children: [
        /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
        hasMessage && /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" })
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Avatar, { children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: "https://github.com/shadcn.png" }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: "N" })
        ] }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", children: [
          /* @__PURE__ */ jsxs(DropdownMenuLabel, { className: "flex flex-col justify-center items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "John Doe" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "@username" })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/dashboard", children: [
              /* @__PURE__ */ jsx(BarChart3Icon, { className: "w-4 h-4 mr-2" }),
              "Dashboard"
            ] }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/profile", children: [
              /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4 mr-2" }),
              "Profile"
            ] }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/settings", children: [
              /* @__PURE__ */ jsx(SettingsIcon, { className: "w-4 h-4 mr-2" }),
              "Settings"
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/logout", children: [
            /* @__PURE__ */ jsx(LogOutIcon, { className: "w-4 h-4 mr-2" }),
            "Logout"
          ] }) })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Login" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: "Join" }) })
    ] })
  ] });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "dark",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("main", {
        className: "px-5 lg:px-20",
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Navigation, {
      isLoggedIn: true,
      hasNotification: true,
      hasMessage: true
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function ProductCard({
  id,
  name,
  description,
  commentsCount,
  viewsCount,
  votesCount
}) {
  return /* @__PURE__ */ jsx(Link, { to: `/products/${id}`, children: /* @__PURE__ */ jsxs(Card, { className: "w-full h-full flex items-center justify-between bg-transparent hover:bg-card/50 transition-colors", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold leading-none tracking-tight", children: name }),
      /* @__PURE__ */ jsx(CardDescription, { className: "font-light text-muted-foreground", children: description }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-px text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: commentsCount })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-px text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: viewsCount })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "py-0", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "flex flex-col h-14", children: [
      /* @__PURE__ */ jsx(ChevronUpIcon, { className: "w-4 h-4 shrink-0" }),
      /* @__PURE__ */ jsx("span", { children: votesCount })
    ] }) })
  ] }) });
}
function PostCard({
  id,
  title,
  author,
  authorAvatar,
  category,
  createdAt
}) {
  return /* @__PURE__ */ jsx(Link, { to: `/community/${id}`, children: /* @__PURE__ */ jsxs(Card, { className: "bg-transparent hover:bg-card/50 transition-colors", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center gap-4", children: [
      /* @__PURE__ */ jsxs(Avatar, { className: "size-14", children: [
        /* @__PURE__ */ jsx(AvatarImage, { src: authorAvatar }),
        /* @__PURE__ */ jsx(AvatarFallback, { children: author[0].toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: title }),
        /* @__PURE__ */ jsxs("div", { className: "flex text-sm leading-tight text-muted-foreground gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: author }),
          /* @__PURE__ */ jsx(DotIcon, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: category }),
          /* @__PURE__ */ jsx(DotIcon, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: createdAt })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { variant: "link", className: "text-xs font-light", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: `/community/${id}`, children: "Reply →" }) }) })
  ] }) });
}
function IdeaCard({
  id,
  title,
  viewCount,
  likeCount,
  createdAt,
  claimed
}) {
  return /* @__PURE__ */ jsx(Card, { className: "bg-transparent hover:bg-card/50 transition-colors", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
    /* @__PURE__ */ jsx(Link, { to: `/ideas/${id}`, children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: /* @__PURE__ */ jsx(
      "span",
      {
        className: cn(
          claimed ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground" : ""
        ),
        children: title
      }
    ) }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-2 text-sm px-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: viewCount })
      ] }),
      /* @__PURE__ */ jsx(DotIcon, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: createdAt })
    ] }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end space-x-2 px-0", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "text-sm font-light", children: [
        /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: likeCount })
      ] }),
      !claimed ? /* @__PURE__ */ jsx(Button, { variant: "default", className: "text-sm font-light", children: /* @__PURE__ */ jsx(Link, { to: `/ideas/${id}/claim`, children: "Claim Idea now →" }) }) : /* @__PURE__ */ jsxs(Button, { variant: "outline", disabled: true, className: "text-sm font-light", children: [
        /* @__PURE__ */ jsx(LockIcon, { className: "w-4 h-4" }),
        "Claimed"
      ] })
    ] })
  ] }) });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function JobCard({
  id,
  company,
  companyLogoUrl,
  title,
  salary,
  location,
  createdAt,
  type,
  positionLocation
}) {
  return /* @__PURE__ */ jsx(Link, { to: `/jobs/${id}`, children: /* @__PURE__ */ jsxs(Card, { className: "bg-transparent hover:bg-card/50 transition-colors", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: companyLogoUrl,
            alt: `${company} Logo`,
            className: "size-10 rounded-full"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-accent-foreground", children: company }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: createdAt })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CardTitle, { children: title })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx(Badge, { variant: "outline", children: type }),
      /* @__PURE__ */ jsx(Badge, { variant: "outline", children: positionLocation })
    ] }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-between gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: salary }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: location })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", children: "Apply now" })
    ] })
  ] }) });
}
function TeamCard({
  id,
  leaderName,
  leaderAvatar,
  projectTitle,
  roles
}) {
  return /* @__PURE__ */ jsx(Link, { to: `/teams/${id}`, children: /* @__PURE__ */ jsxs(Card, { className: "bg-transparent hover:bg-card/50 transition-colors", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "flex flex-row items-center gap-4", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-base leading-loose", children: [
      /* @__PURE__ */ jsxs(
        Badge,
        {
          variant: "secondary",
          className: "inline-flex shadow-sm items-center gap-2 text-base",
          children: [
            /* @__PURE__ */ jsx("span", { children: leaderName }),
            /* @__PURE__ */ jsxs(Avatar, { className: "size-5", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: leaderAvatar }),
              /* @__PURE__ */ jsx(AvatarFallback, { children: leaderName[0].toUpperCase() })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "is looking for" }),
      roles.map((role, index) => /* @__PURE__ */ jsx(Badge, { variant: "default", className: "text-base", children: role }, index)),
      /* @__PURE__ */ jsx("span", { children: " to build" }),
      /* @__PURE__ */ jsxs("span", { children: [
        " ",
        projectTitle
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CardFooter, { className: "justify-end", children: /* @__PURE__ */ jsx(Button, { variant: "link", children: "Join team →" }) })
  ] }) });
}
const meta$a = () => {
  return [{
    title: "Home | KeyStone"
  }, {
    name: "description",
    content: "Welcome to KeyStone"
  }];
};
const homePage = withComponentProps(function HomePage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "container px-20 space-y-20",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "Today's Products"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The best products for today"
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          className: "text-xl font-light",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/products/leaderboards",
            children: "Explore all products →"
          })
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: `productId-${index}`,
        name: `Product Name ${index}`,
        description: `Product Description ${index}`,
        commentsCount: 10,
        viewsCount: 10,
        votesCount: 120
      }, index))]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "Latest discussions"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The latest discussions"
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          className: "text-xl font-light",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/products/leaderboards",
            children: "Explore all discussions →"
          })
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(PostCard, {
        id: `postId-${index}`,
        title: `What is the best productivity app?`,
        author: "Nico",
        authorAvatar: "https://github.com/shadcn.png",
        category: "Productivity",
        createdAt: "12 hours ago"
      }, index))]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "IdeasGPT"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "Find Ideas for your next project"
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          className: "text-xl font-light",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/products/leaderboards",
            children: "Explore all ideas →"
          })
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(IdeaCard, {
        id: "ideaId",
        title: "A startup that creates an AI-powered productivity app, delivering customized recommendations and tracking of progress using a mobile app",
        viewCount: 123,
        likeCount: 123,
        createdAt: "12 hours ago",
        claimed: index % 2 !== 0
      }, index))]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-4 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "Latest jobs"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "Find the latest jobs"
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          className: "text-xl font-light",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/products/leaderboards",
            children: "Explore all jobs →"
          })
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(JobCard, {
        id: "jobId",
        company: "Tesla",
        companyLogoUrl: "https://github.com/teslamotors.png",
        title: "Software Engineer",
        salary: "$100,000 - $120,000",
        location: "San Francisco, CA",
        createdAt: "12 hours ago",
        type: "Full-time",
        positionLocation: "Remote"
      }, index))]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-4 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "Find a team mate"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "Join a team to build your next big idea"
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          className: "text-xl font-light",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/products/leaderboards",
            children: "Explore all teams →"
          })
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(TeamCard, {
        id: "teamId",
        leaderName: "Nico",
        leaderAvatar: "https://github.com/shadcn.png",
        projectTitle: "social media app",
        roles: ["React Developer", "Backend Developer", "Product Manager"]
      }, index))]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: homePage,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
function loader$a() {
  return redirect("/products/leaderboards");
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
function PageHeader({ title, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col py-20 items-center justify-center rounded-md bg-gradient-to-t from-background to-primary/10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-light text-foreground", children: description })
  ] });
}
const meta$9 = () => {
  return [{
    title: "Leaderboard | Wemake"
  }, {
    name: "description",
    content: "Top products leaderboard"
  }];
};
const leaderboardPage = withComponentProps(function LeaderboardPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx(PageHeader, {
      title: "Leaderboards",
      description: "The most popular products on Wemake"
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold leading-tight tracking-tight",
          children: "Daily Leaderboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The most popular products by day"
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: `productId-${index}`,
        name: `Product Name ${index}`,
        description: `Product Description ${index}`,
        commentsCount: 10,
        viewsCount: 10,
        votesCount: 120
      }, index)), /* @__PURE__ */ jsx(Button, {
        variant: "link",
        className: "text-xl font-light self-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/products/leaderboards/daily",
          children: "Explore all products →"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold leading-tight tracking-tight",
          children: "Weekly Leaderboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The most popular products by week"
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: `productId-${index}`,
        name: `Product Name ${index}`,
        description: `Product Description ${index}`,
        commentsCount: 10,
        viewsCount: 10,
        votesCount: 120
      }, index)), /* @__PURE__ */ jsx(Button, {
        variant: "link",
        className: "text-xl font-light self-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/products/leaderboards/weekly",
          children: "Explore all products →"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold leading-tight tracking-tight",
          children: "Monthly Leaderboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The most popular products by month"
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: `productId-${index}`,
        name: `Product Name ${index}`,
        description: `Product Description ${index}`,
        commentsCount: 10,
        viewsCount: 10,
        votesCount: 120
      }, index)), /* @__PURE__ */ jsx(Button, {
        variant: "link",
        className: "text-xl font-light self-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/products/leaderboards/monthly",
          children: "Explore all products →"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold leading-tight tracking-tight",
          children: "Yearly Leaderboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The most popular products by year"
        })]
      }), Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: `productId-${index}`,
        name: `Product Name ${index}`,
        description: `Product Description ${index}`,
        commentsCount: 10,
        viewsCount: 10,
        votesCount: 120
      }, index)), /* @__PURE__ */ jsx(Button, {
        variant: "link",
        className: "text-xl font-light self-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/products/leaderboards/yearly",
          children: "Explore all products →"
        })
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: leaderboardPage,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
const meta$8 = () => {
  return [{
    title: "Daily Leaderboard | Product Hunt Clone"
  }, {
    name: "description",
    content: "Top products of the day"
  }];
};
function loader$9({
  request,
  params
}) {
  const {
    year,
    month,
    day
  } = params;
  return {
    date: {
      year,
      month,
      day
    },
    products: []
  };
}
const dailyLeaderboardPage = withComponentProps(function DailyLeaderboardPage({
  loaderData
}) {
  const {
    date,
    products
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "container mx-auto py-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: "Daily Leaderboard"
    }), /* @__PURE__ */ jsxs("p", {
      className: "text-gray-600",
      children: [date.year, "/", date.month, "/", date.day]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dailyLeaderboardPage,
  loader: loader$9,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
const meta$7 = () => {
  return [{
    title: "Weekly Leaderboard | Product Hunt Clone"
  }, {
    name: "description",
    content: "Top products of the week"
  }];
};
function loader$8({
  request,
  params
}) {
  const {
    year,
    week
  } = params;
  return {
    date: {
      year,
      week
    },
    products: []
  };
}
const weeklyLeaderboardPage = withComponentProps(function WeeklyLeaderboardPage({
  loaderData
}) {
  const {
    date,
    products
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "container mx-auto py-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: "Weekly Leaderboard"
    }), /* @__PURE__ */ jsxs("p", {
      className: "text-gray-600",
      children: ["Year ", date.year, ", Week ", date.week]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: weeklyLeaderboardPage,
  loader: loader$8,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
const meta$6 = () => {
  return [{
    title: "Monthly Leaderboard | Product Hunt Clone"
  }, {
    name: "description",
    content: "Top products of the month"
  }];
};
function loader$7({
  request,
  params
}) {
  const {
    year,
    month
  } = params;
  return {
    date: {
      year,
      month
    },
    products: []
  };
}
const monthlyLeaderboardPage = withComponentProps(function MonthlyLeaderboardPage({
  loaderData
}) {
  const {
    date,
    products
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "container mx-auto py-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: "Monthly Leaderboard"
    }), /* @__PURE__ */ jsxs("p", {
      className: "text-gray-600",
      children: [date.year, "/", date.month]
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: monthlyLeaderboardPage,
  loader: loader$7,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const meta$5 = () => {
  return [{
    title: "Yearly Leaderboard | Product Hunt Clone"
  }, {
    name: "description",
    content: "Top products of the year"
  }];
};
function loader$6({
  request,
  params
}) {
  const {
    year
  } = params;
  return {
    year,
    products: []
  };
}
const yearlyLeaderboardPage = withComponentProps(function YearlyLeaderboardPage({
  loaderData
}) {
  const {
    year,
    products
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "container mx-auto py-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: "Yearly Leaderboard"
    }), /* @__PURE__ */ jsxs("p", {
      className: "text-gray-600",
      children: ["Year ", year]
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yearlyLeaderboardPage,
  loader: loader$6,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function loader$5({
  params
}) {
  const {
    period
  } = params;
  let url;
  const today = DateTime.now().setZone("Asia/Seoul");
  if (period === "daily") {
    url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === "weekly") {
    url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === "monthly") {
    url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  } else if (period === "yearly") {
    url = `/products/leaderboards/yearly/${today.year}`;
  } else {
    return data(null, {
      status: 400
    });
  }
  return redirect(url);
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const meta$4 = () => {
  return [{
    title: "Categories | Product Hunt Clone"
  }, {
    name: "description",
    content: "Browse products by category"
  }];
};
function loader$4({
  request
}) {
  return {
    categories: []
  };
}
const categoriesPage = withComponentProps(function CategoriesPage({
  loaderData
}) {
  const {
    categories
  } = loaderData;
  return /* @__PURE__ */ jsx("div", {
    className: "container mx-auto py-8",
    children: /* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: "Categories"
    })
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: categoriesPage,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const meta$3 = () => {
  return [{
    title: "Category | Product Hunt Clone"
  }, {
    name: "description",
    content: "Products in this category"
  }];
};
function loader$3({
  request,
  params
}) {
  const {
    category
  } = params;
  return {
    category,
    products: []
  };
}
const categoryPage = withComponentProps(function CategoryPage({
  loaderData
}) {
  const {
    category,
    products
  } = loaderData;
  return /* @__PURE__ */ jsx("div", {
    className: "container mx-auto py-8",
    children: /* @__PURE__ */ jsxs("h1", {
      className: "text-3xl font-bold",
      children: ["Category: ", category]
    })
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: categoryPage,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [{
    title: "Search Products | Product Hunt Clone"
  }, {
    name: "description",
    content: "Search for products"
  }];
};
function loader$2({
  request
}) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  return {
    query,
    searchResults: []
  };
}
const searchPage = withComponentProps(function SearchPage({
  loaderData
}) {
  const {
    query,
    searchResults
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "container mx-auto py-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: "Search Products"
    }), /* @__PURE__ */ jsxs("p", {
      className: "text-gray-600",
      children: ["Search query: ", query]
    })]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: searchPage,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [{
    title: "Submit Product | Product Hunt Clone"
  }, {
    name: "description",
    content: "Submit your product"
  }];
};
function loader$1({
  request
}) {
  return {
    categories: []
  };
}
function action$1({
  request
}) {
  return {};
}
const submitPage = withComponentProps(function SubmitPage({
  loaderData,
  actionData
}) {
  const {
    categories
  } = loaderData;
  return /* @__PURE__ */ jsx("div", {
    className: "container mx-auto py-8",
    children: /* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: "Submit Your Product"
    })
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: submitPage,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [{
    title: "Promote Product | Product Hunt Clone"
  }, {
    name: "description",
    content: "Promote your product"
  }];
};
function loader({
  request
}) {
  return {
    promotionPlans: []
  };
}
function action({
  request
}) {
  return {};
}
const promotePage = withComponentProps(function PromotePage({
  loaderData,
  actionData
}) {
  const {
    promotionPlans
  } = loaderData;
  return /* @__PURE__ */ jsx("div", {
    className: "container mx-auto py-8",
    children: /* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: "Promote Your Product"
    })
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: promotePage,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Bto3tRtA.js", "imports": ["/assets/chunk-HA7DTUK3-p_etNeEz.js", "/assets/index-DQSv-Tvp.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-CEUKMWXT.js", "imports": ["/assets/chunk-HA7DTUK3-p_etNeEz.js", "/assets/index-DQSv-Tvp.js", "/assets/with-props-DavIjE37.js", "/assets/avatar-B4IWeQy1.js", "/assets/button-C45jCmqI.js"], "css": ["/assets/root-B35ri163.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "common/pages/home-page": { "id": "common/pages/home-page", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-page-BLAfZyMC.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js", "/assets/button-C45jCmqI.js", "/assets/product-card-ZpGnbLo1.js", "/assets/avatar-B4IWeQy1.js", "/assets/index-DQSv-Tvp.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/products-page": { "id": "features/products/pages/products-page", "parentId": "root", "path": "products", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/products-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/leaderboard-page": { "id": "features/products/pages/leaderboard-page", "parentId": "root", "path": "products/leaderboards", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/leaderboard-page-BWUjhIA7.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js", "/assets/button-C45jCmqI.js", "/assets/product-card-ZpGnbLo1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/daily-leaderboard-page": { "id": "features/products/pages/daily-leaderboard-page", "parentId": "root", "path": "products/leaderboards/daily/:year/:month/:day", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/daily-leaderboard-page-DATL40Uj.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/weekly-leaderboard-page": { "id": "features/products/pages/weekly-leaderboard-page", "parentId": "root", "path": "products/leaderboards/weekly/:year/:week", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/weekly-leaderboard-page-W5O1cMrR.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/monthly-leaderboard-page": { "id": "features/products/pages/monthly-leaderboard-page", "parentId": "root", "path": "products/leaderboards/monthly/:year/:month", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/monthly-leaderboard-page-jpJOnQ9c.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/yearly-leaderboard-page": { "id": "features/products/pages/yearly-leaderboard-page", "parentId": "root", "path": "products/leaderboards/yearly/:year", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/yearly-leaderboard-page-B3gPJdma.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/leaderboard-redirection-page": { "id": "features/products/pages/leaderboard-redirection-page", "parentId": "root", "path": "products/leaderboards/:period", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/leaderboard-redirection-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/categories-page": { "id": "features/products/pages/categories-page", "parentId": "root", "path": "products/categories", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/categories-page-Cj4k8c8S.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/category-page": { "id": "features/products/pages/category-page", "parentId": "root", "path": "products/categories/:category", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/category-page-DjTUDhSt.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/search-page": { "id": "features/products/pages/search-page", "parentId": "root", "path": "products/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-page-CAseyAp9.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/submit-page": { "id": "features/products/pages/submit-page", "parentId": "root", "path": "products/submit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/submit-page-B23eFTFB.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/promote-page": { "id": "features/products/pages/promote-page", "parentId": "root", "path": "products/promote", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/promote-page-DhairbVP.js", "imports": ["/assets/with-props-DavIjE37.js", "/assets/chunk-HA7DTUK3-p_etNeEz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-3db81f96.js", "version": "3db81f96" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "common/pages/home-page": {
    id: "common/pages/home-page",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "features/products/pages/products-page": {
    id: "features/products/pages/products-page",
    parentId: "root",
    path: "products",
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "features/products/pages/leaderboard-page": {
    id: "features/products/pages/leaderboard-page",
    parentId: "root",
    path: "products/leaderboards",
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "features/products/pages/daily-leaderboard-page": {
    id: "features/products/pages/daily-leaderboard-page",
    parentId: "root",
    path: "products/leaderboards/daily/:year/:month/:day",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "features/products/pages/weekly-leaderboard-page": {
    id: "features/products/pages/weekly-leaderboard-page",
    parentId: "root",
    path: "products/leaderboards/weekly/:year/:week",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "features/products/pages/monthly-leaderboard-page": {
    id: "features/products/pages/monthly-leaderboard-page",
    parentId: "root",
    path: "products/leaderboards/monthly/:year/:month",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "features/products/pages/yearly-leaderboard-page": {
    id: "features/products/pages/yearly-leaderboard-page",
    parentId: "root",
    path: "products/leaderboards/yearly/:year",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "features/products/pages/leaderboard-redirection-page": {
    id: "features/products/pages/leaderboard-redirection-page",
    parentId: "root",
    path: "products/leaderboards/:period",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "features/products/pages/categories-page": {
    id: "features/products/pages/categories-page",
    parentId: "root",
    path: "products/categories",
    index: true,
    caseSensitive: void 0,
    module: route9
  },
  "features/products/pages/category-page": {
    id: "features/products/pages/category-page",
    parentId: "root",
    path: "products/categories/:category",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "features/products/pages/search-page": {
    id: "features/products/pages/search-page",
    parentId: "root",
    path: "products/search",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "features/products/pages/submit-page": {
    id: "features/products/pages/submit-page",
    parentId: "root",
    path: "products/submit",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "features/products/pages/promote-page": {
    id: "features/products/pages/promote-page",
    parentId: "root",
    path: "products/promote",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
