import {Editor} from "@monaco-editor/react";
import mock from "../mock";
import {useEffect, useMemo, useRef, useState} from "react";
import * as monaco from 'monaco-editor'

// 用于文件base64解码后的格式化
export function getDecode(str: string) {
    return decodeURIComponent(
        atob(str)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
    );
}

const Report = () => {
    const [editor, setEditor] = useState<any>(false);
    const editorRef = useRef(null);

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor;
        setEditor(editor);
    }
    const decorations = useMemo(() => {


        return [
            {
            inlineClassName: "coverage-if",
            startLine: 20,
            startCol: 3,
            endLine: 20,
            endCol: 5
        }]
    }, []);

    useEffect(() => {
        if (editor) {

            const d = [
                {
                    range: new monaco.Range(20, 3, 20, 3), // 第3行第5列前插入
                    options: {
                        beforeContentClassName: 'insert-e-decoration',
                        stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
                    }
                }
            ]

            editor?.deltaDecorations?.(
                [], // oldDecorations 每次清空上次标记的
                d,
            );
        }
    }, [editor, decorations]);

    return <div>
      <Editor
          onMount={handleEditorDidMount}
          options={{
              lineHeight: 18,
              readOnly: true,
              folding: false,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              showUnused: false,
              fontSize: 12,
              scrollbar: {
                  // handleMouseWheel: false,
              },
              contextmenu: false,
      }} value={getDecode(mock.content)} height={'100vh'} language={'javascript'}/>
  </div>
}

export default Report