var HomeBox = React.createClass({
    render: function () {
        return (
            <div className="homebox">
                <h2>Golf Courses</h2>

                <GolfMap />
            </div>
        );
    }
});

var GolfMap = React.createClass({
    render: function () {
        return (
            <div className="golfmap">
                <GolfCourse course={0} />
                    
                <GolfCourse course={1} />
                
                <GolfCourse course={2} />
                
                <GolfCourse course={3} />
            </div>
        );
    }
});

var GolfCourse = React.createClass({
    render: function () {
        var golfCourseNames = ["Home Stretch", "Teeny Putt", "Academy Greens", "Main Course"] // TODO Import Golf Names From DB

        return (
                <a
                    className={"course" + this.props.course}
                    id={"course" + this.props.course}
                    href={"./courses/#course" + this.props.course}
                    style={{backgroundImage: "url(./images/course" + this.props.course + ".png)"}} // https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles/39196525#39196525
                >
                    <div className={"course" + this.props.course + "-title"}>{golfCourseNames[this.props.course]}</div>
                </a>
        );
    }
});

ReactDOM.render(
    <HomeBox />,
    document.getElementById('content')
);
