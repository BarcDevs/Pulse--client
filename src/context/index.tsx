import {Toaster} from 'sonner'

// TODO: Redux setup pending
// import {Provider} from 'react-redux'
// import {PersistGate} from 'redux-persist/integration/react'
// TODO: TanStack Query setup pending
// import {QueryClientProvider} from '@tanstack/react-query'
// import {queryClient} from '@/lib/queryClient'
// import {persistor, store} from '@/store'
import {LayoutProps} from '@/types'

import {LangProvider} from '@/context/langContext'

const ContextProvider = ({children}: LayoutProps) => (
    <LangProvider>
        {children}
        <Toaster/>
    </LangProvider>
)

export default ContextProvider
