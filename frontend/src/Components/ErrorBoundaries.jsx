import react, { Component } from "react";

class ErrorBoundaries extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in error boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6 bg-red-100 text-red-700 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">Something went wrong!</h2>
          <p>Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundaries;
