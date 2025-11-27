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
