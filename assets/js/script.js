// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
function displayHours(element) {
  var divs = [];

  // Construct HTML elements for every hour
  for (var i = 0; i < 24; i++) {
    var hour = i;
    var outerDiv = $("<div>").addClass("row time-block")
                             .attr("id", String(i));
    // Handle AM/PM
    var amPm = "AM";
    if (i >= 12) {
      hour -= 12;
      amPm = "PM";
    }
    if (hour === 0) {
      hour = 12;
    }
    var innerDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3")
                             .text(hour + amPm);
    var textArea = $("<textarea>").addClass("col-8 col-md-10 description")
                                  .attr("rows", "3");    
    var btn = $("<button>").addClass("btn saveBtn col-2 col-md-1")
                           .attr("aria-label", "save");
    var icon = $("<i>").addClass("fas fa-save")
                       .attr("aria-hidden", "true");

    // Append the elements
    btn.append(icon);
    outerDiv.append(innerDiv);
    outerDiv.append(textArea);
    outerDiv.append(btn);
    element.append(outerDiv);
  }
}

function colorHours(element, time) {
  element.children().each(function() {
    var hourEl = $(this);
    var hour = Number(hourEl.attr("id"));

    // Check agains dayjs time value to see if it is past, present or future.
    if (hour < time.hour()) {
      hourEl.addClass("past");
    } else if (hour > time.hour()) {
      hourEl.addClass("future");
    } else {
      hourEl.addClass("present");
    }
  })
}
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  var hours = $("#hours");
  displayHours(hours);
  colorHours(hours, dayjs());
});
