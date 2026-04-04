import { Toaster } from 'sonner'

import { LayoutProps } from '@/types'

import { LangProvider } from '@/context/langContext'

const ContextProvider = ({ children }: LayoutProps) => (
    <LangProvider>
        {children}
        <Toaster/>
    </LangProvider>
)

export default ContextProvider
