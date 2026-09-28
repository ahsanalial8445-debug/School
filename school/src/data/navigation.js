import {
  LayoutDashboard,
  GraduationCap,
  Users,
  School,
  ClipboardCheck,
  Wallet,
  FileSpreadsheet,
  BookOpen,
  Megaphone,
  Settings,
} from 'lucide-react'

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: GraduationCap },
  { id: 'teachers', label: 'Teachers', icon: Users },
  { id: 'classes', label: 'Classes', icon: School },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'fees', label: 'Fees', icon: Wallet },
  { id: 'exams', label: 'Exams & Results', icon: FileSpreadsheet },
  { id: 'subjects', label: 'Subjects', icon: BookOpen },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'settings', label: 'Settings', icon: Settings },
]
