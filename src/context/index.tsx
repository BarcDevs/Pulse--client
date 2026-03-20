import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {Toaster} from 'sonner'

import {QueryClientProvider} from '@tanstack/react-query'

import {LayoutProps} from '@/types'

import {queryClient} from '@/lib/queryClient'

import {LangProvider} from '@/context/langContext'

import {persistor, store} from '@/store'

const ContextProvider = ({children}: LayoutProps) => (
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <LangProvider>
                    {children}
                </LangProvider>
                <Toaster/>
            </QueryClientProvider>
        </PersistGate>
    </Provider>
)

export default ContextProvider
