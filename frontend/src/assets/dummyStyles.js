export const navbarStyles = {
  // Main nav container
  nav: "w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-2xl py-3 sm:py-4 px-4 sm:px-6 lg:px-10 relative overflow-visible",

  // Decorative pattern
  decorativePattern:
    "absolute inset-0 opacity-10 pointer-events-none hidden sm:block",
  decorativePatternBackground: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 15c-12.5 0-22.5 10-22.5 22.5h10c0-7 5.5-12.5 12.5-12.5s12.5 5.5 12.5 12.5c0 5-3 7.5-7.5 10-4.5 2.5-7.5 7.5-7.5 12.5v5h10v-5c0-2.5 1.5-4 5-5.5 5.5-2.5 10-6.5 10-12 0-12.5-10-22.5-22.5-22.5zm0 55c-2.75 0-5 2.25-5 5s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5z' fill='%23646464'/%3E%3C/svg%3E")`,

  // Floating bubbles
  bubble1:
    "hidden md:block absolute top-10 left-1/4 w-36 h-36 sm:w-40 sm:h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slow",
  bubble2:
    "hidden lg:block absolute bottom-5 right-20 w-28 h-28 lg:w-32 lg:h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slower",
  bubble3:
    "hidden md:block absolute top-1/3 left-20 w-20 h-20 md:w-24 md:h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slowest",

  // Main container
  container:
    "max-w-6xl mx-auto flex items-center justify-between relative z-10",

  // Logo section
  logoContainer: "flex items-center flex-shrink-0",
  logoButton:
    "inline-flex items-center p-0 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transform transition-transform duration-200",
  logoLink:
    "relative bg-gradient-to-br from-blue-400 to-purple-600 p-0.5 rounded-full",
  logoInner: "bg-gradient-to-b from-blue-900 to-purple-900 p-1 rounded-full",
  logoImage:
    "h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-purple-300",

  // Title section
  titleContainer: "flex-1 flex justify-center px-3",
  titleBackground:
    "bg-gradient-to-r from-blue-600/25 via-purple-600/25 to-indigo-600/25 xl:ml-40 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10 shadow-md max-w-full",
  titleText:
    "text-sm sm:text-base md:text-lg lg:text-2xl font-bold font-[pacifico] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center truncate",

  // Desktop buttons
  desktopButtonsContainer:
    "hidden md:flex items-center cursor-pointer flex-shrink-0 space-x-3",
  spacer: "hidden sm:block w-2",

  // Button styles
  resultsButton:
    "inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium shadow-md cursor-pointer transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  logoutButton:
    "inline-flex cursor-pointer items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium shadow-md transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  loginButton:
    "inline-flex cursor-pointer items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium shadow-md transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  buttonIcon: "h-4 w-4 flex-shrink-0",

  // Mobile menu
  mobileMenuContainer: "md:hidden flex items-center",
  menuToggleButton:
    "inline-flex items-center justify-center p-2 rounded-full bg-white/90 shadow-sm hover:scale-105 transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  menuIcon: "h-5 w-5",
  mobileMenuPanel:
    "absolute right-4 top-full mt-3 w-48 bg-white rounded-lg shadow-lg border z-50 overflow-hidden",
  mobileMenuList: "divide-y",
  mobileMenuItem:
    "w-full text-left px-4 py-3 flex items-center gap-2 text-sm hover:bg-gray-50",
  mobileMenuIcon: "h-4 w-4",

  // Animations and utility styles
  animations: `
    @keyframes float-slow {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-16px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-slower {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-slowest {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }
    .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
    .animate-float-slower { animation: float-slower 9s ease-in-out infinite; }
    .animate-float-slowest { animation: float-slowest 11s ease-in-out infinite; }

    @media (max-width: 420px) {
      nav { padding-left: 12px; padding-right: 12px; }
    }
  `,
};

