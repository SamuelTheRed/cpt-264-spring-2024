var HomeBox = React.createClass({
    render: function () {
        return (
            <div className="HomeBox">
                <GolfMap course={0}/>
                
                <GolfMap course={1}/>
                
                <GolfMap course={2}/>
                
                <GolfMap course={3}/>
            </div>
        );
    }
});

var GolfMap = React.createClass({
    render: function () {
        var golfCourseNames = ["Home Stretch", "Teeny Putt", "Academy Greens", "Main Course"] // TODO Import Golf Names From DB

        return (
            <div className="GolfMap">
                <div 
                    className={"golfcourse"}
                    id={"course" + this.props.course}
                >
                    <div className={"course" + this.props.course + "-title"}>{golfCourseNames[this.props.course]}</div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <HomeBox />,
    document.getElementById('content')
);
