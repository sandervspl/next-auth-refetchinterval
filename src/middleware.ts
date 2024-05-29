import { withAuth } from 'next-auth/middleware';

import { apiConfig } from 'services/api/config';

export default withAuth({
  pages: {
    signIn: apiConfig.loginPath,
  },
});

export const config = {
  // Add routes that need authentication
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
  matcher: [],
};
