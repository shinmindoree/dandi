'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      console.error('API 키를 불러오는 중 오류 발생:', error);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newKeyName }),
      });
      
      if (response.ok) {
        setNewKeyName('');
        fetchApiKeys();
      }
    } catch (error) {
      console.error('API 키 생성 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteApiKey = async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchApiKeys();
      }
    } catch (error) {
      console.error('API 키 삭제 중 오류 발생:', error);
    }
  };

  const startEditing = (key) => {
    setEditingKey(key.id);
    setEditName(key.name);
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditName('');
  };

  const updateApiKey = async (id) => {
    if (!editName) return;
    
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName }),
      });
      
      if (response.ok) {
        setEditingKey(null);
        setEditName('');
        fetchApiKeys();
      }
    } catch (error) {
      console.error('API 키 수정 중 오류 발생:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API 키 관리</h1>
        
        {/* API 키 생성 폼 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">새 API 키 생성</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="API 키 이름"
              className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              onClick={createApiKey}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {isLoading ? '생성 중...' : '생성'}
            </button>
          </div>
        </div>

        {/* API 키 목록 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">API 키 목록</h2>
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between p-4 border rounded-md dark:border-gray-700"
              >
                {editingKey === key.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button
                      onClick={() => updateApiKey(key.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      저장
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-medium">{key.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{key.key}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(key)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteApiKey(key.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        삭제
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 