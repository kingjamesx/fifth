import { User } from "../types/backend";

export const convertToCSV = (data: User[]) => {
  if (!data.length) return "";

  // Extract headers
  const headers = getUniqueHeaders(data);
  const headerRow = headers.join(",");

  // Extract rows
  const rows = data.map((item) => {
    const flatItem = flattenObject(item);

    return (
      headers
        //@ts-ignore
        .map((header) => JSON.stringify(flatItem[header] || ""))
        .join(",")
    );
  });

  return [headerRow, ...rows].join("\n");
};

// Helper function to get unique headers from the data
export const getUniqueHeaders = (data: User[]) => {
  const headers = new Set();
  data.forEach((item) => {
    const flatItem = flattenObject(item);
    Object.keys(flatItem).forEach((key) => headers.add(key));
  });
  return Array.from(headers);
};

// Helper function to flatten nested objects
export const flattenObject = (obj: {}, prefix = "") => {
  const flattened = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, `${prefix}${key}.`));
    } else {
      //@ts-ignore
      flattened[`${prefix}${key}`] = value;
    }
  }
  return flattened;
};

// Function to trigger the download of CSV
export const downloadCSV = (data: User[], filename: string) => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}
