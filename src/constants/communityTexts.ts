const COMMUNITY_BROWSE_CATEGORIES = 'Browse Categories'

const COMMUNITY_VIEW_ALL = 'View All'

const COMMUNITY_CATEGORIES = [
    {
        id: 1,
        title: 'Support Groups',
        description: 'Find specialized peer-led sessions',
        count: '10 Active Groups',
    },
    {
        id: 2,
        title: 'Success Stories',
        description: 'Inspiration from milestones reached',
        count: '452 Stories',
    },
    {
        id: 3,
        title: 'Nutrition',
        description: 'Fueling your body for recovery',
        count: 'New Recipes',
    },
    {
        id: 4,
        title: 'Yoga & Movement',
        description: 'Healing through somatic practice',
        count: 'Live Today',
    },
]

const COMMUNITY_TABS = [
    'Popular',
    'Recent',
    'Unanswered',
]

const COMMUNITY_POSTS = [
    {
        id: 1,
        category: 'Success Stories',
        categoryColor: 'bg-purple-100 text-purple-700',
        author: 'Marcus T.',
        timeAgo: '3 hours ago',
        title: 'My first 90 days: Finding peace in the routine of early mornings.',
        content: 'I used to dread the sunrise because it meant another day of struggle. Now, my 5 AM tea and meditation are the anchor of my day. If you\'re in the first...',
        votes: 47,
        replies: 18,
        hasMedia: false,
    },
    {
        id: 2,
        category: 'Support Groups',
        categoryColor: 'bg-blue-100 text-blue-700',
        author: 'Sarah Jenkins',
        timeAgo: '5 hours ago',
        title: 'Managing social anxiety during family gatherings this weekend',
        content: 'Does anyone have tips for navigating conversations about \'why I\'m not drinking\' with pushy relatives? Feeling a bit nervous about the upcoming...',
        votes: 123,
        replies: 42,
        hasMedia: false,
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
        hasMedia: true,
    },
]

const COMMUNITY_POSTED_BY = 'Posted by'

const COMMUNITY_REPLIES_LABEL = 'replies'

const COMMUNITY_SHARE = 'Share'

const COMMUNITY_SAVE = 'Save'

const COMMUNITY_POST_DEFAULT_TAB = 'Popular'

const COMMUNITY_POST_VIDEO_DURATION = '10:24'

const COMMUNITY_NEW_POST_BUTTON = 'New Post'

const COMMUNITY_MENTORS_TITLE = 'Recovery Mentors'

const COMMUNITY_MENTORS = [
    { id: 1, name: 'David Chen', role: 'Certified Coach', avatar: 'D', online: true },
    { id: 2, name: 'Maria G.', role: 'Wellness Guide', avatar: 'M', online: false },
]

const COMMUNITY_MENTORS_CHAT = 'Chat'

const COMMUNITY_SANCTUARY_TITLE = 'Community Sanctuary'

const COMMUNITY_SANCTUARY_DESCRIPTION = 'HealEase is a safe, non-judgmental space. We prioritize empathy, privacy, and supportive dialogue.'

const COMMUNITY_SANCTUARY_RULE_1 = 'Be kind and be open'

const COMMUNITY_SANCTUARY_RULE_2 = 'No unsolicited medical advice'

const COMMUNITY_SANCTUARY_RULE_3 = 'Protect user anonymity'

const COMMUNITY_SANCTUARY_READ_GUIDELINES = 'Read Guidelines'

const COMMUNITY_TRENDING_TOPICS_TITLE = 'Trending Topics'

const COMMUNITY_TRENDING_TOPICS = [
    '#DailyGratitude',
    '#SobrietyTips',
    '#HealthyHabits',
    '#SelfCare',
    '#SleepHygiene',
]

const COMMUNITY_ACTIVITY_TITLE = 'Community'

const COMMUNITY_ACTIVITY_VIEW_ALL = 'View All'

const COMMUNITY_ACTIVITY_LIST = [
    {
        id: 1,
        user: 'Sarah',
        action: 'shared a milestone',
        time: '30 min ago',
        avatar: 'S',
        avatarBg: 'bg-pink-100 text-pink-600',
    },
    {
        id: 2,
        user: 'James',
        action: 'joined the Yoga group',
        time: '1 hour ago',
        avatar: 'J',
        avatarBg: 'bg-blue-100 text-blue-600',
    },
    {
        id: 3,
        user: 'Marcus',
        action: 'posted a question',
        time: '2 hours ago',
        avatar: 'M',
        avatarBg: 'bg-emerald-100 text-emerald-600',
    },
]

export {
    COMMUNITY_ACTIVITY_LIST,
    COMMUNITY_ACTIVITY_TITLE,
    COMMUNITY_ACTIVITY_VIEW_ALL,
    COMMUNITY_BROWSE_CATEGORIES,
    COMMUNITY_CATEGORIES,
    COMMUNITY_MENTORS,
    COMMUNITY_MENTORS_CHAT,
    COMMUNITY_MENTORS_TITLE,
    COMMUNITY_NEW_POST_BUTTON,
    COMMUNITY_POST_DEFAULT_TAB,
    COMMUNITY_POST_VIDEO_DURATION,
    COMMUNITY_POSTED_BY,
    COMMUNITY_POSTS,
    COMMUNITY_REPLIES_LABEL,
    COMMUNITY_SANCTUARY_DESCRIPTION,
    COMMUNITY_SANCTUARY_READ_GUIDELINES,
    COMMUNITY_SANCTUARY_RULE_1,
    COMMUNITY_SANCTUARY_RULE_2,
    COMMUNITY_SANCTUARY_RULE_3,
    COMMUNITY_SANCTUARY_TITLE,
    COMMUNITY_SAVE,
    COMMUNITY_SHARE,
    COMMUNITY_TABS,
    COMMUNITY_TRENDING_TOPICS,
    COMMUNITY_TRENDING_TOPICS_TITLE,
    COMMUNITY_VIEW_ALL,
}
