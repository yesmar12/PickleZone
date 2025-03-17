interface HeaderProps {
  isAuthenticated: boolean;
  userEmail?: string;
}

export default function Header({ isAuthenticated, userEmail }: HeaderProps) {
  return (
    <header class="bg-white border-b">
      <div class="max-w-screen-lg mx-auto px-4 py-3 flex justify-between items-center">
        <a 
          href="/"
          class="inline-flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
          </svg>
          <span class="font-medium">PickleZone</span>
        </a>
        <div class="flex items-center gap-4">
          {isAuthenticated ? (
            <div class="flex items-center gap-4">
              <span class="text-gray-600">{userEmail}</span>
              <a
                href="/logout"
                class="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Sign Out
              </a>
            </div>
          ) : (
            <a
              href="/login"
              class="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
