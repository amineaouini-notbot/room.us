import './allMessages.css'
import {Component} from 'react'
import funcs from './funcs'
import user from '../user'
import { socket } from '../socket'

class AllMessages extends Component{
    constructor(props){
        super(props)
        this.state = {
            messages: []
        }
        
    }
    componentWillMount(){
        fetch('/api/messages/retrieve/all')
        .then(data => data.json())
        .then(res => {
            let {messages} = res;
            this.setState({messages})
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        user.setUsername() // on page opened get username
        setTimeout(funcs.scrollToBottom, 300) // on component is rendered scroll div to bottom

        socket.on('recieve-message', msg => { // liten to socket when msg is recieved
            
            // add message to state
            this.setState({messages: this.state.messages.concat(msg)})
        })
    }
    render(){

        return (
            <div id='all-messages'>
            {this.state.messages.map((msg, i)=>{
                return (
                    <div className='message-container'>
                        <div className='message'>
                            <div>
                                <p className='usernames'>{msg.username}</p>
                            
                            </div>
                            <div>
                                <p className='message-content'>{msg.message}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        )
    }
}



export default AllMessages 