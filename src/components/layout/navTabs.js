import { User, Sparkles, FolderOpen, Briefcase, Mail, Award, Users, Quote, Wrench } from 'lucide-react'
import { recommendations } from '../../data/content'

/** Every page section, in render order (sidebar, palette, section numbers). */
export const sections = [
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'organizations', label: 'Organizations', icon: Users },
  recommendations.length > 0 && { id: 'recommendations', label: 'Recommendations', icon: Quote },
  { id: 'contact', label: 'Contact', icon: Mail },
].filter(Boolean)

export const sectionIds = sections.map((s) => s.id)
export const sectionNumber = (id) => sectionIds.indexOf(id) + 1

/** Mobile bottom bar — fewer tabs; the sections in between highlight their nearest tab. */
export const tabs = [
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'projects', label: 'Projects', icon: FolderOpen, covers: ['services'] },
  { id: 'experience', label: 'Experience', icon: Briefcase, covers: ['certifications', 'organizations', 'recommendations'] },
  { id: 'contact', label: 'Contact', icon: Mail },
]
