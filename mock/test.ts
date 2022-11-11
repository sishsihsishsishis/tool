// test.ts

import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }:{body:Record<string,any>}) => {
      if(body.username === 'root' && body.password === 'admin')
        return { token:'success' };
      else
        return 
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
] as MockMethod[]