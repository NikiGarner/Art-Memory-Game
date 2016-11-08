var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";

var ImgSource = [
  "./img/imp/boat.jpg",
  "./img/imp/sunrise.jpg",
  "./img/imp/cassatt.jpg",
  "./img/imp/cassette.jpg",
  "./img/imp/dega.jpg",
  "./img/imp/piano.jpg",
  "./img/imp/renoir.jpg",
  "./img/imp/water-lilies.jpg",
  "./img/imp/dance.jpg",
];

function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}

function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}

		ImgThis = $(Source + " div:first-child");

	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
  $("#resultsList").hide();
}

function ResetGame() {
  $("#boxcard").show();
	ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
	return false;
}

function OpenCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);

		$("#" + id + " img").fadeIn('fast');

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").fadeOut('slow');
					$("#" + BoxOpened + " img").fadeOut('slow');
					BoxOpened = "";
					ImgOpened = "";
				}, 300);
			} else {
				$("#" + id + " img").parent().css( "hidden");
				$("#" + BoxOpened + " img").parent().css("hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (ImgFound == ImgSource.length) {
      $("#resultsList").show();
      $("#boxcard").hide();
			$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
		}
	}
}

$(function() {

for (var y = 1; y < 3 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
});
