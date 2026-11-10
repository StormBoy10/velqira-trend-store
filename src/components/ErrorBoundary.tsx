import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[React Error Boundary]:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem('velqira_dynamic_products');
    localStorage.removeItem('velqira_dynamic_categories');
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#FFF9F5] min-h-screen py-24 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#D9A6AB]/40 shadow-xl text-center">
            <h2 className="text-2xl font-bold font-serif text-[#332522]">Something went wrong</h2>
            <p className="text-xs text-[#332522]/70 mt-2">
              A temporary display glitch occurred. Click below to refresh your view.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-6 bg-[#E8BFC3] text-[#332522] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#D9A6AB] transition-colors shadow-xs"
            >
              Reset & Reload Website
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
