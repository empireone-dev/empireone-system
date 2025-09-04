import Layout from '@/app/pages/users/layout'
import React from 'react'
import PurchaseRequestLayout from '../layout'
import PurchaseRequestTable from './_sections/purchase-request-table'

export default function Page() {
  return (
    <Layout>
        <PurchaseRequestLayout>
            <PurchaseRequestTable />
        </PurchaseRequestLayout>
    </Layout>
  )
}
