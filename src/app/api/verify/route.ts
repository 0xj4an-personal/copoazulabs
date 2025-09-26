// File: app/api/verify/route.ts

import { NextResponse, type NextRequest } from "next/server";
import {
  SelfBackendVerifier,
  AllIds,
  DefaultConfigStore,
  countries,
} from '@selfxyz/core';

// 1. DEFINE YOUR VERIFICATION REQUIREMENTS
//    This object MUST EXACTLY MATCH your frontend's `disclosures` object.
const verification_config = {
    excludedCountries: [
      // Excluir todos los países excepto Colombia
      countries.UNITED_STATES, countries.CANADA, countries.MEXICO, countries.UNITED_KINGDOM,
      countries.GERMANY, countries.FRANCE, countries.SPAIN, countries.ITALY,
      countries.JAPAN, countries.CHINA, countries.AUSTRALIA, countries.BRAZIL,
      countries.ARGENTINA, countries.CHILE, countries.PERU, countries.VENEZUELA,
      countries.ECUADOR, countries.BOLIVIA, countries.URUGUAY, countries.PARAGUAY,
      countries.RUSSIA, countries.INDIA, countries.INDONESIA, countries.THAILAND,
      countries.VIET_NAM, countries.PHILIPPINES, countries.SOUTH_KOREA, countries.TAIWAN,
      countries.SINGAPORE, countries.MALAYSIA, countries.NETHERLANDS, countries.BELGIUM,
      countries.SWITZERLAND, countries.AUSTRIA, countries.SWEDEN, countries.NORWAY,
      countries.DENMARK, countries.FINLAND, countries.POLAND, countries.CZECH_REPUBLIC,
      countries.HUNGARY, countries.ROMANIA, countries.BULGARIA, countries.CROATIA,
      countries.SLOVENIA, countries.SLOVAKIA, countries.ESTONIA, countries.LATVIA,
      countries.LITHUANIA, countries.PORTUGAL, countries.GREECE, countries.TURKEY,
      countries.ISRAEL, countries.SAUDI_ARABIA, countries.UNITED_ARAB_EMIRATES, countries.QATAR,
      countries.KUWAIT, countries.BAHRAIN, countries.OMAN, countries.JORDAN,
      countries.LEBANON, countries.EGYPT, countries.SOUTH_AFRICA, countries.NIGERIA,
      countries.KENYA, countries.GHANA, countries.MOROCCO, countries.TUNISIA,
      countries.ALGERIA, countries.ETHIOPIA, countries.UGANDA, countries.TANZANIA,
      countries.ANDORRA, countries.ANTIGUA_AND_BARBUDA, countries.ALBANIA, countries.ARMENIA,
      countries.AZERBAIJAN, countries.BOSNIA_AND_HERZEGOVINA, countries.BARBADOS, countries.BANGLADESH,
      countries.BELARUS, countries.IVORY_COAST, countries.COSTA_RICA, countries.CYPRUS,
      countries.DOMINICA, countries.ECUADOR, countries.GEORGIA, countries.GAMBIA,
      countries.SAINT_KITTS_AND_NEVIS, countries.NORTH_KOREA, countries.KAZAKHSTAN,
      countries.LIECHTENSTEIN, countries.MONACO, countries.MONTENEGRO, countries.NORTH_MACEDONIA,
      countries.MALTA, countries.MALDIVES, countries.PALESTINE, countries.SERBIA,
      countries.SEYCHELLES, countries.SAN_MARINO, countries.SENEGAL, countries.SYRIAN_ARAB_REPUBLIC,
      countries.TAJIKISTAN, countries.TIMOR_LESTE, countries.VATICAN_CITY,
      countries.SAINT_VINCENT_AND_THE_GRENADINES, countries.ZIMBABWE
      // Colombia (countries.COLOMBIA) NO está en la lista, por lo que está permitida
    ],
};

// 2. CREATE THE CONFIGURATION STORE
const configStore = new DefaultConfigStore(verification_config);

// 3. INITIALIZE THE VERIFIER
const selfBackendVerifier = new SelfBackendVerifier(
  process.env.NEXT_PUBLIC_SELF_SCOPE || "copoazu-prod",
  process.env.NEXT_PUBLIC_SELF_ENDPOINT || "https://copoazushop.vercel.app/api/verify",
  false, // true = mock for testing
  AllIds,
  configStore,
  "hex"
);

console.log(`🔧 Initializing verifier with SCOPE: ${process.env.NEXT_PUBLIC_SELF_SCOPE}`);
console.log(`🔧 Initializing verifier with ENDPOINT: ${process.env.NEXT_PUBLIC_SELF_ENDPOINT}`);

// 4. CREATE THE API ROUTE HANDLER
export async function POST(req: NextRequest) {
  console.log("✅ Received request at /api/verify endpoint.");

    let requestBody;
  try {
    requestBody = await req.json();
    // DEBUGGING: Log the entire incoming payload to inspect what the frontend is sending
    console.log("📦 Incoming request body:", JSON.stringify(requestBody, null, 2));
  } catch (error) {
    console.error("❌ Failed to parse request body as JSON:", error);
    return NextResponse.json({ message: "Invalid JSON in request body" }, { status: 400 });
  }
  // Extract data from the request
  // Extract data from the request
  const { attestationId, proof, publicSignals, userContextData } = requestBody;

  // Verify all required fields are present
  if (!proof || !publicSignals || !attestationId || !userContextData) {
    console.error("❌ Missing required fields in request.");
    return NextResponse.json({
      message: "Proof, publicSignals, attestationId and userContextData are required",
    }, { status: 400 });
  }

  // Verify the proof
  try {
    console.log("⏳ Calling selfBackendVerifier.verify()...");
    const result = await selfBackendVerifier.verify(
      attestationId,
      proof,
      publicSignals,
      userContextData
    );

    // DEBUGGING: Log the ENTIRE result object from the verifier.
    // This object contains valuable details on why verification might have failed.
    console.log("🔍 Verification result object:", JSON.stringify(result, null, 2));

    // Check if verification was successful
    if (result.isValidDetails.isValid) {
      console.log("✅ Verification successful!");
      return NextResponse.json({
        status: "success",
        result: true,
        credentialSubject: result.discloseOutput,
      });
    } else {
      // Verification failed, return the detailed reason
      console.warn("⚠️ Verification failed. Details:", result.isValidDetails);
      return NextResponse.json({
        status: "error",
        result: false,
        message: "Verification failed",
        // Return the specific details about why it failed
        details: result.isValidDetails,
      }, { status: 400 }); // Use 400 for a bad request (invalid proof) instead of 500
    }
 } catch (error: unknown) { // Changed 'any' to 'unknown'
    // DEBUGGING: Log the full error object for a complete stack trace
    console.error('💥 An unexpected error occurred during verification:', error);

    // Type-safe way to get the error message
    const message = error instanceof Error ? error.message : "An unknown error occurred.";

    return NextResponse.json({
      status: "error",
      result: false,
      message: "An unexpected error occurred on the server.",
      // In development, you might want to return the error message for easier debugging
      error: process.env.NODE_ENV === 'development' ? message : undefined,
    }, { status: 500 });
  }
}