import { useCallback, useState } from 'react';

export function useChatMessages(currentUserId) {
    const [messages, setMessages] = useState([]);

    const fetchMessageHistory = useCallback(async (otherUserId) => {
        try {
            // Fetch messages in both directions to get full conversation
            // 1. Messages sent by current user to other user
            const sentResponse = await fetch(
                `http://localhost:5454/api/messages/${otherUserId}`
            );
            
            // 2. Messages sent by other user to current user
            const receivedResponse = await fetch(
                `http://localhost:5454/api/messages/${currentUserId}`
            );

            if (!sentResponse.ok || !receivedResponse.ok) {
                throw new Error('Failed to fetch message history');
            }

            const sentMessages = await sentResponse.json();
            const receivedMessages = await receivedResponse.json();

            // Combine and filter messages for this conversation only
            const allMessages = [...sentMessages, ...receivedMessages];
            
            // Filter to only include messages between current user and selected user
            const conversationMessages = allMessages.filter(msg => 
                (msg.senderId === currentUserId && msg.receiverId === otherUserId) ||
                (msg.senderId === otherUserId && msg.receiverId === currentUserId)
            );

            // Remove duplicates based on message ID
            const uniqueMessages = conversationMessages.reduce((acc, msg) => {
                if (!acc.find(m => m.id === msg.id)) {
                    acc.push(msg);
                }
                return acc;
            }, []);

            // Sort by timestamp
            uniqueMessages.sort((a, b) => {
                const timeA = new Date(a.timestamp || a.createdAt).getTime();
                const timeB = new Date(b.timestamp || b.createdAt).getTime();
                return timeA - timeB;
            });

            const transformedMessages = uniqueMessages.map((msg) => ({
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
