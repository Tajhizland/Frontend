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
                // apiKey='q3mi6er3ude1zs29ao9hrwyywp9j8zxi4f781hiwnh2un0nt'
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={value}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
                    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",

                    // plugins: [
                    //     'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    //     'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    //     'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    // ],
                    // toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
}

export default TinyEditor;

