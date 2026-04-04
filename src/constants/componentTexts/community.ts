export const communityPageTexts = {
    categories: {
        browseTitle: 'Browse Categories',
        viewAll: 'View All',
        list: [
            {
                id: 1,
                title: 'Support Groups',
                description: 'Find specialized peer-led sessions',
                count: '10 Active Groups'
            },
            {
                id: 2,
                title: 'Success Stories',
                description: 'Inspiration from milestones reached',
                count: '452 Stories'
            },
            {
                id: 3,
                title: 'Nutrition',
                description: 'Fueling your body for recovery',
                count: 'New Recipes'
            },
            {
                id: 4,
                title: 'Yoga & Movement',
                description: 'Healing through somatic practice',
                count: 'Live Today'
            }
        ]
    },
    posts: {
        tabs: [
            'Popular',
            'Recent',
            'Unanswered'
        ],
        defaultTab: 'Popular',
        videoDuration: '10:24',
        postedBy: 'Posted by',
        repliesLabel: 'replies',
        share: 'Share',
        save: 'Save',
        newPostButton: 'New Post',
        list: [
            {
                id: 1,
                category: 'Success Stories',
                categoryColor: 'bg-purple-100 text-purple-700',
                author: 'Marcus T.',
                timeAgo: '3 hours ago',
                title: 'My first 90 days: Finding peace in the routine of early mornings.',
                content: `I used to dread the sunrise because it meant another day of struggle. Now, my 5 AM tea and meditation are the anchor of my day. If you're in the first...`,
                votes: 47,
                replies: 18,
                hasMedia: false
            },
            {
                id: 2,
                category: 'Support Groups',
                categoryColor: 'bg-blue-100 text-blue-700',
                author: 'Sarah Jenkins',
                timeAgo: '5 hours ago',
                title: 'Managing social anxiety during family gatherings this weekend',
                content: `Does anyone have tips for navigating conversations about 'why I'm not drinking' with pushy relatives? Feeling a bit nervous about the upcoming...`,
                votes: 123,
                replies: 42,
                hasMedia: false
            },
            {
                id: 3,
                category: 'Yoga & Movement',
                categoryColor: 'bg-emerald-100 text-emerald-700',
                author: 'YogaCoach_Ben',
                timeAgo: '8 hours ago',
                title: 'Gentle 10-minute flow for releasing neck tension.',
                content: '',
                votes: 89,
                replies: 24,
                hasMedia: true
            }
        ]
    },
    mentors: {
        title: 'Recovery Mentors',
        chatButton: 'Chat',
        list: [
            {
                id: 1,
                name: 'David Chen',
                role: 'Certified Coach',
                avatar: 'D',
                online: true,
            },
            {
                id: 2,
                name: 'Maria G.',
                role: 'Wellness Guide',
                avatar: 'M',
                online: false,
            }
        ]
    },
    sanctuary: {
        title: 'Community Sanctuary',
        description: 'HealEase is a safe, non-judgmental space. We prioritize empathy, privacy, and supportive dialogue.',
        rules: [
            'Be kind and be open',
            'No unsolicited medical advice',
            'Protect user anonymity'
        ],
        readGuidelines: 'Read Guidelines'
    },
    trending: {
        title: 'Trending Topics',
        topics: [
            '#DailyGratitude',
            '#SobrietyTips',
            '#HealthyHabits',
            '#SelfCare',
            '#SleepHygiene'
        ]
    },
    activity: {
        title: 'Community',
        viewAll: 'View All',
        list: [
            {
                id: 1,
                user: 'Sarah',
                action: 'shared a milestone',
                time: '30 min ago',
                avatar: 'S',
                avatarBg: 'bg-pink-100 text-pink-600'
            },
            {
                id: 2,
                user: 'James',
                action: 'joined the Yoga group',
                time: '1 hour ago',
                avatar: 'J',
                avatarBg: 'bg-blue-100 text-blue-600'
            },
            {
                id: 3,
                user: 'Marcus',
                action: 'posted a question',
                time: '2 hours ago',
                avatar: 'M',
                avatarBg: 'bg-emerald-100 text-emerald-600'
            },
            {
                id: 4,
                user: 'Elena',
                action: 'replied to a post',
                time: '3 hours ago',
                avatar: 'E',
                avatarBg: 'bg-purple-100 text-purple-600'
            },
            {
                id: 5,
                user: 'David',
                action: 'started a new discussion',
                time: '4 hours ago',
                avatar: 'D',
                avatarBg: 'bg-orange-100 text-orange-600'
            }
        ]
    }
}
