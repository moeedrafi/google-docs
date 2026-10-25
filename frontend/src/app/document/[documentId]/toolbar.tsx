"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { useEditorState } from "@tiptap/react";
import { type Level } from "@tiptap/extension-heading";
import {
  BoldIcon,
  Undo2Icon,
  Redo2Icon,
  ItalicIcon,
  LucideIcon,
  PrinterIcon,
  ListTodoIcon,
  UnderlineIcon,
  SpellCheckIcon,
  RemoveFormattingIcon,
  Link2Icon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const activeLineHeight = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return "normal";

      const nodeType = editor.isActive("heading") ? "heading" : "paragraph";
      return editor.getAttributes(nodeType).lineHeight ?? "normal";
    },
  });

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <div className="flex items-center">
      {lineHeights.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => editor?.chain().focus().setLineHeight(value).run()}
          className={cn(
            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            activeLineHeight === value && "bg-neutral-200/80",
          )}
        >
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>

      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80"
        >
          {fontSize}
        </button>
      )}

      <button
        onClick={increment}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
      >
        <Link2Icon className="size-4" />
      </button>

      {isOpen && (
        <>
          <input
            value={value}
            placeholder="https://example.com"
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={() => onChange(value)}>Apply</button>
        </>
      )}
    </>
  );
};

const TextColorButton = ({ color }: { color: string }) => {
  const { editor } = useEditorStore();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editor?.chain().focus().setColor(event.currentTarget.value).run();
  };

  return (
    <input
      type="color"
      value={color}
      onChange={onChange}
      data-testid="setColor"
    />
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];

  return (
    <div className="flex">
      {headings.map(({ label, value }) => (
        <button
          onClick={() => {
            if (value === 0) {
              editor?.chain().focus().setParagraph().run();
            } else {
              editor
                ?.chain()
                .focus()
                .toggleHeading({ level: value as Level })
                .run();
            }
          }}
          className={cn(
            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            (value === 0 && !editor?.isActive("heading")) ||
              (editor?.isActive("heading", { level: value }) &&
                "bg-neutral-200/80"),
          )}
          key={value}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const AlignButton = ({
  isCenter,
  isLeft,
  isRight,
}: {
  isLeft: boolean;
  isRight: boolean;
  isCenter: boolean;
}) => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
      isActive: isLeft,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
      isActive: isCenter,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
      isActive: isRight,
    },
  ];

  return (
    <div className="flex items-center">
      {alignments.map(({ label, value, icon: Icon, isActive }) => (
        <button
          key={value}
          onClick={() => editor?.chain().focus().setTextAlign(value).run()}
          className={cn(
            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80",
          )}
        >
          <Icon className="size-4" />
          <span className="text-sm sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
};

const ListButton = ({
  isBullet,
  isOrdered,
}: {
  isBullet: boolean;
  isOrdered: boolean;
}) => {
  const { editor } = useEditorStore();
  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: isBullet,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: isOrdered,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <div className="flex items-center">
      {lists.map(({ label, onClick, icon: Icon, isActive }) => (
        <button
          key={label}
          onClick={onClick}
          className={cn(
            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80",
          )}
        >
          <Icon className="size-4" />
          <span className="text-sm sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
};

const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive,
}: {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      color: editor?.getAttributes("textStyle").color ?? "#000000",
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,
      isUnderline: editor?.isActive("underline") ?? false,
      isTaskList: editor?.isActive("taskList") ?? false,
      isAlignLeft: editor?.isActive({ textAlign: "left" }) ?? false,
      isAlignRight: editor?.isActive({ textAlign: "right" }) ?? false,
      isAlignCenter: editor?.isActive({ textAlign: "center" }) ?? false,
      isBullet: editor?.isActive("bulletList") ?? false,
      isOrdered: editor?.isActive("orderedList") ?? false,
    }),
  });

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false",
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editorState?.isBold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editorState?.isItalic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editorState?.isUnderline,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editorState?.isTaskList,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-3xl min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <div className="bg-neutral-400 h-6 w-px m-1" />

      <TextColorButton color={editorState?.color} />
      <LinkButton />

      <div className="bg-neutral-400 h-6 w-px m-1" />

      <HeadingLevelButton />

      <div className="bg-neutral-400 h-6 w-px m-1" />

      {/* <FontSizeButton /> */}

      <div className="bg-neutral-400 h-6 w-px m-1" />

      {/* <LineHeightButton /> */}

      <div className="bg-neutral-400 h-6 w-px m-1" />

      <AlignButton
        isLeft={editorState?.isAlignLeft ?? false}
        isRight={editorState?.isAlignRight ?? false}
        isCenter={editorState?.isAlignCenter ?? false}
      />

      <div className="bg-neutral-400 h-6 w-px m-1" />

      <ListButton
        isBullet={editorState?.isBullet ?? false}
        isOrdered={editorState?.isOrdered ?? false}
      />

      <div className="bg-neutral-400 h-6 w-px m-1" />

      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <div className="bg-neutral-400 h-6 w-px m-1" />

      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
