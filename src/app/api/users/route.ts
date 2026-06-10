import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const users = [
    {
      name: "ahmed",
      age: 38,
    },
    {
      name: "hadeer",
      age: 36,
    },
  ];
  return NextResponse.json({ message: "success", data: users });
}

// export function POST(){

// }
// export function DELETE(){

// }
// export function PUT(){

// }
