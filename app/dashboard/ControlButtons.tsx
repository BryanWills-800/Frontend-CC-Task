import { exportTelemetry } from "@/app/dashboard/exportTelemetry";
import type { ControlButtonsProps, ExportFormat } from "@/types";

const exportButtons: Array<{
    format: ExportFormat;
    label: string;
    className: string;
}> = [
    {
        format: "csv",
        label: "Export CSV",
        className: "bg-green-700 hover:bg-green-500",
    },
    {
        format: "json",
        label: "Export JSON",
        className: "bg-blue-700 hover:bg-blue-500",
    },
    {
        format: "pdf",
        label: "Export PDF",
        className: "bg-red-700 hover:bg-red-500",
    },
];

export default function ControlButtons({
    history,
    latestData,
    isRunning,
    onRunningChange,
    onClearHistory,
}: ControlButtonsProps) {
    const hasTelemetry = history.length > 0 && Boolean(latestData);

    return (
        <div className="flex items-center gap-5">
            <div className={`relative rounded px-4 py-2 font-bold text-white cursor-pointer ${isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                <button
                    onClick={() => onRunningChange(!isRunning)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    type="button"
                />
                {isRunning ? "Stop Updates" : "Start Updates"}
            </div>

            {exportButtons.map((button) => (
                <div
                    className={`relative rounded px-4 py-2 font-bold text-white ${button.className} ${hasTelemetry ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                    key={button.format}
                >
                    <button
                        onClick={() => exportTelemetry(history, latestData, button.format)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        disabled={!hasTelemetry}
                        type="button"
                    />
                    <span>{button.label}</span>
                </div>
            ))}

            <div className="relative rounded px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 cursor-pointer">
                <button
                    onClick={onClearHistory}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    type="button"
                />
                Clear Data
            </div>
        </div>
    );
}
