export type SectionType = 'intelligence' | 'academy' | 'community'

export type SubSection = 'ai' | 'trade-ideas' | 'blogs' | 'education' | 'news' | 'discord'

export interface NavItem {
  href: string
  label: string
  icon?: any
}
