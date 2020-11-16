import React, { useState, useRef } from 'react';
import defaultPicture from 'images/defaultAvatar.png';
import ChatBubble from './ChatBubble';

export default function Friend({ friend, socket, currentUserID }) {
    const [showChatBubble, setShowChatBubble] = useState(false);
    const inputRef = useRef();
    const openChat = () => {
        setShowChatBubble(!showChatBubble);
        if (!showChatBubble) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="info-chat-wrapper">
            <figure key={friend._id} onClick={() => openChat()}>
                <img src={friend.profile_picture || defaultPicture} alt="" />
                <figcaption>{`${friend.first_name} ${friend.last_name}`}</figcaption>
            </figure>
            <ChatBubble
                friend={friend}
                setShowChatBubble={setShowChatBubble}
                showChatBubble={showChatBubble}
                inputRef={inputRef}
                socket={socket}
                currentUserID={currentUserID}
            />
        </div>
    );
}
