import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

class Course extends React.Component {
  
  requisiteFunc(requisites) {
    var length = requisites.length;
    var str = '(';    

    if(length === 0){
      return 'None'
    } else {
      requisites.forEach(ands => {
        var inLength = ands.length;

        ands.forEach(ors => {

          //use find to return the course object, then access with props.data.number
          str += (this.props.list.find( element => {
            return element.props.id === ors;
          })).props.data.number;

          str += --inLength === 0 ? '' : ' OR ';
        })

        str += --length === 0 ? ')' : ') AND (';

      })
    }
    
    return str
  }

  makeAllSection(aList){
    let expression = []

    for(var section in aList){

      if(aList.hasOwnProperty(section)){
        var text = ''
        for(var detail in aList[section]){
          if(detail === 'subsections'){
            
          } else if(detail === 'time'){

          } else {
            text += detail +': '+ aList[section][detail] + '\n';
          }
        }
        expression.push(
          <Card key = {section}>
            {section}
            <Card.Body>{text}</Card.Body>
          </Card>
        )
      }
    }

    return expression;
  }

  getDetails(details){
    
    return <Card.Text>{details}: test</Card.Text>
  }

  makeBody(section){
    var str = '<ul>'

    for(var detail in section){
     str += '<li>'+{detail}+': </li>'
     console.log(section[detail])
    }

    str += '</ul>'

    return str
  }
  
  render() {
    const requisites = this.props.data.requisites;
    const sections = this.props.data.sections;
    // console.log(this.props.list)

    return (
      <div >
        <Card style={{ width: '42rem', margin: '5px' }} >
          <Card.Body>
            <Card.Title>{this.props.data.name}</Card.Title>
            <Card.Subtitle>{this.props.data.number}</Card.Subtitle>

            <Card.Text>
              <span>Credits: {this.props.data.credits}</span>
            </Card.Text>
            <Card.Text>
              {this.props.data.description}
            </Card.Text>

            <Accordion>
              <Accordion.Collapse eventKey = {this.props.id}>
                <div>
                  <Card.Text>Subject: {this.props.data.subject}</Card.Text>
                  <Card.Text>Requisites: {this.requisiteFunc(requisites)}</Card.Text>
                  {this.makeAllSection(sections)}
                </div>
              </Accordion.Collapse>
              <Accordion.Toggle as = {Button} variant='link' eventKey = {this.props.id}>
                Expand/Collapse
              </Accordion.Toggle>
            </Accordion> 

          </Card.Body>
        </Card>     
      </div>
    )
  }
}

export default Course;
