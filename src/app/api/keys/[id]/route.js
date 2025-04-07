import { NextResponse } from 'next/server';

// 임시 저장소 (실제로는 데이터베이스를 사용해야 합니다)
let apiKeys = [];

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const index = apiKeys.findIndex(key => key.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'API 키를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    apiKeys = apiKeys.filter(key => key.id !== id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'API 키 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { name } = await request.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'API 키 이름이 필요합니다.' },
        { status: 400 }
      );
    }

    const index = apiKeys.findIndex(key => key.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'API 키를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    apiKeys[index] = {
      ...apiKeys[index],
      name,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(apiKeys[index], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'API 키 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 