export const loginStyles = {
  // Page container
  pageContainer:
    "min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden",

  // Background bubbles
  bubble1:
    "pointer-events-none hidden md:block absolute -top-10 -left-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-30 animate-float-slow",
  bubble2:
    "pointer-events-none hidden md:block absolute bottom-10 right-10 w-56 h-56 bg-purple-100 rounded-full blur-3xl opacity-30 animate-float-slower",

  // Back button
  backButton:
    "absolute top-5 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 text-gray-700 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-full shadow hover:scale-105 transform transition",
  backButtonIcon: "w-4 h-4",
  backButtonText: "text-xs sm:text-sm font-medium",

  // Form container
  formContainer:
    "w-full max-w-sm pt-10 sm:max-w-md md:max-w-lg lg:max-w-lg relative z-20",
  form: "w-full",
  formWrapper: "relative",
  animatedBorder:
    "rounded-3xl p-1 sm:p-[2px] bg-gradient-to-r from-purple-400 via-indigo-400 to-sky-400 animate-border",
  formContent: "bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl",

  // Heading
  heading:
    "flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-semibold mb-5 sm:mb-6",
  headingIcon:
    "inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md",
  headingIconInner: "w-4 h-4 sm:w-5 sm:h-5",
  headingText: "text-indigo-700",

  // Subtitle
  subtitle: "text-sm text-gray-600 mb-5 sm:mb-6",

  // Form labels and inputs
  label: "block mb-4",
  labelText: "text-sm font-medium text-gray-700",
  inputContainer: "mt-2 relative",
  inputIcon:
    "absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none",
  inputIconInner: "w-4 h-4 sm:w-5 sm:h-5 text-gray-400",
  input:
    "w-full pl-10 sm:pl-12 py-3 rounded-xl transition-shadow duration-150 border focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:shadow-md bg-white",
  inputNormal: "border-gray-200",
  inputError: "border-red-300",
  passwordInput:
    "pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-password-toggle-button]:hidden [&::-webkit-credentials-auto-fill-button]:hidden",
  passwordToggle:
    "absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-gray-600",
  passwordToggleIcon: "w-4 h-4 sm:w-5 sm:h-5",

  // Error messages
  errorText: "mt-2 text-xs text-red-600",
  submitError: "text-sm text-red-600 mb-3",

  // Buttons container
  buttonsContainer: "mt-4 grid gap-3",
  submitButton:
    "w-full inline-flex items-center cursor-pointer justify-center gap-3 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg transform transition disabled:opacity-60",
  submitButtonIcon: "w-4 h-4",
  submitButtonText: "text-sm sm:text-base",

  // Signup section
  signupContainer: "mt-6",

  // ADD these new styles:
  loginPromptContainer: "mt-5 sm:mt-6",
  loginPromptContent:
    "flex flex-col sm:flex-row items-center justify-center gap-3 px-3 sm:px-4 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow",
  loginPromptText: "text-sm text-gray-700",
  loginPromptLink: "text-indigo-700 font-semibold hover:underline",

  signupContent:
    "flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow",
  signupText: "text-sm text-gray-700",
  signupLink: "text-indigo-700 font-semibold hover:underline",

  // Animations and styles
  animations: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');:root{--card-radius:24px;}@keyframes gradient-anim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.animate-border{border-radius:var(--card-radius);padding:2px;background:linear-gradient(90deg,rgba(99,102,241,0.95),rgba(139,92,246,0.9),rgba(96,165,250,0.95));background-size:200% 200%;animation:gradient-anim 6s ease infinite}@keyframes float-slow{0%{transform:translateY(0px)}50%{transform:translateY(-18px)}100%{transform:translateY(0px)}}@keyframes float-slower{0%{transform:translateY(0px)}50%{transform:translateY(-10px)}100%{transform:translateY(0px)}}.animate-float-slow{animation:float-slow 8s ease-in-out infinite}.animate-float-slower{animation:float-slower 10s ease-in-out infinite}#login-heading,form,input,button,a,p,label,span{font-family:'Poppins',system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial}@media(max-width:360px){.rounded-3xl{border-radius:14px}}@media(min-width:1024px){.rounded-3xl{border-radius:24px}}`,
};

