import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4">
        <h2 className="text-xl font-bold mb-4">tavily</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="text-gray-700 dark:text-gray-300">Overview</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-700 dark:text-gray-300">My Account</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-700 dark:text-gray-300">Research Assistant</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-700 dark:text-gray-300">Research Reports</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-700 dark:text-gray-300">API Playground</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 dark:text-gray-300">Documentation</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8">
        {/* 헤더 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Overview</h1>
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-lg">
            <h2 className="text-2xl">Researcher</h2>
            <p>API Usage: 0/1,000 Credits</p>
          </div>
        </header>

        {/* API 키 관리 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">API Keys</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Type</th>
                  <th className="text-left">Usage</th>
                  <th className="text-left">Key</th>
                  <th className="text-left">Options</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td>{key.name}</td>
                    <td>dev</td>
                    <td>0</td>
                    <td>{key.key}</td>
                    <td>
                      <button onClick={() => startEditing(key)} className="text-blue-500 hover:text-blue-600">Edit</button>
                      <button onClick={() => deleteApiKey(key.id)} className="text-red-500 hover:text-red-600 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
