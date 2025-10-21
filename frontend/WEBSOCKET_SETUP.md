# WebSocket Chat Integration Setup Guide

## 📦 Install Required Dependencies

Run these commands in your frontend directory:

```bash
npm install sockjs-client @stomp/stompjs
```

OR

```bash
yarn add sockjs-client @stomp/stompjs
```

## 🔧 Configuration

### Backend Configuration (Already Set Up)

- WebSocket URL: `http://localhost:5454/ws`
- Send Endpoint: `/app/sendMessage`
- Subscribe Topic: `/topic/messages/{userId}`

### Frontend Implementation

The ChatUser component now includes:

1. **WebSocket Connection**

   - Automatically connects on component mount
   - Auto-reconnects on failure (5-second retry)
   - Connection status indicator

2. **Real-time Messaging**

   - Send messages via WebSocket
   - Receive messages in real-time
   - Messages update instantly in UI

3. **Message Structure**
   ```javascript
   {
     senderId: number,
     receiverId: number,
     content: string,
     timestamp: string (ISO format)
   }
   ```

## 🚀 How It Works

### 1. Connection Flow

```
Component Mount → Connect to WebSocket → Subscribe to User's Topic
```

### 2. Sending Messages

```
User types message → Click send → Message sent via WebSocket →
Message added to UI → Other user receives via subscription
```

### 3. Receiving Messages

```
Backend sends message → WebSocket delivers to subscribed topic →
Component receives message → UI updates with new message
```

## 🎯 Key Features

### ✅ Implemented

- [x] WebSocket connection with SockJS
- [x] STOMP protocol for messaging
- [x] Real-time message sending
- [x] Real-time message receiving
- [x] Connection status indicator
- [x] Auto-reconnection on failure
- [x] Proper cleanup on unmount
- [x] Enter key to send messages

### 🔄 TODO (Next Steps)

- [ ] Get currentUserId from auth context/Redux
- [ ] Fetch conversation list from API
- [ ] Fetch message history when selecting user
- [ ] Add typing indicators
- [ ] Add message delivery status
- [ ] Add message read receipts
- [ ] Add error notifications
- [ ] Add loading states

## 🧪 Testing

### Test with HTML Client (Provided)

1. Open the HTML test file in a browser
2. Connect to WebSocket
3. Subscribe to User ID 1
4. Send messages from the React app
5. Verify messages appear in HTML client

### Test React Component

1. Start your backend server
2. Start your React app
3. Open the Chat page
4. Check connection status (should show "Connected")
5. Select or create a conversation
6. Send a test message
7. Open another browser/tab to test real-time updates

## 🔍 Debugging

### Check Browser Console

Look for these messages:

- `✅ Connected to WebSocket`
- `🔔 Subscribing to: /topic/messages/{userId}`
- `📤 Sending message: {...}`
- `📥 New message received: {...}`

### Common Issues

1. **Connection Failed**

   - Verify backend is running on `localhost:5454`
   - Check CORS settings on backend
   - Ensure WebSocket endpoint `/ws` is correct

2. **Messages Not Sending**

   - Check connection status indicator
   - Verify message format in console
   - Ensure selected user has valid userId

3. **Messages Not Receiving**
   - Verify subscription topic format
   - Check if userId is correct
   - Ensure backend is broadcasting to correct topic

## 📝 Integration with Auth

Replace this line in ChatUser.jsx:

```javascript
const [currentUserId, setCurrentUserId] = useState(1); // TODO: Get from auth context
```

With:

```javascript
const { user } = useSelector((state) => state.auth);
const currentUserId = user?.data?.id;
```

## 🎨 UI Features

### Connection Status Indicator

- 🟢 Green dot = Connected
- 🔴 Red dot = Disconnected
- Located at top of sidebar

### Message Types

- **Sent messages**: Right-aligned, orange background
- **Received messages**: Left-aligned, gray background
- Timestamps on all messages

### Send Button States

- **Enabled**: Message typed + Connected
- **Disabled**: Empty message OR Disconnected

## 📚 Resources

- [SockJS Documentation](https://github.com/sockjs/sockjs-client)
- [STOMP.js Documentation](https://stomp-js.github.io/stomp-websocket/)
- [WebSocket MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