export const signupStyles = {
  // Page container
  pageContainer:
    "min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 relative overflow-auto",

  // Back button
  backButton:
    "absolute top-5 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 text-gray-700 bg-white/80 backdrop-blur-sm px-2.5 sm:px-3 py-2 rounded-full shadow hover:scale-105 transform transition z-20",
  backButtonIcon: "w-4 h-4",
  backButtonText: "text-xs sm:text-sm font-medium",

  // Form container
  formContainer:
    "w-full max-w-sm pt-5 sm:max-w-md md:max-w-lg relative z-10 my-8",

  animatedBorder:
    "rounded-3xl p-1 sm:p-[2px] bg-gradient-to-r from-purple-400 via-indigo-400 to-sky-400 animate-border",

  formContent: "bg-white/95 backdrop-blur-sm rounded-3xl p-5 md:p-8 shadow-xl",

  // Heading
  heading:
    "flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3",
  headingIcon:
    "inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md",
  headingIconInner: "w-4 h-4 sm:w-5 sm:h-5",
  headingText: "text-indigo-700",

  // Subtitle
  subtitle: "text-sm text-gray-600 mb-4 sm:mb-5",

  // Form labels and inputs
  label: "block mb-3",
  labelText: "text-sm font-medium text-gray-700",
  inputContainer: "mt-1.5 relative",
  inputIcon:
    "absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none",
  inputIconInner: "w-4 h-4 sm:w-5 sm:h-5 text-gray-400",
  input:
    "w-full pl-10 sm:pl-12 py-2.5 rounded-xl transition-shadow duration-150 border focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:shadow-md bg-white",
  inputNormal: "border-gray-200",
  inputError: "border-red-300",
  passwordInput: "pr-12",
  passwordToggle:
    "absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-gray-600",
  passwordToggleIcon: "w-4 h-4 sm:w-5 sm:h-5",

  // Error messages
  errorText: "mt-1 text-xs text-red-600",
  submitError: "text-sm text-red-600 mb-2",

  // Buttons container
  buttonsContainer: "mt-3 grid gap-2",
  submitButton:
    "w-full inline-flex cursor-pointer items-center justify-center gap-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg transform transition hover:scale-[1.02] disabled:opacity-60",

  // Login prompt section
  loginPromptContainer: "mt-4 sm:mt-5",
  loginPromptContent:
    "flex flex-col sm:flex-row items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow",
  loginPromptText: "text-sm text-gray-700",
  loginPromptLink: "text-indigo-700 font-semibold hover:underline",

  // Animations and styles
  animations: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');:root{--card-radius:24px;}@keyframes gradient-anim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.animate-border{border-radius:var(--card-radius);padding:2px;background:linear-gradient(90deg,rgba(99,102,241,0.95),rgba(139,92,246,0.9),rgba(96,165,250,0.95));background-size:200% 200%;animation:gradient-anim 6s ease infinite}@keyframes float-slow{0%{transform:translateY(0px)}50%{transform:translateY(-18px)}100%{transform:translateY(0px)}}.animate-float-slow{animation:float-slow 8s ease-in-out infinite}#signup-heading,form,input,button,a,p,label,span{font-family:'Poppins',system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial}@media(max-width:360px){.rounded-3xl{border-radius:14px}}@media(min-width:1024px){.rounded-3xl{border-radius:24px}}`,
};

