import React from 'react';
import Friend from './Friend';

export default function Contacts({ currentUser, socket }) {
    return (
        <section className="contacts-chat">
            <h3>Contacts</h3>
            {currentUser.friends &&
                currentUser.friends.map((friend) => (
                    <Friend
                        friend={friend}
                        key={friend._id}
                        socket={socket}
                        currentUserID={currentUser._id}
                    />
                ))}
        </section>
    );
}
