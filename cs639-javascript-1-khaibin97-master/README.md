# Homework: Javascript 1 (1 Point Total)

This homework is meant to introduce you to the features and syntax of javascript. To do this, you will complete the set of functions in `hw1.js` such that the following actions are performed.  All questions are capable of being solved with [jquery](https://api.jquery.com), or standard javascript `getElementBy*` syntax, etc. You should not modify `index.html`.

## Problem 1 (0.1 Points)
When the button `Button 1` is pressed, have the words "Hello World!" print to the console.

## Problem 2 (0.1 Points)
When the button `Button 2` is pressed, read the text inside the hidden element with the id `p2readme`, and print it to the console.

## Problem 3 (0.1 Points)
When the button `Button 3` is pressed, you should find all elements with class name `p3editme` and modify their text to "I was changed!"

## Problem 4 (0.2 Points)
When the button `Button 4` is pressed, you should modify each entry in the list such that the next letter in the alphabet replaces it. In other words:

A->B

B->C

C->D

...

Z->A

Each entry has the same class, `p4editme`.

## Problem 5 (0.1 Points)
When the button `Button 5` is pressed, you should read the value of the input field, which has an id of `p5input`, and modify the element with id `p4editme` to have the text you found.

## Problem 6 (0.2 Point)
When the button `Button 6` is pressed, you should swap the action paired with each button. Each action brings up an alert, showing the action performed. The buttons have ids `p6btn1` and `p6btn2`. In other words, after executing `P6`, button `p6btn1` should have the action from `p6btn2`, and vice versa. Executing `P6` results in returning to the original configuration, and so on.

## Problem 7 (0.2 Points)
When the button `Button 7` is pressed, you should apply the styles contained in the table to the elements in the page.

<table>
  <tr>
    <th>Attribute</th>
    <th>Attribute Type</th>
    <th>background-color</th>
    <th>color</th>
    <th>text-align</th>
    <th>width</th>
    <th>box-shadow</th>
    <th>border-collapse</th>
    <th>border-bottom</th>
    <th>padding</th>
  </tr>
  <tr>
    <td>p7table</td>
    <td>id</td>
    <td>#f7f7f7</td>
    <td></td>
    <td>center</td>
    <td>100%</td>
    <td>0 4px 8px 0 #d7dbde</td>
    <td>collapse</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>header</td>
    <td>class</td>
    <td>#d0d5d9</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>tr</td>
    <td>tag</td>
    <td></td>
    <td>#3f4245</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>td</td>
    <td>tag</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>1px solid #ddd</td>
    <td>15px</td>
  </tr>
  <tr>
    <td>th</td>
    <td>tag</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>1px solid #ddd</td>
    <td>15px</td>
  </tr>
</table>

For example, add the `background-style` of `#f7f7f7` to the element with id `p7table`, and `color` of `#3f4245` to all elements with tag `<tr>`.
