import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './App.css';
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import Cart from './Cart';
import History from './History';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      cartCourses: [],
      subjects: []
    };
  }

  componentDidMount() {
    fetch('https://mysqlcs639.cs.wisc.edu:5000/classes').then(
      res => res.json()
    ).then(data => this.setState({ allCourses: data, filteredCourses: data, subjects: this.getSubjects(data) }));
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses })
  }

  setCartCourses(courseA, sectionA, subA){
    for(var course in this.state.cartCourses){
      if(courseA.data.name === this.state.cartCourses[course].course.data.name){
        var tempCart = this.state.cartCourses 
        tempCart[course].section = sectionA;
        tempCart[course].sub = subA;
        this.setState({cartCourses: tempCart})
        return;
      }
    }
    let temp = this.state.cartCourses
    temp.push({
      course: courseA,
      section: sectionA,
      sub: subA
    })
    this.setState({ cartCourses: temp })
  }

  removeFromCart(course){
    const newCart = [...this.state.cartCourses];
    newCart.splice(course,1);
    this.setState({cartCourses: newCart})
  }

  removeSection(course){
    const tempCourse = this.state.cartCourses;
    tempCourse[course].section = null;
    tempCourse[course].sub = null;
    this.setState({cartCourses: tempCourse})
  }

  removeSubsection(course){
    const tempCourse = this.state.cartCourses;
    tempCourse[course].sub = null;
    this.setState({cartCourses: tempCourse})
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
 
        <Tabs defaultActiveKey='home' id='course-selector' style = {{ marginTop: '5px'}}>
          <Tab eventKey='home' title='Home'>
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects}/>
            <div style={{ marginLeft: '20vw'}}>
              <CourseArea data={this.state.filteredCourses} setCartCourses={(course,section,sub) => this.setCartCourses(course,section,sub)}/>
            </div>
          </Tab>
          <Tab eventKey='history' title='History'>
            <History data={this.state.allCourses}/>
          </Tab>
          <Tab eventKey='cart' title='Cart'>
            <Cart cart={this.state.cartCourses} 
             removeFromCart={(course) => this.removeFromCart(course)}
             removeSection={(course) => this.removeSection(course)} 
             removeSubsection={(course) => this.removeSubsection(course)}
             setCartCourses={(course,section,sub) => this.setCartCourses(course,section,sub)}/>
          </Tab>
        </Tabs>
      </>
    )
  }
}

export default App;
