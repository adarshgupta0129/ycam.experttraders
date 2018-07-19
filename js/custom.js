var contactform = {};

var renderGoogleInvisibleRecaptcha = function() {
 //jQuery(document).ready(function(){

 // prevent form submit from enter key
 jQuery("input[name=_wpcf7]").attr("class","formid");
 jQuery('.wpcf7-form').on('keyup keypress', "input", function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
   e.preventDefault();
   return false;
  }
 });

 jQuery('.wpcf7-submit').each(function(index){

  var checkexclude = 0;
  var form = jQuery(this).closest('.wpcf7-form');
  var value = jQuery(form).find(".formid").val();
  // check form exclude from invisible recaptcha
  if(checkexclude == 0){
   var ajax_nonce = "dc84a7eee3";
   var ajaxurl = "https://www.y-cam.com/wp-admin/admin-ajax.php";
   // Call ajax for get contact form messages
   jQuery.ajax({
    url: ajaxurl,
    type: 'POST',
    data: {'postId':value,'action':"vsz_cf7_contact_message","ajax_nonce":ajax_nonce},
    success: function(data){
     var contacid = value;
     contactform[contacid] = JSON.parse(data);
    }
   });
   // Hide the form orig submit button
   form.find('.wpcf7-submit').hide();

   // Fetch class and value of orig submit button
   btnClasses = form.find('.wpcf7-submit').attr('class');
   btnValue = form.find('.wpcf7-submit').attr('value');

   // Add custom button and recaptcha holder

   form.find('.wpcf7-submit').after('<input type="button" id="wpcf-custom-btn-'+index+'" class="'+btnClasses+'  recaptcha-btn recaptcha-btn-type-css" value="'+btnValue+'" title="'+btnValue+'" >');
   form.append('<div class="recaptcha-holder" id="recaptcha-holder-'+index+'"></div>');
   // Recaptcha rendenr from here
   var holderId = grecaptcha.render('recaptcha-holder-'+index,{
    'sitekey':'6LeecE4UAAAAAMhpJmCSzA18aAqawGG-Au-vkcus',
    'size': 'invisible',
    'badge' : 'bottomright', // possible values: bottomright, bottomleft, inline
    'callback' : function (recaptchaToken) {
     //console.log(recaptchaToken);
     var response=jQuery('#recaptcha-holder-'+index).find('.g-recaptcha-response').val();
     //console.log(response);
     //Remove old response and store new respone
     jQuery('#recaptcha-holder-'+index).parent().find(".respose_post").remove();
     jQuery('#recaptcha-holder-'+index).after('<input type="hidden" name="g-recaptcha-response"  value="'+response+'" class="respose_post">')
     grecaptcha.reset(holderId);

     if(typeof customCF7Validator !== 'undefined'){
      if(!customCF7Validator(form)){
       return;
      }
     }
     // Call default Validator function
     else if(contactFormDefaultValidator(form)){
      return;
     }
     else{
      // hide the custom button and show orig submit button again and submit the form
      jQuery('#wpcf-custom-btn-'+index).hide();
      form.find('input[type=submit]').show();
      form.find("input[type=submit]").click();
      form.find('input[type=submit]').hide();
      jQuery('#wpcf-custom-btn-'+index).attr('style','');
     }
    }
   },false);

   // action call when click on custom button
   jQuery('#wpcf-custom-btn-'+index).click(function(event){
    event.preventDefault();
    // Call custom validator function
    if(typeof customCF7Validator == 'function'){
     if(!customCF7Validator(form)){
      return false;
     }
    }
    // Call default Validator function
    else if(contactFormDefaultValidator(form)){
     return false;
    }
    else if(grecaptcha.getResponse(holderId) != ''){
     grecaptcha.reset(holderId);
    }
    else{
     // execute the recaptcha challenge
     grecaptcha.execute(holderId);
    }
   });
  }

 });
 //});

};
// Default validator function
function contactFormDefaultValidator(objForm){
 var formid=jQuery(objForm).find(".formid").val();
 var havingError = false;
 // Fetch each validation field one by one
 objForm.find('.wpcf7-validates-as-required').each(function(){
  jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
  // Check if empty or checkbox checked or not
  if(!jQuery(this).hasClass('wpcf7-checkbox')){
   if(!jQuery(this).val()){
    jQuery(this).val('');
    jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
    jQuery(this).after('<span class="wpcf7-not-valid-tip" role="alert">'+contactform[formid]['invalid_required']+'</span>');
    havingError = true;
   }
   // Check if not valid email address entered
   else{
    if(jQuery(this).attr('class').indexOf("wpcf7-validates-as-email") >= 0){
     var emailField = jQuery(this).val();
     if(!validateCustomFormEmail(emailField)){
      jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
      jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">'+contactform[formid]['invalid_email']+'</span>');
      havingError = true;
     }
    }
    // Check if not valid url entered
    else if(jQuery(this).attr('class').indexOf("wpcf7-validates-as-url") >= 0){
     var urlField = jQuery(this).val();
     if(!validateCustomFormurl(urlField)){
      jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
      jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">'+contactform[formid]['invalid_url']+'</span>');
      havingError = true;
     }
    }
    // Check if not valid telephone entered
    else if(jQuery(this).attr('class').indexOf("wpcf7-validates-as-tel") >= 0){
     var telField = jQuery(this).val();
     if(!validateCustomFormtel(telField)){
      jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
      jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">'+contactform[formid]['invalid_tel']+'</span>');
      havingError = true;
     }
    }
    // Check if not valid number entered
    else if(jQuery(this).attr('class').indexOf("wpcf7-validates-as-number") >= 0){
     var numField = jQuery(this).val();
     var min = jQuery(this).attr('min');
     var max = jQuery(this).attr('max');
     var testnum = validateCustomFormnum(numField,min,max);
     if(testnum != 0){
      jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
      if(testnum ==1){
       jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">'+contactform[formid]['invalid_number']+'</span>');
      }
      if(testnum ==2){
       jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">'+contactform[formid]['invalid_too_long']+'</span>');
      }
      if(testnum ==3){
       jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">'+contactform[formid]['invalid_too_short']+'</span>');
      }
      havingError = true;
     }
    }
    // Check if not valid date entered
    else if(jQuery(this).attr('class').indexOf("wpcf7-validates-as-date") >= 0){
     var date = jQuery(this).val();
     if(!validateCustomFordate(date)){
      jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
      jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">'+contactform[formid]['invalid_date']+'</span>');
      havingError = true;
     }
    }
   }
  }
  else{
   var checkselected = 0;
   jQuery(this).find('input').each(function(){
    if(jQuery(this).prop('checked') == true){
     checkselected++;
    }
   });
   if(checkselected == 0){
    jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
    jQuery(this).after('<span class="wpcf7-not-valid-tip" role="alert">'+contactform[formid]['invalid_required']+'</span>');
    havingError = true;
   }
  }
 });
 //for acceptance validation
 if(jQuery(objForm).find('.wpcf7-acceptance').length > 0){
  if(jQuery(objForm).find('.wpcf7-acceptance').hasClass('wpcf7-invert')){
   if(jQuery(objForm).find('.wpcf7-acceptance').prop('checked') == true){
    jQuery(objForm).find('.wpcf7-acceptance').parent().find('.wpcf7-not-valid-tip').remove();
    jQuery(objForm).find('.wpcf7-acceptance').after('<span class="wpcf7-not-valid-tip" role="alert">'+contactform[formid]['accept_terms']+'</span>');
    havingError = true;
   }
   else{
    jQuery(objForm).find('.wpcf7-acceptance').parent().find('.wpcf7-not-valid-tip').remove();
   }
  }
  else{
   if(jQuery(objForm).find('.wpcf7-acceptance').prop('checked') == false){
    jQuery(objForm).find('.wpcf7-acceptance').parent().find('.wpcf7-not-valid-tip').remove();
    jQuery(objForm).find('.wpcf7-acceptance').after('<span class="wpcf7-not-valid-tip" role="alert">'+contactform[formid]['accept_terms']+'</span>');
    havingError = true;
   }
   else{
    jQuery(objForm).find('.wpcf7-acceptance').parent().find('.wpcf7-not-valid-tip').remove();
   }
  }
 }

 return havingError;
}
//email validation function
function validateCustomFormEmail(email) {
 var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
 return expr.test(email);
}
//url validation function
function validateCustomFormurl(url) {
 if(url){
  return true;
 }
 else{
  return false;
 }
}
//telephone validation function
function validateCustomFormtel(number){
 var phoneno = /[a-zA-Z]/;
 if(number.match(phoneno)) {
  return false;
 }
 else {
  return true;
 }
}
//number filed validation function
function validateCustomFormnum(number,min,max){
 if (isNaN(number) ) {
  return 1;
 }
 else {
  if(min){
   if(number < min){
    return 3;
   }
  }
  if(max){
   if(number > max){
    return 2;
   }
  }
  return 0;
 }
}
//date filed validation function
function validateCustomFordate(input) {
 var status = false;
 if (!input || input.length <= 0) {
  status = false;
 }
 else {
  var result = new Date(input);
  if (result == 'Invalid Date') {
   status = false;
  }
  else {
   status = true;
  }
 }
 return status;
}





