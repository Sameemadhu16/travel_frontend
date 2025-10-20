import { useCallback, useEffect, useRef, useState } from 'react';


export function useWebSocket(currentUserId, selectedUser) {
    const [isConnected, setIsConnected] = useState(false);
    const stompClientRef = useRef(null);
    const subscriptionRef = useRef(null);

    const connectWebSocket = useCallback(() => {
        // WebSocket connection disabled - Backend WebSocket server not running
        // To enable: Set up WebSocket server on port 5454 with SockJS and STOMP
        console.warn('WebSocket connection disabled. Chat will use polling/REST API instead.');
        setIsConnected(false);

        /* Uncomment when WebSocket server is ready:
        const wsUrl = 'http://localhost:5454/ws';
        
        try {
            const socket = new SockJS(wsUrl);
            const client = Stomp.over(socket);
            
            client.debug = () => {};
            
            client.connect(
                {},
                () => {
                    setIsConnected(true);
                    stompClientRef.current = client;
                },
                () => {
                    setIsConnected(false);
                    stompClientRef.current = null;
                    
                    setTimeout(() => {
                        connectWebSocket();
                    }, 5000);
                }
            );
        } catch (error) {
            setIsConnected(false);
            stompClientRef.current = null;
        }
        */
    }, []);

    const disconnectWebSocket = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect(() => {
                setIsConnected(false);
            });
        }
    }, []);

    const subscribeToMessages = useCallback((userId, onMessageReceived) => {
        if (!stompClientRef.current || !userId) {
            return;
        }

        if (!stompClientRef.current.connected) {
            return;
        }

        if (subscriptionRef.current) {
            try {
                subscriptionRef.current.unsubscribe();
            } catch (error) {
                console.warn('Error unsubscribing:', error);
            }
        }

        // Subscribe to messages sent TO the current user
        const topic = `/topic/messages/${userId}`;

        try {
            subscriptionRef.current = stompClientRef.current.subscribe(topic, (message) => {
                const receivedMessage = JSON.parse(message.body);

                // Only show messages where current user is the receiver
                // This prevents showing the same message in both browsers
                if (receivedMessage.receiverId === currentUserId) {
                    onMessageReceived(receivedMessage);
                }
            });
        } catch (error) {
            console.error('Error subscribing to messages:', error);
        }
    }, [currentUserId]);

    const sendMessage = useCallback((messageData) => {
        if (!stompClientRef.current || !stompClientRef.current.connected) {
            throw new Error('Not connected to WebSocket');
        }

        stompClientRef.current.send(
            '/app/sendMessage',
            {},
            JSON.stringify(messageData)
        );
    }, []);

    useEffect(() => {
        connectWebSocket();

        return () => {
            disconnectWebSocket();
        };
    }, [connectWebSocket, disconnectWebSocket]);

    useEffect(() => {
        return () => {
            if (subscriptionRef.current) {
                try {
                    subscriptionRef.current.unsubscribe();
                    subscriptionRef.current = null;
                } catch (error) {
                    console.warn('Error during cleanup:', error);
                }
            }
        };
    }, [selectedUser, isConnected, currentUserId]);

    return {
        isConnected,
        subscribeToMessages,
        sendMessage,
        stompClient: stompClientRef.current
    };
}
