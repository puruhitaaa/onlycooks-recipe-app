import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

type Props = {
  children: React.ReactNode;
};

export const ApolloProvider = ({ children }: Props) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  });

  const authLink = setContext(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth.token;
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink as any) as any,
  });

  return <Provider client={client}>{children}</Provider>;
};
