// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';
// type Data = {
//   name: string
// }
export const config = {
  api: {
    bodyParser: false,
  },
};
const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    //convert cookies to header Authorization
    const cookies = new Cookies(req, res);
    if (cookies.get('access_token')) {
      req.headers.Authorization = `Bearer ${cookies.get('access_token')}`;
    }
    //don't send cookies to api se    rver
    req.headers.cookie = '';
    // api/students
    // https://js-post-api.herokuapp.com/api/students
    proxy.web(req, res, {
      // target: process.env.API_URL,
      target: 'https://js-post-api.herokuapp.com',

      changeOrigin: true,
      selfHandleResponse: false,
    });
    //su dung selfHandleResponse thi k can xu ly phan duoi
    //   res.status(200).json({ name: 'PATH - Match all here' })
    proxy.once('proxyRes', () => {
      resolve(true);
    });
  });
}
