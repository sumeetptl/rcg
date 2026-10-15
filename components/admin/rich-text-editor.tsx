"use client"

import { useEffect, useCallback } from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapLink from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Highlight } from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Link as LinkIcon,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Minus,
  Table as TableIcon,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Code2,
  Heading1,
  Type,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const ToolbarButton = ({ children, onClick, pressed, title }: {
  children: React.ReactNode
  onClick: () => void
  pressed?: boolean
  title: string
}) => (
  <Toggle
    size="sm"
    pressed={pressed}
    onPressedChange={onClick}
    aria-label={title}
    title={title}
    className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
  >
    {children}
  </Toggle>
)

const EditorToolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  return (
    <div className="border border-input bg-muted/30 rounded-t-md p-1.5 flex flex-wrap items-center gap-0.5 sticky top-0 z-10 backdrop-blur-sm">
      {/* History */}
      <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1.5" />

      {/* Headings */}
      <ToolbarButton title="Heading 1" pressed={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Heading 2" pressed={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Heading 3" pressed={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1.5" />

      {/* Text Formatting */}
      <ToolbarButton title="Bold" pressed={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Italic" pressed={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Underline" pressed={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" pressed={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Inline Code" pressed={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1.5" />

      {/* Highlight & Color */}
      <ToolbarButton title="Highlight" pressed={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}>
        <Highlighter className="h-3.5 w-3.5" />
      </ToolbarButton>
      <div className="flex items-center gap-0.5" title="Text Color">
        <Type className="h-3.5 w-3.5 text-muted-foreground ml-0.5" />
        <input
          type="color"
          className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
          value={editor.getAttributes('textStyle').color || '#000000'}
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          title="Text Color"
        />
      </div>

      <Separator orientation="vertical" className="h-5 mx-1.5" />

      {/* Alignment */}
      <ToolbarButton title="Align Left" pressed={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <AlignLeft className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Align Center" pressed={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        <AlignCenter className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Align Right" pressed={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
        <AlignRight className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1.5" />

      {/* Lists & Blocks */}
      <ToolbarButton title="Bullet List" pressed={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Numbered List" pressed={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Blockquote" pressed={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Code Block" pressed={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code2 className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1.5" />

      {/* Extras */}
      <ToolbarButton title="Subscript" pressed={editor.isActive('subscript')} onClick={() => editor.chain().focus().toggleSubscript().run()}>
        <SubscriptIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Superscript" pressed={editor.isActive('superscript')} onClick={() => editor.chain().focus().toggleSuperscript().run()}>
        <SuperscriptIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()} pressed={false}>
        <Minus className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Insert Table" onClick={insertTable} pressed={editor.isActive('table')}>
        <TableIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Link" pressed={editor.isActive('link')} onClick={setLink}>
        <LinkIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
    </div>
  )
}

export function RichTextEditor({ value, onChange, disabled }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc list-outside ml-4" } },
        orderedList: { HTMLAttributes: { class: "list-decimal list-outside ml-4" } },
        blockquote: { HTMLAttributes: { class: "border-l-4 border-primary/40 pl-6 italic text-muted-foreground my-6" } },
        codeBlock: { HTMLAttributes: { class: "rounded-lg bg-muted p-4 font-mono text-sm my-4 overflow-x-auto" } },
        heading: {
          HTMLAttributes: ({ level }: { level: number }) => ({
            class: level === 1 ? "text-3xl font-bold font-serif mt-8 mb-4" :
                   level === 2 ? "text-2xl font-semibold font-serif mt-6 mb-3" :
                   "text-xl font-semibold mt-4 mb-2"
          })
        },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      HorizontalRule.configure({ HTMLAttributes: { class: "my-8 border-border" } }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Subscript,
      Superscript,
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline underline-offset-2 hover:text-primary/80 transition-colors" },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-6 mx-auto" } }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[600px] w-full rounded-b-md border border-t-0 border-input bg-background px-6 py-6 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm dark:prose-invert max-w-none prose-table:border prose-table:border-border prose-td:border prose-td:border-border prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-td:p-2 prose-th:p-2 prose-hr:border-border",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editable: !disabled,
  })

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  return (
    <div className="flex flex-col w-full rounded-md shadow-sm">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
      {editor && (
        <div className="flex items-center justify-between border border-t-0 border-input rounded-b-md bg-muted/20 px-4 py-2">
          <span className="text-xs text-muted-foreground font-mono">
            {editor.storage.characterCount?.characters?.() ?? editor.getText().length} characters
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            ~{Math.ceil(editor.getText().split(/\s+/).filter(Boolean).length / 200)} min read
          </span>
        </div>
      )}
    </div>
  )
}
