export const reactQuillSetup = {
    modules: {
        toolbar: [
            [{
                'header': [1,
                    2,
                    3,
                    false]
            }],
            [
                'bold',
                'italic',
                'underline',
                'strike'
            ],
            [
                { 'color': [] },
                { 'background': [] }
            ],
            [
                { 'align': [] }],
            [
                { 'list': 'ordered' },
                { 'list': 'bullet' }
            ],
            [
                { 'indent': '-1' },
                { 'indent': '+1' }
            ],
            ['link'], // TODO: add 'image' once server-side image upload is implemented
            ['clean']
        ]
    },
    formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
        'align',
        'list',
        'indent',
        'link'
        // TODO: add 'image' once server-side image upload is implemented
    ]
}