import {React, Component} from 'react';


class SpeechRecognition extends Component{
	constructor(){
		super()
		this.state = {
			words: '',
			recognizing: false
		}
		this.sp_rec = new window.webkitSpeechRecognition();
		// this.startButton = this.startButton.bind(this)
		this.toggleMicrophone = this.toggleMicrophone.bind(this)
	}
	componentDidMount(){
		var {sp_rec} = this
		console.log(sp_rec)
		sp_rec.continuous = true;
		sp_rec.interimResults = true;
		sp_rec.onstart = function() {
					console.log('start')
			  		};
		sp_rec.onresult = function(event) { 
			var {transcript} = event.results[0][0]
			this.setState(({words:transcript}))
			console.log(event.results[0][0].transcript)
		}
		sp_rec.onresult = sp_rec.onresult.bind(this)
		sp_rec.onend = function(event) { 
		  	console.log('ONEND') 
		}
	}
	startMicrophone() {
		this.setState({recognizing:true})
	  	this.sp_rec.start()
  	}
  	stopMicrophone() {
  		this.setState({recognizing:false})
  		this.sp_rec.stop()
  		this.props.onSpeech(this.state.words)
  	}
  	toggleMicrophone() {
	    if (this.state.recognizing) {
	      this.stopMicrophone();
	    } else {
	      this.startMicrophone();
	    }
	}

	render(){
		var { recognizing } = this.state
		return (
			<div>
				<button onClick={this.toggleMicrophone} className="btn btn-link">
					{!recognizing && <i className="fas fa-microphone-alt"></i>}
					{recognizing && 
						<div>
							<i class="fas fa-spinner fa-pulse"></i>
							<i className = "fas fa-microphone-alt-slash"></i>
						</div>
					}
				</button>
			</div>
		)
	}
}

export default SpeechRecognition