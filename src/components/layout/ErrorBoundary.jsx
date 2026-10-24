import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error:", error, info);
  }

  handleReload = () => {
    this.setState({ error: null });
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
          <p className="rounded-[3px] border border-[#c9a19d] bg-[#f6eae8] px-3 py-1 text-micro text-[#8d332b]">
            Rendering error
          </p>
          <h1 className="mt-5 text-h2">This page could not be displayed.</h1>
          <p className="mt-4 text-ink-soft">
            Something failed while rendering the interface. Reloading usually clears it. If it keeps
            happening, the details below help with debugging.
          </p>
          <pre className="mt-6 w-full overflow-x-auto rounded-[6px] border border-line bg-surface p-4 text-left text-[0.78rem] text-ink-soft">
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-6 rounded-[3px] bg-ink px-5 py-2.5 text-[0.92rem] font-medium text-on-field hover:bg-field-3"
          >
            Reload the page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

