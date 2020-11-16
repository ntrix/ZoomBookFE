import React from 'react';

export default function LoadingSpin({ isLoading }) {
    return (isLoading &&
        <div className="loader">
            <div className="loading">
                <div className="loading__square"></div>
                <div className="loading__square"></div>
                <div className="loading__square"></div>
                <div className="loading__square"></div>
                <div className="loading__square"></div>
                <div className="loading__square"></div>
                <div className="loading__square"></div>
            </div>
        </div>
    );
}
