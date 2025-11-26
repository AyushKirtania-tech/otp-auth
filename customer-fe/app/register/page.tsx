/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) return;

    const res = await fetch("http://localhost:5000/api/v1/customer/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber }),
    });

    const json = await res.json();
    if (json.success) {
      localStorage.setItem("register_phone", phoneNumber);
      router.push("/register/otp");
    } else {
      alert(json.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">DEPARTMENT OF</h1>
              <p className="text-orange-400 text-sm font-medium">ANIMAL HUSBANDRY AND DAIRYING</p>
              <p className="text-orange-400/80 text-xs">GOVERNMENT OF INDIA</p>
            </div>
          </a>
          <select className="bg-slate-700/80 text-white px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </div>
      </header>

      {/* Registration Form */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-orange-500 to-orange-600 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-orange-100">
                  Register to start ordering
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 bg-slate-100 border-2 border-r-0 border-slate-200 rounded-l-xl text-slate-700 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit number"
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={phoneNumber.length !== 10}
                  className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send OTP
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Already have an account?</span>
                  </div>
                </div>

                <a 
                  href="/login" 
                  className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-all"
                >
                  Login
                </a>
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="mt-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Quick Registration</h4>
                <p className="text-slate-400 text-xs">We'll send you an OTP to verify your phone number</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}