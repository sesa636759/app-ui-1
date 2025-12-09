// Context Menu Data - Menu configurations for demos
// This file contains all the menu item data used in context menu demos

export const basicMenuItems = [
  { id: 'cut', label: 'Cut', icon: '✂️' },
  { id: 'copy', label: 'Copy', icon: '📋' },
  { id: 'paste', label: 'Paste', icon: '📄' },
  { id: 'sep1', separator: true },
  {
    id: 'more',
    label: 'More Options',
    icon: '⋯',
    children: [
      { id: 'select-all', label: 'Select All', icon: '☑️' },
      { id: 'sep2', separator: true },
      {
        id: 'format',
        label: 'Format',
        icon: '🎨',
        children: [
          { id: 'bold', label: 'Bold', icon: '𝐁' },
          { id: 'italic', label: 'Italic', icon: '𝐼' },
          { id: 'underline', label: 'Underline', icon: 'U̲' },
          { id: 'sep3', separator: true },
          {
            id: 'color',
            label: 'Text Color',
            icon: '🎨',
            children: [
              { id: 'red', label: 'Red', icon: '🔴' },
              { id: 'green', label: 'Green', icon: '🟢' },
              { id: 'blue', label: 'Blue', icon: '🔵' }
            ]
          }
        ]
      },
      {
        id: 'share',
        label: 'Share',
        icon: '📤',
        children: [
          { id: 'email', label: 'Email', icon: '✉️' },
          { id: 'link', label: 'Copy Link', icon: '🔗' }
        ]
      }
    ]
  },
  { id: 'sep4', separator: true },
  { id: 'delete', label: 'Delete', icon: '🗑️' }
];

export const nestedMenuItems = [
  {
    id: 'new',
    label: 'New',
    icon: '➕',
    children: [
      { id: 'file', label: 'File', icon: '📄' },
      { id: 'folder', label: 'Folder', icon: '📁' },
      { id: 'sep1', separator: true },
      {
        id: 'more',
        label: 'More Options',
        icon: '⋯',
        children: [
          { id: 'text', label: 'Text Document', icon: '📝' },
          { id: 'image', label: 'Image', icon: '🖼️' },
          { id: 'video', label: 'Video', icon: '🎬' }
        ]
      }
    ]
  },
  {
    id: 'open',
    label: 'Open With',
    icon: '📂',
    children: [
      { id: 'notepad', label: 'Notepad', icon: '📝' },
      { id: 'vscode', label: 'VS Code', icon: '💻' },
      { id: 'browser', label: 'Browser', icon: '🌐' }
    ]
  },
  { id: 'sep2', separator: true },
  {
    id: 'share',
    label: 'Share',
    icon: '📤',
    children: [
      { id: 'email', label: 'Email', icon: '✉️' },
      { id: 'link', label: 'Copy Link', icon: '🔗' },
      {
        id: 'social',
        label: 'Social Media',
        icon: '📱',
        children: [
          { id: 'twitter', label: 'Twitter', icon: '🐦' },
          { id: 'facebook', label: 'Facebook', icon: '👍' }
        ]
      }
    ]
  }
];

export const iconMenuItems = [
  {
    id: 'format',
    label: 'Format',
    icon: '🎨',
    children: [
      { id: 'bold', label: 'Bold', icon: '𝐁' },
      { id: 'italic', label: 'Italic', icon: '𝐼' },
      { id: 'underline', label: 'Underline', icon: 'U̲' }
    ]
  },
  {
    id: 'align',
    label: 'Alignment',
    icon: '⚊',
    children: [
      { id: 'left', label: 'Left', icon: '⇤' },
      { id: 'center', label: 'Center', icon: '⊟' },
      { id: 'right', label: 'Right', icon: '⇥' },
      { id: 'justify', label: 'Justify', icon: '☰' }
    ]
  },
  { id: 'sep1', separator: true },
  {
    id: 'insert',
    label: 'Insert',
    icon: '➕',
    children: [
      { id: 'image', label: 'Image', icon: '🖼️' },
      { id: 'table', label: 'Table', icon: '⊞' },
      { id: 'link', label: 'Link', icon: '🔗' },
      { id: 'emoji', label: 'Emoji', icon: '😊' }
    ]
  }
];

