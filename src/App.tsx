import { useState, useEffect } from 'react';
import SetupPage from './pages/SetupPage';
import TaskPage from './pages/TaskPage';

// ローカルストレージのキー
const USER_NAME_KEY = 'childTodo_userName';

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初回レンダリング時にローカルストレージから名前を取得
  useEffect(() => {
    const storedName = localStorage.getItem(USER_NAME_KEY);
    if (storedName) {
      setUserName(storedName);
    }
    setIsLoading(false);
  }, []);

  // 名前の設定
  const handleSetupComplete = (name: string) => {
    localStorage.setItem(USER_NAME_KEY, name);
    setUserName(name);
  };

  // 設定のリセット
  const handleSignOut = () => {
    localStorage.removeItem(USER_NAME_KEY);
    setUserName(null);
  };

  // ローディング中は何も表示しない
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">読み込み中...</div>;
  }

  // 名前が設定されていない場合は初期設定画面を表示
  if (!userName) {
    return <SetupPage onComplete={handleSetupComplete} />;
  }

  // 名前が設定されている場合はタスク管理画面を表示
  return <TaskPage userName={userName} onSignOut={handleSignOut} />;
}

export default App;
