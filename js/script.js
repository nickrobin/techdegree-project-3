$( document ).ready(function() {

const $name = $('#name');
const $email = $('#email');
const $title = $('#other-title');
const $registration = $('.activities input');
const $cc_num = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $all = $('input[name="all"]');
const $js_frameworks = $('input[name="js-frameworks"]');
const $js_libs = $('input[name="js-libs"]');
const $express = $('input[name="express"]');
const $node = $('input[name="node"]');
const $build_tools = $('input[name="build-tools"]');
const $npm = $('input[name="npm"]');

let totalCost;

$('#other-title').hide().prev().hide();
$('#colors-js-puns').hide();
$('#paypal').hide();
$('#bitcoin').hide();
$('.activities').append(`<span> Total Registration Cost: $0 </span>`);

//individual functions for validation of each required field
function isValidName(name) {

  if (name.val() != "") {
    name.removeClass('invalid-input');
    name.prev().removeClass('invalid-label')
    return true;
  } else {
    name.addClass('invalid-input');
    name.prev().addClass('invalid-label')
    return false;
  }
}

function isValidEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.val())) {
    email.removeClass('invalid-input');
    email.prev().removeClass('invalid-label');
    return true;
  } else {
    email.addClass('invalid-input');
    email.prev().addClass('invalid-label');
    return false;
  }
}

function isValidTitle(title) {
  if ($('#other-title').val() != "") {
    title.removeClass('invalid-input');
    title.prev().removeClass('invalid-label');
    return true;
  } else {
    title.addClass('invalid-input');
    title.prev().addClass('invalid-label');
    return false;
  }
}

function isValidRegistration(registration) {

  if ($registration.is(':checked')) {
    $('#register-legend').removeClass('invalid-legend');
    return true;
  } else {
    $('#register-legend').addClass('invalid-legend');
  }
}

function isValidCreditCard(cc_num, zip, cvv) {

  let isValidCC = true;
  let isValidZip = true;
  let isValidCvv = true;

  if (/(^\d{13,16}$)/.test(cc_num.val())) {
    cc_num.removeClass('invalid-input');
    cc_num.prev().removeClass('invalid-label');
    isValidCC = true;
  } else {
    cc_num.addClass('invalid-input');
    cc_num.prev().addClass('invalid-label');
    isValidCC = false;
  }

  if (/^\d{5}$/.test(zip.val())) {
    zip.removeClass('invalid-input');
    zip.prev().removeClass('invalid-label')
    isValidZip = true;
  } else {
    zip.addClass('invalid-input');
    zip.prev().addClass('invalid-label')
    isValidZip = false;
  }

  if (/^\d{3}$/.test(cvv.val())) {
    cvv.removeClass('invalid-input');
    cvv.prev().removeClass('invalid-label')
    isValidCvv = true;
  } else {
    cvv.addClass('invalid-input');
    cvv.prev().addClass('invalid-label')
    isValidCvv = false;
  }
  return (isValidCC && isValidCvv && isValidZip);
}

//help calculate the total for classes
function getRegistrationCost(registration) {
  let totalRegistrationCost = 0;
  registration.each(function() {
    if ($(this).is(':checked')) {
      totalRegistrationCost += $(this).data('cost');
    }
  });
  return totalRegistrationCost;
}



//show the other title text box when user chooses other
$('#title').change((e) => {
  if (e.target.value === "other") {
    $('#other-title').show().prev().show();
  } else {
    $('#other-title').hide().prev().hide();
  }
});


//show / hide t-shirt options based on the design choice
// there has to be a better way to do this by adding data-attribute to the difference selectors
$('#design').change((e) => {

  $('#colors-js-puns').show();

  if (e.target.value === "js puns")
  {
    $('#color option[value="dimgrey"]').hide().removeAttr("selected");
    $('#color option[value="tomato"]').hide().removeAttr("selected");
    $('#color option[value="steelblue"]').hide().removeAttr("selected");;


    $('#color option[value="cornflowerblue"]').show().attr("selected","selected");;
    $('#color option[value="darkslategrey"]').show();
    $('#color option[value="gold"]').show();

  } else if (e.target.value === "heart js")
  {
    $('#color option[value="cornflowerblue"]').hide().removeAttr("selected");;
    $('#color option[value="darkslategrey"]').hide().removeAttr("selected");;
    $('#color option[value="gold"]').hide().removeAttr("selected");;

    $('#color option[value="tomato"]').show().attr("selected","selected");
    $('#color option[value="steelblue"]').show();
    $('#color option[value="dimgrey"]').show();
  }
});


//when checking different classes, add the total and prevent users from enrolling in two classes at same time
$registration.change(function() {

  //first update the total cost
  totalCost = getRegistrationCost($registration);
  $('.activities span').replaceWith(`<span> Total Registration Cost: $` + totalCost + `</span>`);

  //then disable out the stuff that conflicts
  if (this.name === "js-frameworks" && $(this).is(':checked')) {
    $express.attr("disabled", true);
  } else if (this.name === "js-frameworks" && $(this).is(':not(:checked)')) {
    $express.attr("disabled", false);
  } else if (this.name === "express" && $(this).is(':checked')) {
    $js_frameworks.attr("disabled", true);
  } else if (this.name === "express" && $(this).is(':not(:checked)')) {
    $js_frameworks.attr("disabled", false);
  } else if (this.name === "js-libs" && $(this).is(':checked')) {
    $node.attr("disabled", true);
  } else if (this.name === "js-libs" && $(this).is(':not(:checked)')) {
    $node.attr("disabled", false);
  } else if (this.name === "node" && $(this).is(':checked')) {
    $js_libs.attr("disabled", true);
  } else if (this.name === "node" && $(this).is(':not(:checked)')) {
    $js_libs.attr("disabled", false);
  }
});

//on change of payment drop down, show the relevant fields below
$('#payment').change((e) => {
  //quicky and dirty, hide everything, show the target
  $('#credit-card').hide();
  $('#paypal').hide();
  $('#bitcoin').hide();
  $(`#${e.target.value}`).show();
});

$('button').click((e) => {

  //prevent form from actually submitting per default
  e.preventDefault();

  //do a check to highlight any fields that are not filled out and determine if field is valid
  //set the t/f values of each criteria
  let validName = isValidName($name);
  let validEmail = isValidEmail($email);
  let validTitle;
  let validRegistration = isValidRegistration($registration);
  let validCreditCard;

  if ($title.is(":visible")) {
    validTitle = isValidTitle($title)
  }
  if ($cc_num.is(":visible")) {
    validCreditCard = isValidCreditCard($cc_num, $zip, $cvv)
  }

  //then final check before submitting everything
  if (validEmail && validName && (validTitle || $title.is(":hidden")) && validRegistration && (validCreditCard || $cc_num.is(":hidden"))) {
    console.log("All fields filled out - Ready to submit form.");
    $('#register').trigger("reset");
  } else {
    console.log(" Cannot Submit Form - Invalid Fields");
  }
});

});
