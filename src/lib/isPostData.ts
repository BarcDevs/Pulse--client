type PostData = {
    category: string
    title: string
    body: string
    tags: Array<{ name: string }>
}

export const isPostData = (data: any): data is PostData => {
    return data &&
        typeof data.category === 'string' &&
        typeof data.title === 'string' &&
        typeof data.body === 'string' &&
        Array.isArray(data.tags)
}
