import { useCallback, useState } from 'react';

export function useChatMessages(currentUserId) {
    const [messages, setMessages] = useState([]);

    const fetchMessageHistory = useCallback(async (otherUserId) => {
        try {
            const response = await fetch(
                `http://localhost:5454/api/messages/${otherUserId}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const messageHistory = await response.json();

            const transformedMessages = messageHistory.map((msg) => ({
                id: msg.id,
                type: msg.senderId === currentUserId ? 'sent' : 'received',
                messageBody: msg.content,
                dateTime: msg.timestamp || msg.createdAt || new Date().toISOString(),
                senderId: msg.senderId,
                receiverId: msg.receiverId,
            }));

            setMessages(transformedMessages);
        } catch (error) {
            console.error('Failed to fetch message history:', error);
            setMessages([]);
        }
    }, [currentUserId]);

    const addReceivedMessage = useCallback((receivedMessage) => {
        setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some(msg => msg.id === receivedMessage.id);
            if (isDuplicate) {
                return prevMessages;
            }
            
            return [
                ...prevMessages,
                {
                    id: receivedMessage.id || Date.now(),
                    type: 'received',
                    messageBody: receivedMessage.content,
                    dateTime: receivedMessage.timestamp || new Date().toISOString(),
                    senderId: receivedMessage.senderId,
                    receiverId: receivedMessage.receiverId,
                },
            ];
        });
    }, []);

    const addSentMessage = useCallback((savedMessage, messageBody, receiverId) => {
        const newSentMessage = {
            id: savedMessage.id || Date.now(),
            type: 'sent',
            messageBody: messageBody,
            dateTime: savedMessage.timestamp || new Date().toISOString(),
            senderId: currentUserId,
            receiverId: receiverId,
        };
        
        setMessages((prevMessages) => [...prevMessages, newSentMessage]);
    }, [currentUserId]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return {
        messages,
        fetchMessageHistory,
        addReceivedMessage,
        addSentMessage,
        clearMessages
    };
}
