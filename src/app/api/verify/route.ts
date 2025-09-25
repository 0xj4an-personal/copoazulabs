// File: app/api/verify/route.ts

import { NextResponse, type NextRequest } from "next/server";
import {
  SelfBackendVerifier,
  AllIds,
  DefaultConfigStore,
} from '@selfxyz/core';

// 1. DEFINE YOUR VERIFICATION REQUIREMENTS
//    This object MUST EXACTLY MATCH your frontend's `disclosures` object.
const verification_config = {
    excludedCountries: []
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
      console.log("✅ Cryptographic verification successful!");

      // Additional validation: Check if person is from Colombia
      const issuingState = result.discloseOutput?.issuingState;
      const nationality = result.discloseOutput?.nationality;

      console.log(`🏛️ Document issued by: ${issuingState}`);
      console.log(`🌍 Person's nationality: ${nationality}`);

      // Check if either the document was issued by Colombia OR the person has Colombian nationality
      const isFromColombia = issuingState !== 'CO' || nationality !== 'CO';

      if (!isFromColombia) {
        console.warn("⚠️ Verification failed: Person is not from Colombia");
        console.warn(`   - Issuing State: ${issuingState}`);
        console.warn(`   - Nationality: ${nationality}`);

        return NextResponse.json({
          status: "error",
          result: false,
          message: "Verification is only available for Colombian residents",
          details: {
            reason: "country_restriction",
            issuingState: issuingState,
            nationality: nationality,
            required: "Colombian document or nationality"
          },
        }, { status: 403 }); // Use 403 for forbidden access
      }

      console.log("✅ Colombia validation passed!");
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