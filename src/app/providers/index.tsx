'use client';

import ReduxProvider from "./redux";
import ReactQueryProvider from "./reactQuery";

export default function Providers({ children }: any): JSX.Element {
  return (
    <ReactQueryProvider>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </ReactQueryProvider>
  );
}