export const fourLevelMenuItems = [
  {
    id: 'level-1',
    label: 'Level 1',
    icon: '1️⃣',
    children: [
      {
        id: 'level-2',
        label: 'Level 2',
        icon: '2️⃣',
        children: [
          {
            id: 'level-3',
            label: 'Level 3',
            icon: '3️⃣',
            children: [
              { id: 'level-4-a', label: 'Level 4 - A', icon: '🅰️' },
              { id: 'level-4-b', label: 'Level 4 - B', icon: '🅱️' },
              { id: 'level-4-c', label: 'Level 4 - C', icon: '🆎' }
            ]
          }
        ]
      }
    ]
  },
  { id: 'sep1', separator: true },
  {
    id: 'tools',
    label: 'Tools',
    icon: '🧰',
    children: [
      {
        id: 'format',
        label: 'Format',
        icon: '🎨',
        children: [
          {
            id: 'colors',
            label: 'Colors',
            icon: '🌈',
            children: [
              { id: 'red', label: 'Red', icon: '🔴' },
              { id: 'green', label: 'Green', icon: '🟢' },
              { id: 'blue', label: 'Blue', icon: '🔵' }
            ]
          }
        ]
      },
      {
        id: 'export',
        label: 'Export',
        icon: '📤',
        children: [
          { id: 'pdf', label: 'Export as PDF', icon: '📕' },
          { id: 'html', label: 'Export as HTML', icon: '🌐' }
        ]
      }
    ]
  },
  { id: 'sep2', separator: true },
  { id: 'help', label: 'Help', icon: '❓' }
];

export const editorMenuItems = [
  { id: 'undo', label: 'Undo', icon: '↶' },
  { id: 'redo', label: 'Redo', icon: '↷' },
  { id: 'sep1', separator: true },
  { id: 'cut', label: 'Cut', icon: '✂️' },
  { id: 'copy', label: 'Copy', icon: '📋' },
  { id: 'paste', label: 'Paste', icon: '📄' },
  { id: 'sep2', separator: true },
  {
    id: 'text',
    label: 'Text Style',
    icon: '✏️',
    children: [
      { id: 'bold', label: 'Bold', icon: '𝐁' },
      { id: 'italic', label: 'Italic', icon: '𝐼' },
      { id: 'underline', label: 'Underline', icon: 'U̲' },
      { id: 'strike', label: 'Strikethrough', icon: 'S̶' },
      { id: 'sep3', separator: true },
      {
        id: 'font',
        label: 'Font Family',
        icon: '🔤',
        children: [
          { id: 'arial', label: 'Arial' },
          { id: 'times', label: 'Times New Roman' },
          { id: 'courier', label: 'Courier New' }
        ]
      },
      {
        id: 'size',
        label: 'Font Size',
        icon: '📏',
        children: [
          { id: 'small', label: 'Small' },
          { id: 'medium', label: 'Medium' },
          { id: 'large', label: 'Large' }
        ]
      }
    ]
  },
  {
    id: 'paragraph',
    label: 'Paragraph',
    icon: '¶',
    children: [
      {
        id: 'align',
        label: 'Alignment',
        icon: '⚊',
        children: [
          { id: 'left', label: 'Left', icon: '⇤' },
          { id: 'center', label: 'Center', icon: '⊟' },
          { id: 'right', label: 'Right', icon: '⇥' }
        ]
      },
      {
        id: 'spacing',
        label: 'Line Spacing',
        icon: '↕',
        children: [
          { id: '1', label: 'Single' },
          { id: '1.5', label: '1.5 Lines' },
          { id: '2', label: 'Double' }
        ]
      }
    ]
  }
];

export const fileMenuItems = [
  { id: 'open', label: 'Open', icon: '📂' },
  {
    id: 'open-with',
    label: 'Open With',
    icon: '🔧',
    children: [
      { id: 'notepad', label: 'Notepad', icon: '📝' },
      { id: 'vscode', label: 'VS Code', icon: '💻' },
      { id: 'browser', label: 'Web Browser', icon: '🌐' },
      { id: 'sep1', separator: true },
      { id: 'choose', label: 'Choose Program...', icon: '⋯' }
    ]
  },
  { id: 'sep2', separator: true },
  { id: 'cut', label: 'Cut', icon: '✂️' },
  { id: 'copy', label: 'Copy', icon: '📋' },
  { id: 'paste', label: 'Paste', icon: '📄' },
  { id: 'sep3', separator: true },
  {
    id: 'share',
    label: 'Share',
    icon: '📤',
    children: [
      { id: 'email', label: 'Send to Email', icon: '✉️' },
      { id: 'compress', label: 'Compress & Share', icon: '📦' },
      { id: 'cloud', label: 'Upload to Cloud', icon: '☁️' }
    ]
  },
  {
    id: 'export',
    label: 'Export As',
    icon: '💾',
    children: [
      { id: 'pdf', label: 'PDF Document', icon: '📕' },
      { id: 'csv', label: 'CSV File', icon: '📊' },
      { id: 'json', label: 'JSON Data', icon: '📄' },
      { id: 'xml', label: 'XML File', icon: '🗂️' }
    ]
  },
  { id: 'sep4', separator: true },
  { id: 'rename', label: 'Rename', icon: '✏️' },
  { id: 'delete', label: 'Delete', icon: '🗑️' },
  { id: 'sep5', separator: true },
  { id: 'properties', label: 'Properties', icon: '⚙️' }
];

