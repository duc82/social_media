export interface HeaderProps {
  isNavbarOpen: boolean;
  isSidebarCollapsed: boolean;
  setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavbarProps extends HeaderProps {
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isXl: boolean;
}