export const sidebarStyles = {
  // Page container

  blurEffect:
    "filter blur(4px) opacity-50 pointer-events-none transition-all duration-300",

  blurTransition: "transition-all duration-300",

  pageContainer: "min-h-screen bg-gradient-to-br from-slate-50 to-gray-100",
  //pageContainer:
  // "min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 overflow-auto",

  // Mobile overlay

  mobileOverlay: "fixed inset-0 bg-black/30 z-30 md:hidden",

  // Main container
  //mainContainer: "flex xl:h-screen xl:overflow-y-hidden",
  mainContainer: "flex min-h-screen",

  // Sidebar styles

  sidebar:
    "fixed h-screen z-40 top-0 left-0 w-72 transform transition-transform duration-300 ease-in-out bg-white shadow-lg rounded-r-2xl border-r border-gray-200 md:relative md:translate-x-0 md:flex md:flex-col",

  // Sidebar header

  sidebarHeader:
    "flex-shrink-0 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-slate-800 relative overflow-hidden",
  //sidebarHeader: "sticky top-0 z-10 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-slate-800 relative overflow-hidden",

  headerDecoration1:
    "absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-white opacity-20 rounded-full",
  headerDecoration2:
    "absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 bg-blue-200 opacity-40 rounded-full",
  headerContent:
    "flex font-[pacifico] items-center justify-between relative z-10",
  logoContainer: "flex items-center space-x-3",
  //logoIcon: "p-2 bg-white/40 rounded-xl backdrop-blur-sm border border-white",
  logoIcon: "p-1.5 bg-white/40 rounded-xl backdrop-blur-sm border border-white",

  //logoTitle: "text-2xl font-bold",
  logoTitle: "text-xl font-bold",
  logoSubtitle: "mt-1 text-slate-600 text-sm",
  closeButton: "md:hidden p-2 rounded-md hover:bg-white/50",

  // Sidebar content
  // sidebarContent: "sidebar-content flex-1 overflow-y-auto p-4",
  //sidebarContent: " flex-1 overflow-y-auto p-3",
  //sidebarContent: "flex-1 overflow-y-auto p-3 min-h-0",
  sidebarContent:
    "sidebar-content flex-1 overflow-y-auto min-h-0 scroll-pt-0 pl-2 pr-2 pb-23",

  technologiesHeader: "mb-4 flex items-center justify-between pt-1",
  technologiesTitle: "text-lg font-semibold text-slate-700",
  technologiesCount: "text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full",

  // Technology items
  techItem: "mb-3 overflow-visible",
  techButton:
    "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 border relative z-10",
  techButtonSelected: "border-current shadow-md transform scale-[1.02]",
  techButtonNormal: "border-gray-100 hover:border-gray-300 hover:bg-gray-50",
  techButtonContent: "flex items-center space-x-3",
  techIcon: "p-2 rounded-lg border",
  techName: "font-medium",

  // Levels container
  // levelsContainer: "mt-3 ml-2 p-3 bg-gray-50 rounded-xl border border-gray-100",
  levelsContainer:
    "mt-3 ml-2 p-3 bg-gray-50 rounded-xl border border-gray-100 ",
  levelsTitle: "text-sm font-medium text-slate-700 mb-2 flex items-center",
  techBadge: "ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full",

  // Level buttons
  levelButton:
    "w-full flex items-center justify-between cursor-pointer p-3 my-2 rounded-lg border transition-all",
  levelButtonSelected: "border-current shadow-sm font-bold",
  levelButtonNormal: "border-gray-100 hover:bg-white",
  levelButtonContent: "flex items-center space-x-2",
  levelIcon: "p-1.5 rounded-md",
  levelQuestions: "text-xs bg-gray-200 text-slate-700 px-2 py-1 rounded-full",

  // Sidebar footer

  sidebarFooter:
    "flex-shrink-0 p-4 border-t border-gray-100 bg-white sticky bottom-0 z-10",
  footerContent: "flex items-center justify-center text-slate-500",
  footerContentCenter: "text-center text-xs",
  footerHighlight: "mt-1 text-blue-600 font-medium",

  // Main content
  mainContent: "flex-1 w-full overflow-y-auto ",

  // Mobile header
  mobileHeader:
    "sticky top-0 z-30 mb-0.5 flex items-center gap-2 border-b border-slate-200/80 bg-slate-50/95 px-1 py-1.5 backdrop-blur md:hidden",
  menuButton:
    "flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm",
  mobileTitle:
    "flex-1 min-w-0 rounded-2xl border border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 shadow-sm",
  mobileTechInfo: "flex items-center font-[pacifico] justify-start space-x-3",
  mobileTechIcon: "p-2 rounded-md border",
  mobileTechText: "min-w-0 text-left",
  mobileTechName: "truncate text-sm font-semibold",
  mobileTechLevel: "text-xs text-slate-600",
  mobilePlaceholder: "text-center text-sm text-slate-600",

  // Mobile levels
  mobileLevels: "md:hidden mb-4",
  mobileLevelsContainer: "flex gap-2 overflow-x-auto pb-1 no-scrollbar",
  mobileLevelButton:
    "flex-none rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm",

  // Welcome screen

  welcomeContainer:
    "flex min-h-0 items-start justify-center overflow-hidden px-2 pb-1 pt-0 md:min-h-[calc(100vh-200px)] md:items-center md:p-4",
  //welcomeContainer: "flex items-center justify-center p-4 pb-32",

  welcomeContent:
    "mx-auto w-full max-w-2xl rounded-2xl border border-white bg-white/90 p-2.5 text-center shadow-lg backdrop-blur-sm md:p-6",

  welcomeIcon:
    "inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full shadow mb-4",
  welcomeTitle:
    "text-xl md:text-3xl font-bold text-slate-800 mb-2 font-[pacifico]",
  welcomeDescription:
    "mx-auto mb-3 max-w-md text-sm text-slate-700 md:mb-6 md:text-lg",

  // Features grid
  featuresGrid:
    "mb-3 grid grid-cols-1 gap-2.5 md:mb-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3",
  featureCard:
    "bg-gradient-to-br from-blue-50 to-indigo-50 p-3 md:p-5 rounded-2xl border border-blue-100 text-center",
  featureIcon:
    "inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-3",
  featureTitle: "font-semibold text-slate-800 mb-2",
  featureDescription: "text-xs md:text-sm text-slate-600",

  // Welcome prompt
  welcomePrompt:
    "bg-gradient-to-r from-blue-100 to-indigo-100 p-2.5 md:p-4 rounded-2xl border border-blue-200 shadow-inner",
  welcomePromptText:
    "text-blue-700 font-medium flex items-center justify-center",

  // Level selection

  levelSelectionContainer:
    "flex items-center justify-center min-h-[calc(100vh-120px)] p-4 mt-8 mb-8",
  //levelSelectionContainer: "flex items-start justify-center min-h-screen pt-32 pb-32 px-4",
  levelSelectionContent:
    "text-center bg-white p-5 md:p-6 rounded-2xl shadow-lg border border-gray-100 max-w-md my-4",

  techSelectionIcon: "p-3 rounded-2xl inline-flex mb-3 shadow-sm",
  techSelectionTitle: "text-xl md:text-2xl font-bold text-slate-800 mb-1",
  techSelectionDescription: "text-slate-600 mb-4",
  techSelectionPrompt:
    "bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-xl border border-blue-200",
  techSelectionPromptText: "text-blue-700 font-medium text-sm",

  // Results screen

  resultsContainer:
    "flex h-auto min-h-0 items-start justify-center px-2 pb-1 pt-0 md:min-h-[calc(100vh-200px)] md:items-center md:p-4",
  //resultsContainer: "flex items-center justify-center p-4 pb-32",

  resultsContent:
    "w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-2.5 shadow-lg md:p-6 ",

  resultsHeader: "text-center",
  performanceIcon: "p-3 rounded-2xl inline-flex mb-3 shadow-sm",
  resultsTitle:
    "text-xl md:text-2xl font-bold text-slate-800 mb-1 font-[pacifico]",
  resultsSubtitle: "text-slate-600 mb-2",
  performanceBadge:
    "mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium text-slate-800 md:mb-6",

  // Score grid
  scoreGrid: "mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mb-6 md:gap-4",
  scoreCard:
    "bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-2xl border border-green-200 text-center md:p-4",
  scoreIcon:
    "inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-3 shadow-inner",
  scoreNumber: "text-2xl font-bold text-green-600",
  scoreLabel: "text-green-700 font-medium",

  // Score progress
  scoreProgress:
    "mb-4 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-3 md:mb-6 md:p-4",
  scoreProgressHeader: "flex items-center justify-between mb-4",
  scoreProgressTitle: "text-indigo-700 font-semibold",
  scoreProgressPercentage: "text-indigo-700 font-bold",
  scoreProgressBar: "w-full bg-gray-200 rounded-full h-4",
  scoreProgressFill: "h-4 rounded-full transition-all duration-500",

  // Quiz container
  quizContainer: "mx-auto my-2 max-w-3xl pb-20 pt-6 md:my-4 md:pt-0",
  quizHeader:
    "mb-4 bg-white p-4 md:p-6 rounded-2xl shadow-md border border-gray-100",
  quizTitleContainer:
    "mb-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between",
  quizTitle: "text-xl md:text-2xl font-bold text-slate-800",
  quizCounter:
    "text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium",
  progressBar: "w-full bg-gray-200 rounded-full h-2.5 mb-2",
  progressFill:
    "bg-gradient-to-r from-blue-300 to-indigo-300 h-2.5 rounded-full transition-all duration-500",

  // Question container
  questionContainer:
    "rounded-2xl border border-gray-100 bg-white p-4 shadow-lg md:p-8",
  questionHeader: "mb-2 flex items-start",
  questionIcon: "bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3",
  questionText: "text-lg md:text-xl font-semibold text-slate-800",

  // Options container
  optionsContainer: "space-y-4 mt-6",
  optionButton:
    "w-full cursor-pointer text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300",
  optionNormal:
    "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm",
  optionCorrect: "bg-green-50 border-green-300 text-green-700 shadow-sm",
  optionIncorrect: "bg-red-50 border-red-300 text-red-700 shadow-sm",
  optionContent: "flex items-start",
  optionIconCorrect: "mr-3 text-green-500 flex-shrink-0",
  optionIconIncorrect: "mr-3 text-red-500 flex-shrink-0",
  optionIconEmpty:
    "w-5 h-5 rounded-full border-2 border-gray-200 mr-3 flex-shrink-0",
  optionText: "text-sm leading-6 md:text-lg",

  // Loading container
  loadingContainer: "h-full flex items-center justify-center",
  loadingContent:
    "text-center bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100",
  loadingSpinner:
    "animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4",
  loadingTitle: "text-lg md:text-xl font-semibold text-slate-800 mb-2",
  loadingDescription: "text-sm md:text-base text-slate-600",

  customStyles: `
    .sidebar-content {
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      max-height: calc(100vh - 180px);
    }

    aside .sidebar-content::-webkit-scrollbar {
      width: 10px;
    }
    aside .sidebar-content::-webkit-scrollbar-track {
      background: transparent;
    }
    aside .sidebar-content::-webkit-scrollbar-thumb {
      background-color: rgba(99,102,241,0.12);
      border-radius: 999px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    aside .sidebar-content::-webkit-scrollbar-thumb:hover {
      background-color: rgba(99,102,241,0.18);
    }

    aside .sidebar-content {
      scrollbar-width: thin;
      scrollbar-color: rgba(99,102,241,0.12) transparent;
    }
    
    /* Fix main content overflow */
    main {
      overflow-y: auto;
      max-height: 100dvh;
    }
    
    /* Ensure footer stays at bottom */
    .sidebar-footer {
      position: sticky;
      bottom: 0;
      background: white;
      z-index: 10;
    }



     /* Hide scrollbar for main content */
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    
    /* Light scrollbar for sidebar only */
    .sidebar-scroll {
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 #f1f5f9;
    }
    .sidebar-scroll::-webkit-scrollbar {
      width: 4px;
    }
    .sidebar-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 10px;
    }
    .sidebar-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    
    /* Hide body scrollbar */
    body {
      overflow-x: hidden;
    }
    
    /* Main container scroll */
    .main-container {
      height: 100vh;
      overflow: hidden;
    }

    @media (max-width: 767px) {
      .main-content-fix {
        height: 100dvh !important;
      }

      .level-selection-wrapper {
        min-height: auto !important;
        padding: 24px 12px 32px !important;
      }
    }


    /* Hide scrollbar for main content on level selection page */
    .level-selection-page {
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .level-selection-page::-webkit-scrollbar {
      display: none;
    }
    
    /* Light scrollbar for sidebar only */
    .sidebar-scroll {
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 #f1f5f9;
    }
    .sidebar-scroll::-webkit-scrollbar {
      width: 4px;
    }
    .sidebar-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 10px;
    }
    .sidebar-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }

    /* Ensure levels expand from top to bottom */
  .levelsContainer {
    transform-origin: top center;
    animation: expandDown 0.2s ease-out;
  }
  
  @keyframes expandDown {
    0% {
      opacity: 0;
      transform: scaleY(0);
    }
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
  }
  

   /* Force levels to expand downward */
  .levelsContainer {
    display: block !important;
    transform: none !important;
    transform-origin: top center !important;
    position: relative !important;
    top: 0 !important;
    bottom: auto !important;
  }
  
  .techItem {
    overflow: visible !important;
  }
  `,
};

