interface LayoutSidebarProps {
  children: React.ReactNode;
}

const LayoutSidebar = ({ children }: LayoutSidebarProps) => {
  return (
    <div className="fixed top-20 left-0 flex h-layout w-72 flex-col space-y-2 border-r-2 border-gray-100 px-4 py-8">
      {children}
    </div>
  );
};

export default LayoutSidebar;