import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { NetworkErrorActions } from '@/components/shared/error/network/NetworkErrorActions'
import { NetworkErrorContent } from '@/components/shared/error/network/NetworkErrorContent'
import { NetworkErrorIllustration } from '@/components/shared/error/network/NetworkErrorIllustration'
import { NetworkErrorSupport } from '@/components/shared/error/network/NetworkErrorSupport'

const NetworkErrorPage = () => (
    <div className={'flex'}>
        <Sidebar isErrorPage={true}/>
        <main className={'flex-grow flex items-center justify-center px-6 pt-20 pb-12'}>
            <div className={'max-w-2xl w-full text-center space-y-12'}>
                <NetworkErrorIllustration/>
                <NetworkErrorContent/>
                <NetworkErrorActions/>
                <NetworkErrorSupport/>
            </div>
        </main>
    </div>
)

export default NetworkErrorPage