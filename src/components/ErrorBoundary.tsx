import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Basic logging; replace with telemetry (Sentry, etc.) if available
    // Keep this silent in production if needed.
    // eslint-disable-next-line no-console
    console.error("Uncaught error in component tree:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-center p-6">
          <div className="max-w-xl">
            <h1 className="text-2xl font-semibold mb-4">Qualcosa è andato storto</h1>
            <p className="text-sm text-muted-foreground mb-6">Si è verificato un errore imprevisto. Ricarica la pagina o contatta l'amministratore se il problema persiste.</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded bg-primary text-primary-foreground"
              >
                Ricarica
              </button>
            </div>
            <details className="mt-4 text-xs text-left text-white/60">
              <summary>Dettagli (debug)</summary>
              <pre className="whitespace-pre-wrap text-xs mt-2">{String(this.state.error)}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
