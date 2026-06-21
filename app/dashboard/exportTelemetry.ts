import { jsPDF } from "jspdf";
import type { ExportFormat, ISSLocation, TelemetryExportRecord } from "@/types";

const exportHeaders: Array<keyof TelemetryExportRecord> = [
  "timestamp",
  "latitude",
  "longitude",
  "altitude",
  "velocity",
];

export function exportTelemetry(
  history: ISSLocation[],
  latestData: ISSLocation | null,
  format: ExportFormat
) {
  if (!latestData || history.length === 0) {
    return;
  }

  const records = normalizeTelemetry(history);
  const filename = `iss-data-${createSafeTimestamp(latestData.timestamp)}`;

  if (format === "csv") {
    downloadFile(`${filename}.csv`, toCsv(records), "text/csv;charset=utf-8");
    return;
  }

  if (format === "json") {
    downloadFile(
      `${filename}.json`,
      JSON.stringify(records, null, 2),
      "application/json;charset=utf-8"
    );
    return;
  }

  downloadPdf(`${filename}.pdf`, records);
}

export function formatTelemetryTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleDateString("en-GB", {
    timeZone: "Asia/Kolkata",
  });
  const formattedTime = date.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
}

function normalizeTelemetry(history: ISSLocation[]): TelemetryExportRecord[] {
  return [...history].reverse().map((record) => ({
    timestamp: formatTelemetryTimestamp(record.timestamp),
    latitude: record.latitude,
    longitude: record.longitude,
    altitude: record.altitude,
    velocity: record.velocity,
  }));
}

function createSafeTimestamp(timestamp: number) {
  return formatTelemetryTimestamp(timestamp)
    .replaceAll(":", "-")
    .replaceAll("/", "-")
    .replaceAll(" ", "-");
}

function toCsv(records: TelemetryExportRecord[]) {
  const rows = records.map((record) =>
    exportHeaders.map((header) => escapeCsvValue(record[header])).join(",")
  );

  return [exportHeaders.join(","), ...rows].join("\n");
}

function escapeCsvValue(value: string | number) {
  const rawValue = String(value);
  return /[",\n]/.test(rawValue) ? `"${rawValue.replaceAll('"', '""')}"` : rawValue;
}

function downloadPdf(filename: string, records: TelemetryExportRecord[]) {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight();
  const lineHeight = 8;
  let y = 18;

  doc.setFontSize(16);
  doc.text("ISS Telemetry Export", 14, y);
  y += 12;

  doc.setFontSize(10);
  doc.text(exportHeaders.join(" | "), 14, y);
  y += lineHeight;

  records.forEach((record) => {
    if (y > pageHeight - 14) {
      doc.addPage();
      y = 18;
      doc.text(exportHeaders.join(" | "), 14, y);
      y += lineHeight;
    }

    doc.text(
      [
        record.timestamp,
        record.latitude,
        record.longitude,
        record.altitude,
        record.velocity,
      ].join(" | "),
      14,
      y
    );
    y += lineHeight;
  });

  doc.save(filename);
}

function downloadFile(filename: string, contents: string, mimeType: string) {
  const blob = new Blob([contents], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
