import React from 'react';
import logo from './logo.svg';
import './App.css';

function Button(props) {
  return (
    <button className={props.className + ' taskButton'} onClick={props.click}>{props.children}</button>
  )
}

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <header className="head">
        <div>
          {this.props.title}
        </div>
      </header>
    );
  }
}

class Footer extends React.Component {
  render () {
    return (
      <footer>
        <div>
          {this.props.title}
        </div>
      </footer>
    )
  }
}

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false}; 
    this.text= React.createRef();
  }
  render() {
    if (this.state.editing) {
      return (
        <textarea ref={this.text} rows="1">{this.props.children}</textarea>
      )
    }
    else return (
      <p ref={this.text}>{this.props.children}</p>
    )
  }
}

class ButtonArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};
  }


  render() {
    return(    
    <div class="buttonArea">
      {
        !this.state.editing?(
          <div>
          <Button className="editButton" click={this.props.edit}>Edit</Button>
          <Button className="removeButton" click={this.props.remove}>Remove</Button>
          </div>
        ) : (
          <div>
          <Button className="saveButton" click={this.props.save}>Save</Button>
          <Button className="cancelButton" click={this.props.cancel}>Cancel</Button>
          </div>
        )
      }
    </div>
      )
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.task = React.createRef();
    this.buttons=React.createRef();
  }

  saveTask() {
    let task = this.task;
    this.props.save(task.task.value,this.props.index);
  }

  removeTask() {
    this.props.remove(this.props.index);
  }

  editTask() {
    this.task.setState({editing: true});
    this.buttons.setState({editing: true});
  }

  cancelEditing() {
    this.task.setState({editing: false});
    this.buttons.setState({editing: false});
  }

  render() {
    return (
      <div className="taskWrapper">
        <Text ref={this.task}>{this.props.children}</Text>
        <ButtonArea  ref={this.buttons} save={this.saveTask} remove={this.removeTask} edit={this.editTask} cancel={this.cancelEditing}></ButtonArea>
      </div>
      );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAvailable: true,
      tasks: [
        'Primul task',
        'Al doilea task',
      ]
    }
  }
  updateTask(newText,i) {
    let aux = this.state.tasks;
    aux[i] = newText;
    this.setState({...this.state, tasks: aux});
  }
  removeTask(i) {
    let aux = this.state.tasks;
    aux.splice(i,1);
    this.setState({...this.state,tasks:aux});
  }

  addTask(newText) {
    let aux = this.state.tasks;
    aux.push(newText);
    let addAvailable = aux.length < 10;
    this.setState({addAvailable,tasks: aux});
  }


  render() {
    return (
    <div className="mainWrapper">
      {
        this.state.tasks.map((task,i) => {
          return (<Task key={i} index={i}>{task}</Task>);
        })
      }
      {
        this.state.addAvailable?(
        <Task addTask={true} add={this.addTask}></Task>
        ) : (
          (null)
        )
      }

    </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Header title="Titlu header" />
        <Main />
        <Footer title="Titlu footer" />
      </div>
    );
  }
}

export default App;
