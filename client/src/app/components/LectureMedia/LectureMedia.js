import React from "react";
import VideoView from "../../components/VideoView/VideoView";
//import ImageView from "../../components/ImageView/ImageView";

export default class LectureMedia extends React.Component {

<<<<<<< HEAD
  render() {
    var style = {
      'maxWidth':'500px', 
      'maxHeight':'500px'
    };
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={'/' + this.props.courseId + "/" +  this.props.lectureId + '/video'}/>
          </div>
        </div>
        <div>
          <img src={'/image/' + this.props.courseId + "/" +  this.props.lectureId + '/2-0/' + '0'} style={style}/> 
        </div>
      </div>
    );
  }
=======
	constructor(props){
		super(props)
		this.state = {
			time: 0
		}
	}

	onVideoTimeUpdate = (newTime) => {
		this.setState({time: newTime})
	}

	range(l){
		let x = []
		for(let i = 0; i < l; i++){
			x.push(i);
		}
		return x
	}


	render() {
		const style = {
			'maxWidth': '500px',
			'maxHeight': '500px'
		};
		if(this.props.manifest){
			var computerImages = this.range(this.props.manifest.computerCount).map( (e, i) => {
				return <img key={i} src={'/image/' + this.props.courseId + "/" + this.props.lectureId + '/1-' + i + '/' + this.state.time} style={style}/> 
			})
			var whiteBoardImages = this.range(this.props.manifest.whiteboardCount).map( (e, i) => {
				return <img key={computerImages.length + i} src={'/image/' + this.props.courseId + "/" + this.props.lectureId + '/2-' + i + '/' + this.state.time} style={style}/> 
			})
		}
		return (
			<div className="lecture-media">
				<div className="container">
					<div className="video-wrapper">
						<VideoView
							videoSrc={'/video/' + this.props.courseId + "/" + this.props.lectureId } onVideoTimeUpdate={this.onVideoTimeUpdate} />
					</div>
				</div>
				<div>
					{computerImages ? computerImages: null}
					{whiteBoardImages ? whiteBoardImages: null}
				</div>
			</div>
		);
	}
>>>>>>> 0e7d4f3ff4359fcc2cf50e241559c937c5b72dfc
}