'use client';

import dynamic from 'next/dynamic';
import '@informatiq/geologiq-react/index.css';

const App = dynamic(() => import('./app'), { ssr: false });

export default function Home() {
  return <App />;
}
