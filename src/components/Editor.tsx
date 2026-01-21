'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Heading1, Heading2, Heading3,
    Link as LinkIcon, Undo, Redo, Type, Eraser,
    Highlighter, Palette, Image as ImageIcon
} from 'lucide-react';
import { useRef } from 'react';

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                editor.chain().focus().setImage({ src: data.url }).run();
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (error) {
            console.error('Image upload error:', error);
            alert('An error occurred while uploading the image.');
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-xl sticky top-0 z-10">
            <div className="flex items-center gap-1 pr-2 border-r border-gray-300">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('bold') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Bold"
                >
                    <Bold size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('italic') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Italic"
                >
                    <Italic size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('underline') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Underline"
                >
                    <UnderlineIcon size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('strike') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Strikethrough"
                >
                    <Strikethrough size={18} />
                </button>
            </div>

            <div className="flex items-center gap-1 px-2 border-r border-gray-300">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive({ textAlign: 'left' }) ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Align Left"
                >
                    <AlignLeft size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive({ textAlign: 'center' }) ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Align Center"
                >
                    <AlignCenter size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive({ textAlign: 'right' }) ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Align Right"
                >
                    <AlignRight size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive({ textAlign: 'justify' }) ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Justify"
                >
                    <AlignJustify size={18} />
                </button>
            </div>

            <div className="flex items-center gap-1 px-2 border-r border-gray-300">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('heading', { level: 3 }) ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Heading 3"
                >
                    <Heading3 size={18} />
                </button>
            </div>

            <div className="flex items-center gap-1 px-2 border-r border-gray-300">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('bulletList') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Bullet List"
                >
                    <List size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('orderedList') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Ordered List"
                >
                    <ListOrdered size={18} />
                </button>
            </div>

            <div className="flex items-center gap-1 px-2 border-r border-gray-300">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded hover:bg-gray-200 transition text-gray-600"
                    title="Insert Image"
                >
                    <ImageIcon size={18} />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </button>
                <button
                    type="button"
                    onClick={addLink}
                    className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('link') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                    title="Add Link"
                >
                    <LinkIcon size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    className="p-2 rounded hover:bg-gray-200 transition text-gray-600"
                    title="Clear Formatting"
                >
                    <Eraser size={18} />
                </button>
            </div>

            <div className="flex items-center gap-1 px-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="p-2 rounded hover:bg-gray-200 transition text-gray-600 disabled:opacity-30"
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="p-2 rounded hover:bg-gray-200 transition text-gray-600 disabled:opacity-30"
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo size={18} />
                </button>
            </div>
        </div>
    );
};

export default function Editor({ content, onChange, placeholder }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-indigo-600 underline cursor-pointer',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Start writing...',
            }),
            Image.configure({
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-xl max-w-full h-auto my-6 mx-auto shadow-md border border-gray-100 block',
                },
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-indigo max-w-none min-h-[300px] p-6 focus:outline-none focus:ring-0 text-gray-900',
            },
        },
        immediatelyRender: false,
    });

    return (
        <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all bg-white">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
