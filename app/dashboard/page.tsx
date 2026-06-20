"use client";

import { useEffect, useState, useCallback } from "react";
import { issApi } from "@/app/lib/api";
import ControlButtons from "@/app/dashboard/ControlButtons";
import { formatTelemetryTimestamp } from "@/app/dashboard/exportTelemetry";
import type { ISSLocation } from "@/types";

const RECORDS_PER_PAGE = 10;

export default function DashboardPage() {
  const [history, setHistory] = useState<ISSLocation[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(true);

  const fetchISSData = useCallback(async () => {
    try {
      const res = await issApi.get<ISSLocation>("/v1/satellites/25544");
      const data = res.data;

      setHistory((prev) => {
        const alreadyExists = prev.some(
          (item) => item.timestamp === data.timestamp
        );

        if (alreadyExists) return prev;

        return [...prev, data];
      });

      setError("");
    } catch {
      setError("Could not load ISS telemetry data.");
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchISSData, 0);

    if (!isRunning) {
      return () => window.clearTimeout(timeoutId);
    }

    const intervalId = setInterval(fetchISSData, 10000);

    return () => {
      window.clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isRunning, fetchISSData]);

  const historyReversed = [...history].reverse();

  const totalPages = Math.max(
    1,
    Math.ceil(historyReversed.length / RECORDS_PER_PAGE)
  );

  const startIndex = (page - 1) * RECORDS_PER_PAGE;

  const currentRecords = historyReversed.slice(
    startIndex,
    startIndex + RECORDS_PER_PAGE
  );

  const latestData = history[history.length - 1];

  return (
    <main className="p-6">
      <section className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            ISS Telemetry Dashboard
          </h1>
          <p>Live International Space Station location data.</p>
        </div>

        <ControlButtons
          history={history}
          latestData={latestData ?? null}
          isRunning={isRunning}
          onRunningChange={setIsRunning}
          onClearHistory={() => {
            setHistory([]);
            setIsRunning(false);
            setError("");
            setPage(1);
          }}
        />

        {/* <button
          onClick={() => logout()}
          className={`rounded px-4 py-2 font-bold text-white bg-neutral-700 hover:bg-red-700`}
        >
          Logout
        </button> */}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">
          Current ISS Status
        </h2>

        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}

        {latestData ? (
          <>
            <table className="mt-4 w-full border-collapse border bg-black text-white">
              <thead>
                <tr>
                  <th className="border p-2">Timestamp (IST)</th>
                  <th className="border p-2">Latitude</th>
                  <th className="border p-2">Longitude</th>
                  <th className="border p-2">Altitude (km)</th>
                  <th className="border p-2">Velocity (km/h)</th>
                </tr>
              </thead>

              <tbody className="bg-neutral-800">
                {currentRecords.map((record) => (
                  <tr key={record.timestamp}>
                    <td className="border p-2">
                      {formatTelemetryTimestamp(record.timestamp)}
                    </td>
                    <td className="border p-2">
                      {record.latitude}
                    </td>
                    <td className="border p-2">
                      {record.longitude}
                    </td>
                    <td className="border p-2">
                      {record.altitude}
                    </td>
                    <td className="border p-2">
                      {record.velocity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav className="mt-4 flex items-center gap-4">
              <button
                className="border px-4 py-2 disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                className="border px-4 py-2 disabled:opacity-50"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </nav>
          </>
        ) : (
          <p className="mt-4">Loading ISS data...</p>
        )}
      </section>
    </main>
  );
}
