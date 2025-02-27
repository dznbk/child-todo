import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/common/Button';

type SetupPageProps = {
  onComplete: (name: string) => void;
};

const SetupPage: React.FC<SetupPageProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() !== '') {
      onComplete(name.trim());
    }
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-primary-600 mb-6">
          ようこそ！
        </h1>
        
        <p className="text-lg text-center mb-8">
          タスク管理アプリを始める前に、あなたの名前を教えてください。
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              なまえ
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              placeholder="ここに名前を入力してね"
              required
            />
          </div>
          
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={name.trim() === ''}
            >
              はじめる
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default SetupPage;