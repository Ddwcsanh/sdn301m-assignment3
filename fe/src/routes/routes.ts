import HomePage from '~/pages/Home'
import Layout from '~/pages/Layout'
import LoginRegisterPage from '~/pages/LoginRegister'
import OrchidDetailsPage from '~/pages/OrchidDetail'
import ProfilePage from '~/pages/Profile'
import DashboardPage from '~/pages/admin/Dashboard'

export const routes = [
  {
    path: '/login-register',
    component: LoginRegisterPage
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: HomePage
      },
      {
        path: '/orchid/:slug',
        component: OrchidDetailsPage
      },
      {
        path: '/management',
        component: DashboardPage
      },
      {
        path: '/profile',
        component: ProfilePage
      }
    ]
  }
]
