import { User, Code2, FolderGit2, Briefcase, Mail } from 'lucide-react'

export const tabs = [
  { id: 'about', label: 'about.js', icon: User },
  { id: 'skills', label: 'skills.js', icon: Code2 },
  { id: 'projects', label: 'projects.js', icon: FolderGit2 },
  { id: 'experience', label: 'experience.js', icon: Briefcase },
  { id: 'contact', label: 'contact.js', icon: Mail },
]

export const tabIds = tabs.map((t) => t.id)
