/**
 * Created by iamchenxin on 1/9/16.
 */
var React = require("react");
var ReactDOM = require('react-dom');
var io = require('socket.io-client');
let socket =io();
var EventEmitter = require('events');
var ChatRoomEvent = new EventEmitter();

// user , message
function Message(props){
    return (
        <div> <b>[{props.user}] Said: </b> {props.message}</div>
    );
}

function ChatScreen(props){
    console.dir(props);
    return (
      <div>
          {(()=>{
            return props.messages.map(message=>{
                return (<Message {...message} />);
            }) ;
          })()}
      </div>
    );
}

class InputBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputText:""
        };
    }

    handleInput=(event)=>{
        this.setState({
            inputText:event.target.value
        });
    };

    handleSend=(event)=>{
        event.preventDefault();
        ChatRoomEvent.emit("send",{
            user:this._inputUser.value,
            message:this.state.inputText}
        );
    };

    render(){
        return (
            <form onSubmit={this.handleSend}>
                <input type="text" onChange={this.handleInput} value={this.state.inputText} />
                <b> [Name:]</b>
                <input type="text" ref={r=>{this._inputUser=r }}/>
                <button >Send</button>
            </form>
        );
    }
}

function ChatRoom(props){
    return (
        <div>
            <ChatScreen {...props}/>
            <InputBox />
        </div>
    );
}

export var event = ChatRoomEvent;
export function Render(data){
    ReactDOM.render(<ChatRoom {...data}/>,document.getElementById("contain"));
}