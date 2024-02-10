import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import './Chat.css';
import sendLogo from '../../assets/send.png';
import closeIcon from '../../assets/close.png';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import { user } from '../Join/Join.jsx';

let socket;

const ENDPOINT = 'http://localhost:4100/';

const Chat = () => {
    const [id, setId] = useState('');
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = '';
    };

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setId(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        socket.on('userJoined', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        socket.on('leave', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        return () => {
            socket.emit('disconnectEvent');
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message, data.id);
        });
        return () => {
            socket.off();
        };
    }, []);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>CHIT-CHAT</h2>
                    <a href="/">
                        {' '}
                        <img src={closeIcon} alt="Close" />
                    </a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.id === id ? '' : item.user}
                            message={item.message}
                            classs={item.id === id ? 'right' : 'left'}
                        />
                    ))}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input
                        onKeyDown={(event) => (event.key === 'Enter' ? send() : null)}
                        type="text"
                        id="chatInput"
                    />
                    <button onClick={send} className="sendBtn">
                        <img src={sendLogo} alt="Send" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
