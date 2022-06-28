import { addDayToDate } from '@sharingan/utils';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { useAuthenticatedUser } from '@/services/users/authenticated-user';
import { COOKIE_NAME } from '@/utils/constants';

const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies([COOKIE_NAME]);
  const router = useRouter();

  const { data, isLoading } = useAuthenticatedUser();

  const saveToken = (token: string) => {
    setCookie(COOKIE_NAME, token, { expires: addDayToDate(90), path: '/', secure: true });
  };

  const deleteToken = () => {
    removeCookie(COOKIE_NAME, { path: '/' });
  };

  const redirectToDashboard = () => router.push('/board');

  return {
    deleteToken,
    loading: isLoading,
    redirectToDashboard,
    saveToken,
    user: data,
  };
};

export { useAuth };
