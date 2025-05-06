"use client";
import React, { useEffect, useState } from "react";
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

import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";

interface TermsItem {
  terms_and_condition_id: number;
  Terms_and_Conditions: string;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}

const EditorPages = () => {
  const [termsList, setTermsList] = useState<TermsItem[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlock,
      HorizontalRule,
      Blockquote,
      TextStyle,
      Color,
    ],
    content: "<p>Write Here </p>",
  });

  const fetchTerms = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: "/get_terms_conditions",
      });
      const allTerms = res?.data?.data?.result || [];
      setTermsList(allTerms);
    } catch (error) {
      toast.error("Failed to load terms and conditions.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (editor) fetchTerms();
  }, [editor]);

  const handleSave = async () => {
    if (!editor) return;

    const htmlContent = editor.getHTML().trim();
    const isEmpty = htmlContent === "<p></p>" || htmlContent === "";

    if (isEmpty) {
      toast.warning("Cannot save empty content.");
      return;
    }

    const formdata = new URLSearchParams();
    formdata.append("text", htmlContent);

    try {
      await apiRequest({
        method: "post",
        url: "/terms_and_condition",
        data: formdata,
      });

      toast.success("Terms & Conditions saved successfully!");
      fetchTerms();
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save Terms & Conditions.");
    }
  };

  if (!editor) return null;

  return (
    <main className="py-5">
      <div className="w-full p-6 bg-white rounded-md shadow">
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
          className="min-h-[300px] !border-none p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg max-w-none"
        />

        {/* Save Button */}
        <div className="mt-4 text-right">
          <button
            onClick={handleSave}
            className="bg-[#FCC827] text-black font-bold py-2 px-4 rounded hover:bg-yellow-400"
          >
            Add Page
          </button>
        </div>
      </div>

      {/* All Previous Terms */}
      <div className="mt-10 bg-white p-6 rounded-md shadow">
        <h3 className="text-lg font-semibold mb-4">All Previous Entries</h3>
        <ul className="space-y-4">
          {termsList
            .filter((item) => item?.Terms_and_Conditions?.trim() !== "")
            .map((item) => (
              <li
                key={item?.terms_and_condition_id}
                className="bg-gray-100 p-3 rounded"
              >
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: item.Terms_and_Conditions,
                  }}
                />
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};

// Toolbar Button
function ToolbarButton({ icon, onClick, active }: ToolbarButtonProps) {
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