export const resultStyles = {
  // Page container
  pageContainer: "min-h-screen bg-gray-50 p-6",
  container: "max-w-6xl font-[pacifico] mx-auto",

  // Header
  header:
    "mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4",
  title: "text-2xl md:text-3xl lg:text-2xl font-semibold",
  headerControls: "flex items-center gap-3",

  // Filter section
  filterContainer: "mb-4",
  filterContent: "flex items-center justify-between gap-3",
  filterButtons: "flex flex-wrap items-center gap-2",
  filterLabel: "text-sm text-gray-600 mr-2",
  // filterButton:
  //   "px-3 py-1 rounded-full text-sm font-medium border shadow-sm focus:outline-none",
  // filterButtonActive: "bg-indigo-600 text-white",
  // filterButtonInactive: "bg-white text-gray-700",
  // filterStatus: "text-sm text-gray-500",

  // In resultStyles object, update these properties:
  filterButton:
    "px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm focus:outline-none transition-colors cursor-pointer",
  filterButtonActive: "bg-indigo-600 text-white border-indigo-600",
  filterButtonInactive:
    "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",

  // Loading state
  loadingContainer: "text-center py-20",
  loadingSpinner:
    "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mb-4",
  loadingText: "text-gray-600",

  // Track sections
  trackSection: "mb-6",
  trackTitle: "text-lg md:text-xl lg:text-lg font-semibold mb-3",

  // Results grid
  resultsGrid:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-4",

  // Empty state
  emptyState: "text-center py-12 text-gray-600",

  // Badge styles
  badgeExcellent:
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800",
  badgeGood:
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800",
  badgeAverage:
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
  badgeNeedsWork:
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",

  // Card styles
  card: "relative bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition",
  cardAccent:
    "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-indigo-700",
  cardContent: "p-4 md:p-5 lg:p-4 flex flex-col h-full",

  // Card header
  cardHeader: "flex items-start justify-between gap-3",
  cardInfo: "flex items-center gap-3 min-w-0",
  levelAvatar:
    "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 rounded-md font-semibold text-lg md:text-xl lg:text-lg",
  levelBasic: "bg-indigo-50 text-indigo-700",
  levelIntermediate: "bg-purple-50 text-purple-700",
  levelAdvanced: "bg-pink-50 text-pink-700",
  cardText: "min-w-0",
  cardTitle: "text-sm md:text-base lg:text-sm font-medium truncate",
  cardMeta: "text-xs md:text-sm lg:text-xs text-gray-500",

  // Card performance
  cardPerformance: "text-right",
  performanceLabel: "text-md md:text-md lg:text-md text-gray-500",
  badgeContainer: "mt-1",

  // Card stats
  cardStats: "mt-4",
  statItem: "text-md md:text-md lg:text-md text-gray-600",
  statNumber: "font-semibold text-lg md:text-xl lg:text-lg text-gray-800",
};
