//make sure everything is supportive of non js browsers

$('#other-title').hide().prev().hide();

$('#credit-card').hide();
$('#paypal').hide();
$('#bitcoin').hide();



/* on job role change, show text box for other jobs

Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".

Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
*/

//on change of payment drop down, show the relevant fields below
$('#title').change((e) => {
  if (e.target.value === "other") {
    $('#other-title').show().prev().show();
  } else {
    $('#other-title').hide().prev().hide();
  }
});


/*
”T-Shirt Info” section

For the T-Shirt "Color" menu, only display the color options that match the design selected in the "Design" menu.
If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
*/

$('#colors-js-puns').hide();

$('#design').change((e) => {

  if (e.target.value === "js puns") {
    $('#colors-js-puns').show();

    $('#color option[value="dimgrey"]').hide();
    $('#color option[value="tomato"]').hide();
    $('#color option[value="steelblue"]').hide();


    $('#color option[value="cornflowerblue"]').show();
    $('#color option[value="darkslategrey"]').show();
    $('#color option[value="gold"]').show();
  }

  if (e.target.value === "heart js") {
    $('#colors-js-puns').show();
    $('#color option[value="cornflowerblue"]').hide();
    $('#color option[value="darkslategrey"]').hide();
    $('#color option[value="gold"]').hide();

    $('#color option[value="dimgrey"]').show();
    $('#color option[value="tomato"]').show();
    $('#color option[value="steelblue"]').show();
  }
});



/*
”Register for Activities” section

Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/



$(':checkbox').change((e) =>
{
  if (e.target.checked)
  { console.log('check status changed to true'); }
});




/*
"Payment Info" section

Display payment sections based on the payment option chosen in the select menu.
The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.
When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.
When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.
*/

//on change of payment drop down, show the relevant fields below
$('#payment').change((e) => {

  //todo find a cleaner way to rehide these
  $('#credit-card').hide();
  $('#paypal').hide();
  $('#bitcoin').hide();
  $(`#${e.target.value}`).show();
});



/*
If any of the following validation errors exist, prevent the user from submitting the form:
Name field can't be blank.
Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
User must select at least one checkbox under the "Register for Activities" section of the form.
If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
Credit Card field should only accept a number between 13 and 16 digits.
The Zip Code field should accept a 5-digit number.
The CVV should only accept a number that is exactly 3 digits long.

*/
