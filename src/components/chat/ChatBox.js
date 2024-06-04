// ChatBox.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './ChatBox.css';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import NoticeList from './NoticeList';
import FriendList from './FriendList';

const ChatBox = ({ show, handleClose }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [activeTab, setActiveTab] = useState('friends');
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleDrag = (e, data) => {
        const scale = 2; // 이동 속도 조정 비율
        setPosition((prevPosition) => {
            const newX = prevPosition.x + (data.deltaX * scale);
            const newY = prevPosition.y + (data.deltaY * scale);

            // 화면 밖으로 나가지 않도록 제한
            const maxX = window.innerWidth;
            const maxY = window.innerHeight;

            return {
                x: Math.max(-1000, Math.min(newX, maxX)),
                y: Math.max(-1000, Math.min(newY, maxY))
            };
        });
    };

    if (!show) return null;

    const handleSelectRoom = (room) => {
        setSelectedRoom(room);
        setActiveTab('chatRoom');
    };

    const handleBackToList = () => {
        setSelectedRoom(null);
        setActiveTab('chats');
    };

    return (
        <Draggable
            position={position}
            onDrag={handleDrag}
            handle=".chat-box-header"
            bounds="body"
        >
            <div className="chat-box-wrapper">
                <ResizableBox
                    width={300}
                    height={400}
                    minConstraints={[300, 200]}
                    maxConstraints={[800, 600]}
                    className="chat-box"
                    resizeHandles={['se']} //크기 조정 핸들 설정 (남동쪽)
                >
                    <div className="chat-box-header">
                        <button className="close-button" onClick={handleClose}></button>
                    </div>
                    <Modal.Body className="modal-body">
                        {activeTab === 'friends' && <FriendList />}
                        {activeTab === 'chats' && <ChatList onSelectRoom={handleSelectRoom} />}
                        {activeTab === 'notices' && <NoticeList />}
                        {activeTab === 'chatRoom' && selectedRoom && (
                            <ChatRoom room={selectedRoom} onBack={handleBackToList} />
                        )}
                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <Button variant={activeTab === 'friends' ? 'primary' : 'secondary'} onClick={() => setActiveTab('friends')}>
                            친구 목록
                        </Button>
                        <Button variant={activeTab === 'chats' ? 'primary' : 'secondary'} onClick={() => setActiveTab('chats')}>
                            채팅 목록
                        </Button>
                        <Button variant={activeTab === 'notices' ? 'primary' : 'secondary'} onClick={() => setActiveTab('notices')}>
                            공지 목록
                        </Button>
                    </Modal.Footer>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default ChatBox;