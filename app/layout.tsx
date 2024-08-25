//
// // RootLayout.tsx or RootLayout.jsx
//
// import "@/styles/globals.css";
// import { Metadata, Viewport } from "next";
// import { Link } from "@nextui-org/link";
// import clsx from "clsx";
// import { Providers } from "./providers";
// import { siteConfig } from "@/config/site";
// import { fontSans } from "@/config/fonts";
// import ThemeProvider from "@/app/themeProvider";
// import React, {useState} from "react";
// import StepContext from "@/app/step-context";
//
//
//
//
// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };
//
// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
// };
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//     const [currentStep, setStep]=useState(1);
//     const [userData, setUserData]=useState([]);
//     const [finalData, setFinalData]=useState([]);
//
//   return (
//       <html suppressHydrationWarning lang="en">
//       <head />
//       <body
//           className={clsx(
//               "min-h-screen bg-background font-sans antialiased",
//               fontSans.variable
//           )}
//       >
//       <StepContext>
//       <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
//         <div className="relative flex flex-col h-screen">
//           {/*<Navbar />*/}
//           <ThemeProvider>
//             <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
//               {children}
//             </main>
//           </ThemeProvider>
//           <footer className="w-full flex items-center justify-center py-3">
//             <Link
//                 isExternal
//                 className="flex items-center gap-1 text-current"
//                 href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
//                 title="nextui.org homepage"
//             >
//               <span className="text-default-600">Powered by</span>
//               <p className="text-primary">Sabra</p>
//             </Link>
//           </footer>
//         </div>
//       </Providers>
//       </StepContext>
//       </body>
//       </html>
//   );
// }
import "@/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import ThemeProvider from "@/app/themeProvider";
import StepContextProvider from "@/app/step-context";
export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
        <head />
        <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
            
        <StepContextProvider>
            <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                <div className="relative flex flex-col h-screen">
                    <ThemeProvider>
                        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                            {children}
                        </main>
                    </ThemeProvider>
                    {/* <footer className="w-full flex items-center justify-center py-3 relative">
                        <Link
                            isExternal
                            className="flex items-center gap-1 text-current"
                            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                            title="nextui.org homepage"
                        >
                            <span className="text-default-600">Powered by</span>
                            <p className="text-primary">Sabra</p>
                        </Link>
                    </footer> */}
                </div>
            </Providers>
        </StepContextProvider>
        </body>
        </html>
    );
}


