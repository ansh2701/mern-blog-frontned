//rrd imports
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//layout
import MainLayout from './layout/MainLayout'

//Loader&Action
import { navbarLoader } from './components/Navbar'
import { logoutAction } from './actions/logout'

//pages
import Home, { homeLoader } from './pages/Home'
import Login, { loginAction } from './pages/Login'
import Register, { registerAction } from './pages/Register'
import CreatePost, { createAction } from './pages/CreatePost'
import PostPage, { postLoader } from './pages/PostPage'
import EditPost, { editAction } from './pages/EditPost'
import Error from './pages/Error'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>} loader={navbarLoader} id='root' errorElement={<Error />}>
      <Route index element={<Home/>} loader={homeLoader}/>
      <Route path="login" element={<Login/>} action={loginAction}/>
      <Route path="create" element={<CreatePost/>} action={createAction}/>
      <Route path="post/:id" element={<PostPage/>} loader={postLoader}/>
      <Route path="edit/:id" element={<EditPost/>} loader={postLoader} action={editAction}/>
      <Route path="register" element={<Register/>} action={registerAction}/>
      <Route path="logout" action={logoutAction} />
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
