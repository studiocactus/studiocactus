"use client";

import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";

export default function DictionarySwitcher({ currentLocale }: { currentLocale: Locale }) {
    const pathname = usePathname();

    const redirectedPathname = (locale: Locale) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    return (
        <div className="flex items-center gap-4 font-mono text-[10px] font-bold tracking-widest">
            {i18n.locales.map((locale, index) => {
                const isActive = currentLocale === locale;
                return (
                    <React.Fragment key={locale}>
                        <Link
                            href={redirectedPathname(locale)}
                            className={`transition-colors duration-300 uppercase ${isActive
                                ? "text-primary border-b border-primary/40"
                                : "text-neutral-600 hover:text-white"
                                }`}
                        >
                            {locale}
                        </Link>
                        {index < i18n.locales.length - 1 && (
                            <span className="text-neutral-800">/</span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
