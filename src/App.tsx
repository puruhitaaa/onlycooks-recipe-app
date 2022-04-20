import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer, Header } from './components'
import {
  AboutScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RecipeScreen,
  RegisterScreen,
  NotFoundScreen,
  FollowerListScreen,
  FollowingListScreen,
  LikeListScreen,
} from './pages'
import { ApolloProvider } from './utils/ApolloProvider'
import { Compose } from './utils/CombineProviders'

const App = () => {
  return (
    <Compose components={[BrowserRouter, ApolloProvider]}>
      <Header />

      <main className='min-h-screen bg-base-100'>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path='about' element={<AboutScreen />} />
          <Route path='login' element={<LoginScreen />} />
          <Route path='register' element={<RegisterScreen />} />
          <Route path='profile'>
            <Route path=':username' element={<ProfileScreen />} />
          </Route>
          <Route
            path='profile/:username/followers'
            element={<FollowerListScreen />}
          />
          <Route
            path='profile/:username/followings'
            element={<FollowingListScreen />}
          />
          <Route path='recipe'>
            <Route path=':id' element={<RecipeScreen />} />
          </Route>
          <Route path='recipe/:id/likes' element={<LikeListScreen />} />
          <Route path='notfound' element={<NotFoundScreen />} />
          <Route path='*' element={<NotFoundScreen />} />
        </Routes>
      </main>

      <Footer />
    </Compose>
  )
}

export default App
