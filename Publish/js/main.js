var UlContainer = React.createClass({

  render: function() {
    return (
      <ul><PyramidNode users={this.props.users} onSelectNode={this.onSelectNode} level={0} /></ul>
    );
  },

  onSelectNode: function(node, level) {
    if (this.selected && this.checkTree(node, this.selected)) {
      var nodeStateFirst = this.selected.state.name;
      var nodeStateSecond = node.state.name;

      this.selected.setState({name: nodeStateSecond, selected: false, moveable: false});
      node.setState({name: nodeStateFirst, moveable: false});
      this.selected = null;
    }
    else if(!this.selected && level !== 1 && node.state.moveable) {
      node.setState({selected: !node.state.selected});
      this.selected = node;
      this.level = level;
    }
  },

  checkTree: function(node, selected) {
    var found = false;

    node.props.users.childs.map(function(user) {
      if (user.name == selected.state.name) {
        found = true;
      };
    });

    return found;
  }

});

var PyramidNode = React.createClass({

  getInitialState: function() {
    return {
      selected: false,
      name: null,
      moveable: true
    };
  },

  componentDidMount: function(){
    this.setState({name: this.props.users.name});
  },

  render: function() {
    var _this = this;
    var childs = "";
    this.level = this.props.level;
    var classObj = {
        "selected": this.state.selected
    };

    if (this.props.users.childs != null) {
      this.level++;
      childs = this.props.users.childs.map(function(user, index) {
        return <PyramidNode users={user} onSelectNode={_this.props.onSelectNode} level={_this.level}/>
      });

      childs = <ul>{childs}</ul>;
    }
    else {
      this.level = 4;
    }

    return (
        <li>
          <a onMouseDown={this.handleMouseDown} className={classNames(classObj)}>{this.state.name}</a>
          {childs}
        </li>
    );
  },

  handleMouseDown: function() {
    this.props.onSelectNode(this, this.level);
  },

});

React.render(
  <UlContainer users={users}/>, document.getElementById("tree")
);