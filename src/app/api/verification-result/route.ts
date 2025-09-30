import { NextResponse, type NextRequest } from "next/server";

// Type declaration for global verification results
declare global {
  var verificationResults: Map<string, {
    userId: string;
    nationality: string | null;
    timestamp: string;
    credentialSubject: any;
  }> | undefined;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    console.log('🔍 Verification result API called with userId:', userId);

    if (!userId) {
      console.log('❌ No userId provided');
      return NextResponse.json({
        status: "error",
        message: "userId is required"
      }, { status: 400 });
    }

    // Get verification result from memory storage
    if (!global.verificationResults) {
      console.log('❌ No verification results Map found');
      return NextResponse.json({
        status: "not_found",
        message: "No verification results found"
      }, { status: 404 });
    }

    console.log('🗄️ Verification results Map size:', global.verificationResults.size);
    console.log('🔍 Looking for userId:', userId);
    console.log('🗄️ Available userIds:', Array.from(global.verificationResults.keys()));

    const verificationResult = global.verificationResults.get(userId);

    if (!verificationResult) {
      console.log('❌ No verification result found for userId:', userId);
      return NextResponse.json({
        status: "not_found",
        message: "No verification result found for this user"
      }, { status: 404 });
    }

    console.log('✅ Found verification result:', verificationResult);
    console.log('🌍 Nationality in result:', verificationResult.nationality);

    return NextResponse.json({
      status: "success",
      nationality: verificationResult.nationality,
      timestamp: verificationResult.timestamp,
      credentialSubject: verificationResult.credentialSubject
    });

  } catch (error) {
    console.error('❌ Error retrieving verification result:', error);
    return NextResponse.json({
      status: "error",
      message: "Internal server error"
    }, { status: 500 });
  }
}
