/********************************************************************
  END SCREEN
*********************************************************************/

var EndScreen = React.createClass({
  getInitialState: function() {
    return {
      description: this.props.contentTree.description,
      controlBarVisible: true,
      controlBarWidth: 0
    };
  },

  // CSS doesn't support "truncate N lines" so we need to do DOM width
  // calculations to figure out where to truncate the description
  componentDidMount: function() {
    if (this.props.skinConfig.endScreen.screenToShowOnEnd === "default") {
      // var descriptionNode = this.refs.endScreenInfoPanel;
      // var shortDesc = Utils.truncateTextToWidth(descriptionNode, this.state.description);
      // this.setState({description: shortDesc});
    }
    // Make sure component resize correctly after switch to fullscreen/inline screen
    window.addEventListener('resize', this.handleResize);

    this.setState({controlBarWidth: this.getDOMNode().clientWidth});
  },  

  handleResize: function(e) {
    if (this.isMounted()) {
      this.setState({controlBarWidth: this.getDOMNode().clientWidth});
    }
  },

  handlePlayerMouseUp: function() {
    // pause or play the video if the skin is clicked
    this.props.controller.togglePlayPause();
  },

  showControlBar: function() {
    this.setState({controlBarVisible: true});
  },

  hideControlBar: function() {
    this.setState({controlBarVisible: false});
  },

  handleClick: function() {
    this.props.controller.togglePlayPause();
  },

  render: function() {
    var screenStyle = this.props.style;
    var repeatClass = screenStyle.repeatButton.icon;
    var repeatStyle = screenStyle.repeatButton.style;
    var posterStyle = screenStyle.posterStyle;

    repeatStyle.color = screenStyle.infoPanel.style.color = this.props.skinConfig.endScreen.replayIconStyle.color;

    // metadata visibility
    var titleMetadata;
    var descriptionMetadata;

    // Default configuration
    posterStyle.backgroundImage = "url('" + this.props.contentTree.promo_image + "')";
    return (
      <div onMouseOver={this.showControlBar}
             onMouseUp={this.handlePlayerMouseUp}
             style={{height: "100%", width: "100%"}}>
      <div style={screenStyle.posterStyle}></div>
      <span className={repeatClass} style={repeatStyle} aria-hidden="true" onClick={this.handleClick}></span>
      <div style={screenStyle.infoPanel.style} ref="endScreenInfoPanel">
        {titleMetadata}
        {descriptionMetadata}
      </div>
      <ScrubberBar {...this.props} controlBarVisible={this.state.controlBarVisible}
        controlBarWidth={this.state.controlBarWidth} />
      <ControlBar {...this.props} controlBarVisible={this.state.controlBarVisible}
        controlBarWidth={this.state.controlBarWidth}
        playerState={this.props.playerState} />
    </div>
    );
  }
});