export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const LANGUAGES = [
  { value: "JAVASCRIPT", label: "JavaScript", color: "bg-yellow-500" },
  { value: "TYPESCRIPT", label: "TypeScript", color: "bg-blue-500" },
  { value: "PYTHON", label: "Python", color: "bg-green-500" },
  { value: "GO", label: "Go", color: "bg-cyan-500" },
  { value: "JAVA", label: "Java", color: "bg-orange-500" },
  { value: "CPP", label: "C++", color: "bg-purple-500" },
  { value: "C", label: "C", color: "bg-gray-500" },
  { value: "RUST", label: "Rust", color: "bg-red-500" },
] as const;

export const ICONS_OPTIONS = [
  // Documents & Files
  { emoji: "📄", label: "Document" },
  { emoji: "📕", label: "Red Book" },

  // Tech & Code
  { emoji: "💻", label: "Laptop" },
  { emoji: "🔧", label: "Wrench" },
  { emoji: "⚙️", label: "Settings" },
  { emoji: "🔨", label: "Hammer" },
  { emoji: "🛠️", label: "Tools" },
  { emoji: "⚡", label: "Lightning" },
  { emoji: "🔌", label: "Plugin" },
  { emoji: "🔗", label: "Link" },

  // Objects & Symbols
  { emoji: "📦", label: "Package" },
  { emoji: "📁", label: "Folder" },
  { emoji: "🔍", label: "Search" },
  { emoji: "🔒", label: "Lock" },
  { emoji: "🔑", label: "Key" },
  { emoji: "🎯", label: "Target" },

  // Education & Learning
  { emoji: "🎓", label: "Graduate" },
  { emoji: "🧠", label: "Brain" },
  { emoji: "💡", label: "Idea" },
  { emoji: "📈", label: "Trending Up" },
  { emoji: "📉", label: "Trending Down" },

  // Navigation & Actions
  { emoji: "🚀", label: "Rocket" },
  { emoji: "🏁", label: "Checkered Flag" },
  { emoji: "🔔", label: "Bell" },
  { emoji: "📌", label: "Pin" },

  // Communication
  { emoji: "📢", label: "Loudspeaker" },
  { emoji: "📣", label: "Megaphone" },

  // Status & Indicators
  { emoji: "✅", label: "Check Mark" },
  { emoji: "❌", label: "Cross" },
  { emoji: "⚠️", label: "Warning" },
  { emoji: "🚨", label: "Alert" },
] as const;
