var Avatar = React.createClass({
    render: function() {
        return (
            <div>
                <PagePic pagename={this.props.pagename} />
                <PageLink pagename={this.props.pagename} />
                <NodeList>
                    <span>Jack</span>
                    <span>Bruce</span>
                    <span>KD</span>
                </NodeList>
            </div>
        );
    }
});

var PagePic = React.createClass({
    render: function() {
        return (
            <img src={'https://graph.facebook.com/' + this.props.pagename + '/picture'} />
        );
    }
});

var PageLink = React.createClass({
    render: function() {
        return (
            <a href={'https://www.facebook.com/' + this.props.pagename} >
                {this.props.pagename}
            </a>
        );
    }
});

// Node list
var NodeList = React.createClass({
    render: function() {
        var nodeList = this.props.children.map(function(item) {
            return <li>{item}</li>
        });
        return (
            <ol>
                {nodeList}
            </ol>
        );
    }
});

ReactDOM.render(
    <Avatar pagename="Jack" />, 
    document.getElementById('avatar')
);