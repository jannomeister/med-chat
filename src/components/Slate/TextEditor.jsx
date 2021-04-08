import React, { useState, useMemo, useCallback } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Editor, Text, Transforms } from "slate";

// components
import DefaultElement from "./DefaultElement";
import CodeElement from "./CodeElement";
import BlockquoteElement from "./BlockquoteElement";
import BulletedListElement from "./BulletedListElement";
import Leaf from "./Leaf";

const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      children: [
        {
          text: "Testing",
        },
      ],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "blockquote":
        return <BlockquoteElement {...props} />;
      case "bulleted-list":
        return <BulletedListElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const CustomEditor = {
    isBoldMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.bold === true,
        universal: true,
      });

      return !!match;
    },
    isItalicMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.italic === true,
        universal: true,
      });

      return !!match;
    },
    isStrikethroughMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.strikethrough === true,
        universal: true,
      });

      return !!match;
    },
    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === "code",
      });

      return !!match;
    },
    isBlockquoteActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === "blockquote",
      });

      return !!match;
    },
    isBulletlistActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === "bulleted-list",
      });

      return !!match;
    },
    toggleBoldMark(editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor);
      Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: (n) => Text.isText(n), split: true }
      );
    },
    toggleItalicMark(editor) {
      const isActive = CustomEditor.isItalicMarkActive(editor);
      Transforms.setNodes(
        editor,
        { italic: isActive ? null : true },
        { match: (n) => Text.isText(n), split: true }
      );
    },
    toggleStrikthroughMark(editor) {
      const isActive = CustomEditor.isStrikethroughMarkActive(editor);
      Transforms.setNodes(
        editor,
        { strikethrough: isActive ? null : true },
        { match: (n) => Text.isText(n), split: true }
      );
    },
    toggleCodeBlock(editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor);
      Transforms.setNodes(
        editor,
        { type: isActive ? null : "code" },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    },
    toggleBlockquote(editor) {
      const isActive = CustomEditor.isBlockquoteActive(editor);
      Transforms.setNodes(
        editor,
        { type: isActive ? null : "blockquote" },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    },
    toggleBulletlist(editor) {
      const isActive = CustomEditor.isBulletlistActive(editor);
      Transforms.setNodes(
        editor,
        { type: isActive ? null : "bulleted-list" },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    },
  };

  const onKeyDown = (e) => {
    if (!e.ctrlKey) return;

    e.preventDefault();

    if (e.key === "b") {
      CustomEditor.toggleBoldMark(editor);
    } else if (e.key === "i") {
      CustomEditor.toggleItalicMark(editor);
    } else if (e.key === "`") {
      CustomEditor.toggleCodeBlock(editor);
    } else if (e.key === "X" && e.shiftKey) {
      CustomEditor.toggleStrikthroughMark(editor);
    } else if (e.key === "(" && e.shiftKey) {
      CustomEditor.toggleBlockquote(editor);
    } else if (e.key === "*" && e.shiftKey) {
      CustomEditor.toggleBulletlist(editor);
    } else {
      return;
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
      <Editable
        className="w-full resize-none outline-none"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
        placeholder="Type your message..."
      />
    </Slate>
  );
};

export default TextEditor;
