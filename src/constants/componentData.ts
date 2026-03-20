import {Activity, BarChart2, Lightbulb,MessageSquare} from 'lucide-react'

const FEATURES = [
    {
        icon: Activity,
        title: 'Daily Check-ins',
        description: 'Track your recovery progress with structured daily check-ins designed for clarity and insight.'
    },
    {
        icon: Lightbulb,
        title: 'AI Insights',
        description: 'Get personalized behavioral insights to support your recovery journey.'
    },
    {
        icon: BarChart2,
        title: 'Progress Visibility',
        description: 'See your recovery arc with clear tracking and milestone celebration.'
    },
    {
        icon: MessageSquare,
        title: 'Community Forum',
        description: 'Connect with others on similar recovery paths. Share experiences and find support.'
    }
]

const BENEFITS = [
    {
        title: 'Track Daily Progress',
        description: 'Mood and pain scores with activity logs help you see the real arc of your recovery over time.',
        gradient: 'from-blue-500 to-blue-600'
    },
    {
        title: 'Get AI Guidance',
        description: 'Personalized insights after each check-in help you understand patterns and make better choices.',
        gradient: 'from-green-500 to-green-600'
    },
    {
        title: 'Connect with Others',
        description: 'Talk with people going through similar recoveries. Shared experience reduces isolation and builds confidence.',
        gradient: 'from-purple-500 to-purple-600'
    }
]

const NAV_LINKS = [
    {
        title: 'Home',
        href: '/'
    },
    {
        authenticatedOnly: true,
        title: 'Check-ins',
        href: '/check-in'
    },
    {
        title: 'Forum',
        href: '/forum'
    },
    {
        homepageLink: true,
        title: 'Features',
        href: '/#features'
    },
    {
        homepageLink: true,
        title: 'Benefits',
        href: '/#benefits'
    },
    {
        homepageLink: true,
        title: 'About',
        href: '/#about'
    }
]

const FOOTER_LINKS = {
    quick: [
        {
            title: 'About',
            href: '/about'
        },
        {
            title: 'Contact',
            href: '/contact'
        },
        {
            title: 'Support',
            href: '/support'
        }
    ],
    legal: [
        {
            title: 'Terms',
            href: '/terms'
        },
        {
            title: 'Privacy',
            href: '/privacy'
        },
        {
            title: 'Cookies',
            href: '/cookies'
        }
    ]
}

const SOCIAL_LINKS = [
    {
        title: 'Facebook',
        href: 'https://www.facebook.com/HealEase-109044114129580'
    },
    {
        title: 'X',
        href: 'https://www.instagram.com/healease.co/'
    },
    {
        title: 'linkedin',
        href: 'https://www.linkedin.com/company/healease/'
    }
]

export {
    BENEFITS,
    FEATURES,
    FOOTER_LINKS,
    NAV_LINKS,
    SOCIAL_LINKS
}
