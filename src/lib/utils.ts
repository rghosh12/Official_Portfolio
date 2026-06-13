import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    ...options,
  });
}

export function formatDateRange(start: Date | string, end?: Date | string | null): string {
  const startStr = formatDate(start, { year: "numeric", month: "short" });
  if (!end) return `${startStr} – Present`;
  const endStr = formatDate(end, { year: "numeric", month: "short" });
  return `${startStr} – ${endStr}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "…";
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const value = String(item[key]);
      return { ...groups, [value]: [...(groups[value] || []), item] };
    },
    {} as Record<string, T[]>
  );
}

export function buildPaginationMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export type PaginatedResponse<T> = {
  data: T[];
  meta: ReturnType<typeof buildPaginationMeta>;
};
