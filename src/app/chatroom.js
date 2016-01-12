/**
 * Created by iamchenxin on 1/9/16.
 */
var React = require("react");
var ReactDOM = require('react-dom');
var io = require('socket.io-client');
let socket =io();
var Task = require('./lib/Task.js').task;


// user , message
function Message(props){
    return (
        <div> <b>[{props.user}] Said: </b> {props.message}</div>
    );
}

function ChatScreen(props){

    return (
      <div>
          {(()=>{
              if(props.messages){
                  return props.messages.map(message=>{
                      return (<Message {...message} />);
                  }) ;
              }
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
        Task.emit("send",{
            user:this._inputUser.value,
            message:this.state.inputText}
        );
    };

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.inputText==this.state.inputText){
            return false;
        }else {
            return true;
        }
    }

    render(){
        console.log("InputBox update");
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

class ChatRoom extends React.Component{
    constructor(props){
        super(props);
    }

    static defaultProps={
        messages:[
            {
                user:"none",
                message:"should not be there"
            }
        ]
    };


    render(){
        return (
            <div>
                <ChatScreen {...this.props}/>
                <InputBox />
            </div>
        );
    }
}



export function Render(data){
    ReactDOM.render(<ChatRoom {...data}/>,document.getElementById("contain"));
}