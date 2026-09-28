import { useState } from 'react'
import { motion } from 'framer-motion'
import { navigationItems } from '../../data/navigation'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout({ activePage, onNavigate, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const current = navigationItems.find((item) => item.id === activePage)

  const handleNavigate = (id) => {
    onNavigate(id)
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-[#171717]">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <Navbar title={current?.label ?? 'Dashboard'} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
