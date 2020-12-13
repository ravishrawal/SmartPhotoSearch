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
		}
		this.inputHandler = this.inputHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
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
		axios.get('https://gjn0sehjb2.execute-api.us-east-1.amazonaws.com/Dev/search',
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
	render(){
		console.log(this.state)
		var img_static = "data:image/png;base64, "
		return (
			<div className="row" style={{ margin:"auto", marginTop:"30px" }}>
		        <div className="col-sm-8">
		        	<div className="input-group mb-3">
					  <div className="input-group-prepend">
					    <span className="input-group-text border border-warning" id="basic-addon1">
					    	<i className="fas fa-search"></i>
					    	<SpeechRecognition />
					    </span>
					  </div>
					  <input type="text" onChange={this.inputHandler} className="form-control border border-warning" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
					</div>
		        </div>
		        { this.state.dirty && 
		        	<div className="col-sm">
		        		<button className="btn btn-warning" onClick={this.searchHandler}>
		        			Go
	        			</button>
	        		</div>
        		}
        		{ this.state.images.length > 0 &&
        			<div className="container">
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