var ajax_auth_object = {"ajaxurl":"https:\/\/www.y-cam.com\/wp-admin\/admin-ajax.php","redirecturl":"","loadingmessage":"Sending user info, please wait..."};



var gtm4wp_datalayer_name = "dataLayer";
var dataLayer = dataLayer || [];
var google_tag_params = {"pagePostType":"page","pagePostType2":"single-page","pagePostAuthor":"admin","browserName":"Chrome","browserVersion":"67.0.3396.99","browserEngineName":"Blink","browserEngineVersion":"","osName":"OS X","osVersion":"10.13.5","deviceType":"desktop","deviceManufacturer":"Apple","deviceModel":"Macintosh","ecomm_pagetype":"other"};
dataLayer.push({"pagePostType":"page","pagePostType2":"single-page","pagePostAuthor":"admin","browserName":"Chrome","browserVersion":"67.0.3396.99","browserEngineName":"Blink","browserEngineVersion":"","osName":"OS X","osVersion":"10.13.5","deviceType":"desktop","deviceManufacturer":"Apple","deviceModel":"Macintosh","ecomm_pagetype":"other","google_tag_params":window.google_tag_params});


(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
     '//www.googletagmanager.com/gtm.'+'js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })
(window,document,'script','dataLayer','GTM-PQZKSJ');
