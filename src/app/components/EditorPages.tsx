"use client";
import React from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Blockquote from "@tiptap/extension-blockquote";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
  Minus,
  Redo,
  Undo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Trash,
} from "lucide-react";

const EditorPages = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlock,
      HorizontalRule,
      Blockquote,
      TextStyle,
      Color,
    ],
    content: "<p>Edit me ✍️</p>",
  });

  if (!editor) return null;
  return (
    <main className="  p-6">
      {/* Logo */}

      {/* Editor */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-4">
          <ToolbarButton
            icon={<Bold size={16} />}
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          />
          <ToolbarButton
            icon={<Italic size={16} />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          />
          <ToolbarButton
            icon={<UnderlineIcon size={16} />}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          />
          <ToolbarButton
            icon={<Strikethrough size={16} />}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
          />
          <ToolbarButton
            icon={<Heading1 size={16} />}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
          />
          <ToolbarButton
            icon={<Heading2 size={16} />}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          />
          <ToolbarButton
            icon={<List size={16} />}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          />
          <ToolbarButton
            icon={<ListOrdered size={16} />}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          />
          <ToolbarButton
            icon={<Quote size={16} />}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          />
          <ToolbarButton
            icon={<Code2 size={16} />}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
          />
          <ToolbarButton
            icon={<Minus size={16} />}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
          <ToolbarButton
            icon={<LinkIcon size={16} />}
            onClick={() =>
              editor
                .chain()
                .focus()
                .setLink({ href: "https://example.com" })
                .run()
            }
          />
          <ToolbarButton
            icon={<ImageIcon size={16} />}
            onClick={() =>
              editor
                .chain()
                .focus()
                .setImage({ src: "https://placekitten.com/300/200" })
                .run()
            }
          />
          <ToolbarButton
            icon={<AlignLeft size={16} />}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          />
          <ToolbarButton
            icon={<AlignCenter size={16} />}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          />
          <ToolbarButton
            icon={<AlignRight size={16} />}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          />
          <ToolbarButton
            icon={<AlignJustify size={16} />}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          />
          <ToolbarButton
            icon={<Undo size={16} />}
            onClick={() => editor.chain().focus().undo().run()}
          />
          <ToolbarButton
            icon={<Redo size={16} />}
            onClick={() => editor.chain().focus().redo().run()}
          />
          <ToolbarButton
            icon={<Trash size={16} />}
            onClick={() => editor.chain().focus().clearNodes().run()}
          />
        </div>

        {/* Editor Content */}
        <EditorContent
          editor={editor}
          className="min-h-[300px]  p-4  focus:outline-none prose prose-sm sm:prose lg:prose-lg max-w-none"
        />
      </div>
    </main>
  );
};

// Reusable toolbar button component
function ToolbarButton({ icon, onClick, active }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded border text-sm ${
        active ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {icon}
    </button>
  );
}

export default EditorPages;
