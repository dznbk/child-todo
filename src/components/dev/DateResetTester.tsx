import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Button from '../common/Button';
import {
  persistTasksAtom,
  resetTasksStatus,
  saveLastResetDate,
  getLastResetDate
} from '../../store/taskStore';
import { formatDate, getYesterday, getTodayAt } from '../../utils/dateUtils';

/**
 * 日付リセットロジックをテストするための開発用コンポーネント
 * 注意: このコンポーネントは開発中にのみ使用し、本番環境では削除または無効化すること
 */
const DateResetTester: React.FC = () => {
  const [tasks, setTasks] = useAtom(persistTasksAtom);
  const [lastReset, setLastReset] = useState<Date>(getLastResetDate());
  const [resetResult, setResetResult] = useState<string | null>(null);

  // 最後のリセット日時を昨日に設定
  const setLastResetToYesterday = () => {
    const yesterday = getYesterday();
    saveLastResetDate(yesterday);
    setLastReset(yesterday);
    setResetResult(null);
  };

  // 最後のリセット日時を今日の4時に設定
  const setLastResetToToday4AM = () => {
    const today4am = getTodayAt(4, 0);
    saveLastResetDate(today4am);
    setLastReset(today4am);
    setResetResult(null);
  };

  // 最後のリセット日時を今日の6時に設定
  const setLastResetToToday6AM = () => {
    const today6am = getTodayAt(6, 0);
    saveLastResetDate(today6am);
    setLastReset(today6am);
    setResetResult(null);
  };

  // タスク状態をリセット
  const checkAndResetTasks = () => {
    // 最後のリセットからの経過時間を計算
    const lastReset = getLastResetDate();
    const now = new Date();
    const diffMs = now.getTime() - lastReset.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // リセットを実行
    setTasks(resetTasksStatus(tasks));
    setLastReset(getLastResetDate());
    setResetResult(`タスク状態をリセットしました（前回のリセットから約${Math.floor(diffHours)}時間経過）`);
  };

  // 強制的にタスク状態をリセット
  const forceResetTasks = () => {
    setTasks(resetTasksStatus(tasks));
    setLastReset(getLastResetDate());
    setResetResult('タスク状態を強制的にリセットしました');
  };

  // 現在の日時を表示
  const now = new Date();

  return (
    <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="text-lg font-bold mb-4">日付リセットテスター（開発用）</h2>
      
      <div className="mb-4">
        <p className="text-sm mb-1">現在の日時: {formatDate(now)}</p>
        <p className="text-sm mb-1">最後のリセット日時: {formatDate(lastReset)}</p>
        <p className="text-sm mb-1">タスク数: {tasks.length}</p>
        <p className="text-sm mb-1">完了タスク数: {tasks.filter(t => t.completed).length}</p>
        
        {resetResult && (
          <p className={`text-sm mt-2 font-bold ${resetResult.includes('リセットされませんでした') ? 'text-orange-500' : 'text-green-500'}`}>
            {resetResult}
          </p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={setLastResetToYesterday}
        >
          昨日にリセット
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={setLastResetToToday4AM}
        >
          今日4時にリセット
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={setLastResetToToday6AM}
        >
          今日6時にリセット
        </Button>
        
        <Button
          size="sm"
          variant="primary"
          onClick={checkAndResetTasks}
        >
          リセット条件をチェックして実行
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={forceResetTasks}
        >
          強制リセット
        </Button>
      </div>
    </div>
  );
};

export default DateResetTester;