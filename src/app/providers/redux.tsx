'use client';
import { Provider } from 'react-redux';
import store from '../../redux/store';

export default function ReduxProvider({ children }: any): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
