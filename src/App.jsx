
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  useEffect(() => {
    let lastTouchEnd = 0;
    const preventZoom = (e) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) e.preventDefault();
      lastTouchEnd = now;
    };

    const preventGesture = (e) => e.preventDefault();

    document.addEventListener("touchend", preventZoom, false);
    document.addEventListener("gesturestart", preventGesture, false);

    if (screen.orientation?.lock) {
      screen.orientation.lock("portrait").catch(() => {});
    }

    return () => {
      document.removeEventListener("touchend", preventZoom);
      document.removeEventListener("gesturestart", preventGesture);
    };
  }, []);

  const [page, setPage] = useState("form");
  const [name, setName] = useState("");
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const actionRows = [
    ["Consistency", "Accuracy", "Cost-effectiveness"],
    ["Action", "Precision", "Quality", "Compliance"],
    ["Productivity", "Safety", "Collaboration"],
    ["Results-driven", "Sustainable"],
    ["Talent Development", "Alignment"],
  ];

  return (
    <AnimatePresence mode="wait">
      {page === "thankyou" ? (
        <motion.div
          key="thankyou"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="min-h-[100svh] w-screen flex items-center justify-center bg-gray-100"
        >
          <div className="w-full h-full max-w-md bg-white shadow-lg p-6 text-center flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-6">Thank You for Your Commitment</h2>
            <img src="/logo.jpeg" alt="logo" className="mx-auto mb-4 w-32" />
            <p className="text-sm text-gray-600 font-medium">
              FOCUSED ACTION,<br /> DRIVING CONSISTENCY
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="min-h-[100svh] w-screen flex items-center justify-center bg-gray-100 px-2"
        >
          <div className="w-full h-full max-w-md bg-white shadow-lg p-5 text-center flex flex-col justify-center">
            <h1 className="font-bold text-sm mb-4">KICK OFF MEETING FIBER 2026</h1>
<img src="/logo.jpeg" alt="logo" className="mx-auto mb-4 w-24" />


<p className="text-xs font-semibold mb-4">
FOCUSED ACTION,<br /> DRIVING CONSISTENCY
</p>
            <label className="block text-sm mb-1">Enter your name:</label>
            <input
              className="w-full text-center border rounded-lg px-3 py-2 mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p className="text-sm mb-2">Choose your Action for 2026</p>
            <div className="space-y-2 mb-4">
              {actionRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`grid gap-2 ${
                    row.length === 4
                      ? "grid-cols-4"
                      : row.length === 3
                      ? "grid-cols-3"
                      : "grid-cols-2"
                  }`}
                >
                  {row.map((item) => (
                    <button
                      key={item}
                      onClick={() => setAction(item)}
                      className={`px-3 py-2 rounded-lg text-xs ${
                        action === item
                          ? "bg-green-600 text-white"
                          : "bg-green-200 text-green-900"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <button
              disabled={!name || !action || loading}
              onClick={async () => {
                setLoading(true);
                await supabase.from("kickoff_commitments").insert([
                  { name, action, year: 2026 },
                ]);
                setLoading(false);
                setPage("thankyou");
              }}
              className="w-full bg-green-700 text-white py-2 rounded-xl"
            >
              {loading ? "Loading..." : "SUBMIT"}
            </button>

            <div className="mt-6 text-[10px] text-gray-500/70 font-medium tracking-wide">
              © 2026 Forest Planning – FMIS Department
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
