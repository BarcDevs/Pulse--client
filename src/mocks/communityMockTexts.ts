export const COMMUNITY_UPDATES = [
    {
        name: 'Sarah',
        action: 'shared a milestone',
        timestamp: '30 minutes ago',
        avatarBg: 'bg-pink-500',
    },
    {
        name: 'James',
        action: 'joined the Yoga group',
        timestamp: '1 hour ago',
        avatarBg: 'bg-blue-500',
    },
    {
        name: 'Marcus',
        action: 'posted a question',
        timestamp: '2 hours ago',
        avatarBg: 'bg-green-500',
    },
]

export const COMMUNITY_UPDATES_TRANSFORMED =
    COMMUNITY_UPDATES.map((update) => ({
        name: update.name,
        action: update.action,
        time: update.timestamp,
        avatar: update.name.charAt(0),
        avatarBg: update.avatarBg
    }))
