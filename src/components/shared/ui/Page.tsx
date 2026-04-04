import { PropsWithChildren } from 'react'

export const Page = ({ children }: PropsWithChildren) => (
    <main className={'min-h-screen w-full p-6'}>
        {children}
    </main>
)
