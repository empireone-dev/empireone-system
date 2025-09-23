import Layout from '@/app/pages/users/layout'
import React, { useEffect } from 'react'
import PurchaseRequestLayout from './layout'
import PurchaseRequestTable from './_sections/purchase-request-table'
import store from '@/app/store/store';
import { get_purchase_request_thunk } from '@/app/redux/accounting-thunk';

export default function Page() {
  useEffect(() => {
        store.dispatch(get_purchase_request_thunk());
    }, []);
  return (
    <Layout>
            <PurchaseRequestTable />
    </Layout>
  )
}
