import AuthProvider from './contexts/AuthContext'
import { routes } from './routes/routes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} Component={route.component}>
              {route.children?.map((child, index) => (
                <Route key={index} path={child.path} Component={child.component}></Route>
              ))}
            </Route>
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