export const actionMenuItems = [
  {
    id: 'quick',
    label: 'Quick Actions',
    icon: '⚡',
    children: [
      { id: 'save', label: 'Save', icon: '💾' },
      { id: 'refresh', label: 'Refresh', icon: '🔄' },
      { id: 'print', label: 'Print', icon: '🖨️' }
    ]
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: '✏️',
    children: [
      { id: 'undo', label: 'Undo', icon: '↶' },
      { id: 'redo', label: 'Redo', icon: '↷' },
      { id: 'sep1', separator: true },
      { id: 'cut', label: 'Cut', icon: '✂️' },
      { id: 'copy', label: 'Copy', icon: '📋' },
      { id: 'paste', label: 'Paste', icon: '📄' }
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: '🔧',
    children: [
      {
        id: 'validate',
        label: 'Validate',
        icon: '✓',
        children: [
          { id: 'html', label: 'HTML' },
          { id: 'css', label: 'CSS' },
          { id: 'js', label: 'JavaScript' }
        ]
      },
      {
        id: 'optimize',
        label: 'Optimize',
        icon: '⚙️',
        children: [
          { id: 'minify', label: 'Minify' },
          { id: 'compress', label: 'Compress' }
        ]
      }
    ]
  },
  { id: 'sep2', separator: true },
  { id: 'help', label: 'Help', icon: '❓' }
];

export const homeContextMenuItems = [
  { id: 'cut', label: 'Cut', icon: '✂️' },
  { id: 'copy', label: 'Copy', icon: '📋' },
  { id: 'paste', label: 'Paste', icon: '📄' },
  { id: 'sep1', separator: true },
  { id: 'delete', label: 'Delete', icon: '🗑️' }
];

export const interactiveDefaultItems = [
  {"id": "cut", "label": "Cut", "icon": "✂️"},
  {"id": "copy", "label": "Copy", "icon": "📋"},
  {"id": "paste", "label": "Paste", "icon": "📄"},
  {"id": "sep1", "separator": true},
  {
    "id": "more",
    "label": "More Options",
    "icon": "⋯",
    "children": [
      {"id": "select-all", "label": "Select All", "icon": "☑️"},
      {"id": "sep2", "separator": true},
      {
        "id": "format",
        "label": "Format",
        "icon": "🎨",
        "children": [
          {"id": "bold", "label": "Bold", "icon": "𝐁"},
          {"id": "italic", "label": "Italic", "icon": "𝐼"},
          {"id": "underline", "label": "Underline", "icon": "U̲"}
        ]
      }
    ]
  },
  {"id": "sep3", "separator": true},
  {"id": "delete", "label": "Delete", "icon": "🗑️"}
];

export const disabledItemsMenu = [
  { id: 'cut', label: 'Cut', icon: '✂️' },
  { id: 'copy', label: 'Copy', icon: '📋' },
  { id: 'paste', label: 'Paste', icon: '📄', disabled: true },
  { id: 'sep1', separator: true },
  {
    id: 'more',
    label: 'More Options',
    icon: '⋯',
    children: [
      { id: 'select-all', label: 'Select All', icon: '☑️' },
      { id: 'sep2', separator: true },
      { id: 'disabled-item', label: 'Disabled Item', icon: '🚫', disabled: true },
      {
        id: 'format',
        label: 'Format',
        icon: '🎨',
        children: [
          { id: 'bold', label: 'Bold', icon: '𝐁' },
          { id: 'italic', label: 'Italic', icon: '𝐼', disabled: true },
          { id: 'underline', label: 'Underline', icon: 'U̲' }
        ]
      }
    ]
  },
  { id: 'sep3', separator: true },
  { id: 'delete', label: 'Delete', icon: '🗑️', disabled: true }
];