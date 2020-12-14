import {React, Component} from 'react';
import axios from 'axios'
import SpeechRecognition from './speechRecognition'

class SearchBar extends Component{
	constructor(){
		super();
		this.state = {
			searchterm: '',
			dirty: false,
			images: [],
			speech: false
		}
		this.inputHandler = this.inputHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
		this.speechHandler = this.speechHandler.bind(this);
	}
	componentDidMount(){
		console.log('search bar mounted');
	}
	inputHandler(e){
		if(!this.state.dirty) this.setState({dirty:true});
		this.state.searchterm = e.target.value;
	}
	searchHandler(e){
		e.preventDefault();
  		var q = this.state.searchterm
		var headers = { "Access-Control-Allow-Origin": '*' }
		axios.get('https://r8jr30hj6i.execute-api.us-east-1.amazonaws.com/Prod/search',
					{
					  	params: {
					      q
					  	}
				  	})
					 .then(res => res.data)
					 .then(img_arr => {
					 	this.setState({images: img_arr})
					 })	
	}
	speechHandler(words){
		this.setState({speech:words, searchterm:words, dirty:true})
	}
	render(){
		var img_static = "data:image/png;base64, "
		var {dirty, speech, searchterm} = this.state
		return (
			<div className="container" >
				<h3 className="lead">Search Your Library</h3>
		        <div>
		        	<div className="input-group mb-3">
					  <div className="input-group-prepend">
					    <span className="input-group-text rounded" id="basic-addon1">
					    	<i className="fas fa-search"></i>
					    	<input type="text" 
					    		onChange={this.inputHandler} 
					    		className="form-control border border-warning" 
					    		placeholder={speech ? searchterm : "search"} 
					    		aria-label="Search" 
					    		aria-describedby="basic-addon1" 
					    		style={{margin:"auto 10px"}}
					    	/>
					    	<SpeechRecognition onSpeech={this.speechHandler}/>
					    	{ searchterm && 
					        	<div>
					        		<button className="btn btn-dark" onClick={this.searchHandler}>
					        			Go
				        			</button>
				        		</div>
			        		}
					    </span>
				  	  </div>
					</div>
		        </div>
        		{ this.state.images.length > 0 &&
        			<div className="container">
        				<hr />
        				<div className="row" > 
	        				{ this.state.images.map((item, index) => {
	        					var img_url = item.image
	        					console.log(img_url.slice(1,10))
	        					return (
	        							<div className="col-sm-6">
							        		<img key={index} src={img_static+img_url} className='img-responsive img-thumbnail'/>
						        		</div>
	        						)
	        					})
	        				}
	        			</div>
	        		</div>
        		}
	      	</div>
			)
	}
}

export default SearchBar