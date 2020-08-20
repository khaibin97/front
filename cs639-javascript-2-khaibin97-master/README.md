# Homework: JavaScript 2 (1 point total)

This homework is meant to introduce you to the features and syntax of javascript and css. To do this, you will complete the set of functions in `hw2_1.js` and `hw2_2.js` such that the following actions are performed.  All questions are capable of being solved with [jquery](https://api.jquery.com), or standard javascript `getElementBy*` syntax, etc.

## Problem 1 (0.1 Points)
`index_1.html/hw2_1.js/styles_1.css`

Give Button 1 and Button 2 distinct classes, and specify the classes in the css file to change the button styles. Set the color, background-color, width, and height property of both buttons (your choice!). When either button is clicked, log a message to the console with a description of the button's style.

## Problem 2 (0.1 Points)
`index_1.html/hw2_1.js/styles_1.css`

### Part 1
Make the Increment button add one to the count each time it is clicked.

### Part 2
Change the following properties of the button's class:

- color: change the color to any color (your choice!)
- background-color: change the background color to any color (your choice!)
- width and height: make the button a square
- border: the border property specifies the border thickness, type of border, and border-color. Specify each of these values(ex. border: 2px solid #555555;)
- border-radius: change the border radius to give the button rounded corners
- do not remove the transition durations. These will help us show the user when the mouse is over the button

### Part 3
Change the color and background-color of the "button.rounded:hover" declaration in the css file. Also, change the size and color of the count field by giving it a class and specifying the class in the css file.

## Problem 3 (0.1 Points)
`index_1.html/hw2_1.js/styles_1.css`

Create a paragraph tag and a button in the HTML file.
Create two classes for the paragraph tag with different styles in the css file, and have the button switch the paragraph tag's class between these two classes.
Have the button change the paragraph's text to tell the user which class is currently being displayed.
Give the button a class and style it as desired.

## Problem 4 (0.4 Points)
`index_1.html/hw2_1.js/styles_1.css`

- Change the button styling to any desired style.
- Add an element (li) to the list each time a button is clicked. All elements in the list should have the same class and styling (specify at minimum the element's font-size, color, and padding properties).
- When adding an element to the list, set the text randomly from a pre-defined list of 5-10 strings you define in the function.
- Each element should have a remove button, and each element should be removed from the list when its remove button is clicked.

## Problem 5 (0.3 Points)
`index_2.html/hw2_2.js`

- Add bootstrap to index_2.html document by following the directions from the link below.
- Create a Bootstrap button that when clicked, loads in Bootstrap cards with a title and body based on the data retrieved from http://mysqlcs639.cs.wisc.edu:5000/cards. Display the cards horizontally. Feel free to add additional css styling.
