import React from 'react';
import Friends from './Friends';

export default function Contacts({ currentUser, socket }) {
    return (
        <section className="contacts-chat">
            <h3>Contacts</h3>
            {currentUser.friends &&
                currentUser.friends.map((friend) => (
                    <Friends
                        friend={friend}
                        key={friend._id}
                        socket={socket}
                        currentUserID={currentUser._id}
                    />
                ))}
        </section>
    );
}
