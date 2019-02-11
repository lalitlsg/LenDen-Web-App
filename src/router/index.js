import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEntry from '@/components/newEntry'
import ViewAmount from '@/components/viewAmount'
import EditAmount from '@/components/editAmount'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-entry',
      component: NewEntry
    },
    {
      path: '/:SrNo',
      name: 'view-amount',
      component: ViewAmount
    },
    {
      path: '/edit/:SrNo',
      name: 'edit-amount',
      component: EditAmount
    },
  ]
})
