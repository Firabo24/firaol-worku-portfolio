import React from 'react';
import { OrbitProvider } from '@/providers/OrbitProvider';
import { WindowProvider } from '@/providers/WindowProvider';
import { OrbitOS } from '@/components/orbit/OrbitOS';

export default function App() {
  return (
    <OrbitProvider>
      <WindowProvider>
        <OrbitOS />
      </WindowProvider>
    </OrbitProvider>
  );
}
