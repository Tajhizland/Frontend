import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyEditorProps {
    value?: string;
    name: string;
}

const TinyEditor: React.FC<TinyEditorProps> = ({ value ,name }) => {
    const editorRef = useRef<any>(null);

    return (
        <>
            <Editor
                textareaName={name}
                apiKey='kp9pxdgoj5z9ohilbu3yf7gq1hkl9uvdz70oeoec0a6odmdu'
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={value}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
}

export default TinyEditor;

