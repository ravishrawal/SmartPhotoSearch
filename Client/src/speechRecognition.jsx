import {React, Component} from 'react';


class SpeechRecognition extends Component{
	constructor(){
		super()
		this.state = {
			speech_input: ''
		}
		this.startButton = this.startButton.bind(this)
	}
	startButton(e) {
	  var final_transcript = '';
	  recognition.lang = select_dialect.value;
	  recognition.start();
	  console.log(recognition.onstart)

	render(){
		return (
			<div>
				<button onClick={this.startButton}>Go</button>
			</div>
		)
	}
}

export default SpeechRecognition