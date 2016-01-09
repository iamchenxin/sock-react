/**
 * Created by iamchenxin on 1/7/16.
 */
var React = require('react');
var ReactDom = require('react-dom');
var io = require('socket.io-client');

let socket =io();

class MyRender extends React.Component{
    render() {
        return <div>
            Hello! {this.props.name}
            <SendText />
        </div>
    }
}

class DivWrap extends React.Component{
    constructor(props){
        super(props);
       // this.props=props;
     //   console.dir(this);
    }

    render(){
        return (
            <div>{this.props.children[0]}{this.props.children[1]}</div>
        );
    }
}

class SendText extends React.Component{
    constructor(props){
        super(props);
        this.state={inputText:"hello"};
    }

    send =(event)=>{
        console.log("button clicked");
        socket.emit("send1",this.state.inputText);
    };

    textChange =(event)=>{
      //  console.dir(this);
        this.setState({inputText:`${event.target.value}`});
    };

    render(){
        return (
            <DivWrap>
            <input key="int" type="text" value={this.state.inputText}
                   onChange={this.textChange}
                   ref={(textInput)=>this._input=textInput}
            />
            <input
                key="bt"
                type="button"
                value="Send the text input"
                onClick={this.send}
            />

        </DivWrap>);
    }
}

function Note(props){
    return (
        <li> <b> ID= {props.id} :</b> {props.text} </li>
    );
}

function NoteList(props){
    let noteList = props.noteList;
    return (
        <ol>
            {
                noteList.map(note=>{
                    return (<Note {...note} key={note.id} />);
                })
            }
        </ol>
    );
}

function NoteList2(props){
    let notes = props.noteList;
    let d = (
        <ul>
            {
                notes.map(note=>{
                    note.key = note.id;
                    return Note(note);
                })
            }
        </ul>
    );
    console.log(d);
    return d;
}

class NoteBook extends React.Component{
    constructor(props){
        super(props);
        this.state={
          noteList:[],inputText:"a"
        };

    }

    syncInput=(event)=>{
        this.setState({
            inputText: event.target.value
        });

    };

    addNote=(event)=>{
        console.log("add..");
        event.preventDefault();
        let noteList=this.state.noteList;
        noteList.push({id:noteList.length,text:this.state.inputText});
        console.dir(noteList);
      this.setState({
          noteList:noteList
      })  ;
    };

    render(){
        let noteList =this.state.noteList;
        return (
            <div>
                <NoteList noteList={noteList} />
                <form onSubmit={this.addNote}>
                    <input type="text"  onChange={this.syncInput} value={this.state.inputText}/>
                    <button > add </button>
                </form>
            </div>
        );
    }
}

function TopContain(props){
    return (
        <div>
            <MyRender name="tom!" />
            <NoteBook />
            <input type="text"/>
        </div>
    );
}

//            <button onClick={this.send(this.state.inputText)}>send</button>

ReactDom.render(<TopContain />,document.getElementById("contain"));