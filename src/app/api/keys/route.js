import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// 임시 저장소 (실제로는 데이터베이스를 사용해야 합니다)
let apiKeys = [];

export async function GET() {
  return NextResponse.json(apiKeys);
}

export async function POST(request) {
  try {
    const { name } = await request.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'API 키 이름이 필요합니다.' },
        { status: 400 }
      );
    }

    const newKey = {
      id: uuidv4(),
      name,
      key: `sk-${uuidv4()}`,
      createdAt: new Date().toISOString(),
    };

    apiKeys.push(newKey);
    return NextResponse.json(newKey, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'API 키 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 