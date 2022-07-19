// import '../styles/globals.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { AppPropsWithLayout } from '../models';
import { EmptyLayout } from '@/components/layout';
import '../styles/scss/styles.scss';
import { SWRConfig } from 'swr';
import axiosClient from '@/api-client/axios-client';
import { Provider } from 'react-redux';
// import {  wrapper } from 'store/store';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWork } from 'store/workSlice';
import { store } from 'store/store';
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosClient.get(url),
        shouldRetryOnError: false,
      }}
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;
