import type { RequestHandler } from '@builder.io/qwik-city';
 
export const onGet: RequestHandler = ({ query, cookie }) => {
  const [ access, refresh ] = [query.get("access"), query.get("refresh")];

  if(!access || !refresh) {
    cookie.delete('token', { path: '/' });
  } else {
    cookie.set('token', [access, refresh].join(' '), {
      httpOnly: true,
      path: '/',
    });
  }

  // throw redirect(302, '/');
};