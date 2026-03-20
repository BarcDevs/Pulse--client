export const REACT_QUILL_SETUP = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    },
    formats: [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'align',
        'list',
        'indent',
        'link', 'image'
    ]
}