import React from 'react';

export default function Loader({ showLoader }) {
    if (showLoader) {
        return (
            <div className="loader">
                <div>
                    <div className="dot"></div>
                </div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        );
    }
    return <></>;
}
