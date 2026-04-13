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
        filterLabels: {
            newest: 'Newest',
            popular: 'Popular',
            hot: 'Hot',
            unanswered: 'Unanswered'
        },
        repliesLabel: 'replies',
        postedBy: 'Posted by',
        share: 'Share',
        save: 'Save',
        newPostButton: 'New Post',
        loading: 'Loading posts...',
        empty: 'No posts yet. Be the first to share your journey and inspire others.',
        emptyWithFilter: (tag: string) =>
            `No posts found with tag "#${tag}". Try a different tag or browse all posts.`
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
                online: true
            },
            {
                id: 2,
                name: 'Maria G.',
                role: 'Wellness Guide',
                avatar: 'M',
                online: false
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
        loading: 'Loading topics...'
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
                avatar: 'S'
            },
            {
                id: 2,
                user: 'James',
                action: 'joined the Yoga group',
                time: '1 hour ago',
                avatar: 'J'
            },
            {
                id: 3,
                user: 'Marcus',
                action: 'posted a question',
                time: '2 hours ago',
                avatar: 'M'
            },
            {
                id: 4,
                user: 'Elena',
                action: 'replied to a post',
                time: '3 hours ago',
                avatar: 'E'
            },
            {
                id: 5,
                user: 'David',
                action: 'started a new discussion',
                time: '4 hours ago',
                avatar: 'D'
            }
        ]
    },
    confirmations: {
        deletePost: 'Are you sure you want to delete this post?',
        deleteReply: 'Are you sure you want to delete this reply?'
    },
    postDetail: {
        loading: 'Loading replies...',
        replies: 'Replies',
        reply: 'Reply',
        noReplies: 'No replies yet. Be the first to share your thoughts!',
        loginToReply: 'Please log in to reply',
        loginButton: 'Log In',
        notFoundTitle: 'Post not found',
        notFoundDescription: 'The post you are looking for does not exist or has been deleted.',
        backToCommunity: 'Back to Community',
        repliesLoadError: 'Failed to load replies',
        postLoadError: 'Failed to load post. Please check your connection.'
    },
    postActions: {
        solidarity: 'Solidarity',
        reply: 'Reply',
        share: 'Share'
    },
    postForm: {
        writeReply: 'Write a Reply',
        createPost: 'Create Post',
        content: 'Content',
        cancel: 'Cancel',
        sendReply: 'Send Reply',
        title: 'Title',
        titlePlaceholder: 'Post title',
        category: 'Category',
        categoryPlaceholder: 'Select category',
        bodyPlaceholderReply: 'Write your reply...',
        bodyPlaceholderPost: 'Write your post...'
    }
}
