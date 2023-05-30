function displayHours(element) {
  // Construct HTML elements for every hour
  for (var i = 9; i < 18; i++) {
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

    // Render time slots
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

    // Check against dayjs time value to see if it is past, present or future.
    if (hour < time.hour()) {
      hourEl.addClass("past");
    } else if (hour > time.hour()) {
      hourEl.addClass("future");
    } else {
      hourEl.addClass("present");
    }
  })
}

function displayText(element) {
  element.children().each(function() {
    $(this).children("textarea").val(localStorage.getItem($(this).attr("id")));
  });
}

$(function () {
  // Display current day
  $("#currentDay").text(dayjs().format("dddd MMMM DD"));

  // Render time slots
  var hours = $("#hours");
  displayHours(hours);
  colorHours(hours, dayjs());

  // Display saved text
  displayText(hours);

  // Add event listeners to save buttons
  hours.children().each(function() {
    $(this).children("button").on("click", function() {
      var text = $(this).siblings("textarea").val();
      var id = $(this).parent().attr("id");

      localStorage.setItem(id, text);
    })
  });
});
