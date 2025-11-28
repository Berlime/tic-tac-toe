import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
      return;
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    // Listen for beforeinstallprompt event (Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsDismissed(true);
      localStorage.setItem('pwa-install-dismissed', 'true');
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed, dismissed, or no prompt available
  if (isStandalone || isDismissed || (!deferredPrompt && !isIOS)) {
    return null;
  }

  // iOS install instructions
  if (isIOS && !isDismissed) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
        <div className="bg-white rounded-xl shadow-2xl p-4 border-2 border-indigo-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Download className="text-indigo-600" size={20} />
              <h3 className="font-bold text-gray-900">Install App</h3>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Tap the share button <span className="font-semibold">□↗</span> and select{' '}
            <span className="font-semibold">"Add to Home Screen"</span>
          </p>
          <button
            onClick={handleDismiss}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  }

  // Standard install prompt (Chrome, Edge, etc.)
  if (deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
        <div className="bg-white rounded-xl shadow-2xl p-4 border-2 border-indigo-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Download className="text-indigo-600" size={20} />
              <h3 className="font-bold text-gray-900">Install Tic Tac Toe</h3>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Install this app on your device for a better experience and offline play.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

