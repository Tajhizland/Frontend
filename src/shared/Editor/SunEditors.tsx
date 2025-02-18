"use client"
import React, { useRef } from "react";
import SunEditor, {buttonList} from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


interface TinyEditorProps {
    value?: string;
    name: string;
}

const SunEditors = ({ value ,name }:TinyEditorProps) => {
    //@ts-ignore
    const editor = useRef<SunEditorCore>();

    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };
    return (
        <div className={"w-full"}>
            <SunEditor
                setOptions={{
                    height: "200",
                    buttonList: buttonList.complex
                }}

                name={name}
                defaultValue={value}
                setContents={value}
                setAllPlugins={true}
                getSunEditorInstance={getSunEditorInstance} />
        </div>
    );
};
export default SunEditors;
