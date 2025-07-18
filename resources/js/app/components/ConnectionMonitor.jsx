import React, { useState, useEffect } from "react";
import pusherService from "@/app/lib/pusher-service";

/**
 * Connection Monitor Component
 * Displays real-time connection statistics and provides controls
 * for managing Pusher connections to optimize peak connections
 */
export default function ConnectionMonitor({ isAdmin = false }) {
    const [stats, setStats] = useState({
        connectionCount: 0,
        activeChannels: 0,
        connectionState: 'disconnected',
        retryCount: 0,
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateStats = () => {
            setStats(pusherService.getStats());
        };

        // Update stats every 5 seconds
        const interval = setInterval(updateStats, 5000);
        updateStats(); // Initial update

        return () => clearInterval(interval);
    }, []);

    const handleReconnect = () => {
        pusherService.reconnect();
        setTimeout(() => setStats(pusherService.getStats()), 1000);
    };

    const handleDisconnect = () => {
        pusherService.disconnect();
        setTimeout(() => setStats(pusherService.getStats()), 1000);
    };

    if (!isAdmin && !isVisible) {
        return (
            <button 
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full text-xs z-50"
                title="Show Connection Stats"
            >
                📊
            </button>
        );
    }

    const getConnectionStatusColor = (state) => {
        switch (state) {
            case 'connected': return 'text-green-600';
            case 'connecting': return 'text-yellow-600';
            case 'disconnected': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className={`fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 ${isAdmin ? 'w-80' : 'w-64'}`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Connection Monitor</h3>
                {!isAdmin && (
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${getConnectionStatusColor(stats.connectionState)}`}>
                        {stats.connectionState}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Total Connections:</span>
                    <span className="font-medium">{stats.connectionCount}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Active Channels:</span>
                    <span className="font-medium">{stats.activeChannels}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Retry Count:</span>
                    <span className="font-medium">{stats.retryCount}</span>
                </div>

                {/* Connection Health Indicator */}
                <div className="flex justify-between">
                    <span className="text-gray-600">Health:</span>
                    <span className={`font-medium ${
                        stats.connectionState === 'connected' && stats.retryCount === 0 
                            ? 'text-green-600' 
                            : stats.retryCount > 2 
                                ? 'text-red-600' 
                                : 'text-yellow-600'
                    }`}>
                        {stats.connectionState === 'connected' && stats.retryCount === 0 
                            ? 'Excellent' 
                            : stats.retryCount > 2 
                                ? 'Poor' 
                                : 'Fair'}
                    </span>
                </div>
            </div>

            {isAdmin && (
                <>
                    <hr className="my-3 border-gray-200" />
                    
                    <div className="space-y-2">
                        <button 
                            onClick={handleReconnect}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs"
                        >
                            Force Reconnect
                        </button>
                        
                        <button 
                            onClick={handleDisconnect}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs"
                        >
                            Disconnect
                        </button>
                    </div>

                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                        <p className="text-gray-600 mb-1">
                            <strong>Optimization Tips:</strong>
                        </p>
                        <ul className="text-gray-500 space-y-1">
                            <li>• Keep connections under 100 per server</li>
                            <li>• Reuse connections across components</li>
                            <li>• Unsubscribe unused channels</li>
                            <li>• Use WebSocket over polling</li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
