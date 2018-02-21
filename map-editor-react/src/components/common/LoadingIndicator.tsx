import * as React from 'react';

export interface LoadingIndicatorProps {
  message?: string;
  error?: string;
};

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = ({ message="Loading", error }) => {
    return (
        <div className="loading-indicator">
            <div className="error-message alert alert-warning animated fadeIn"><pre>{error}</pre></div>
            <div className="message">{message}</div>
            <div className="animated-loader sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </div>
    );
};

export default LoadingIndicator;
